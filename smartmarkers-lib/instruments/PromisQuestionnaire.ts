import {
  Questionnaire as IQuestionnaire,
  QuestionnaireResponse as IQuestionnaireResponse,
  Resource,
  ServiceRequest,
  RequestStatus,
  RequestIntent,
  QuestionnaireResponseStatus,
  Reference,
} from "../models";
import { ReportFactory } from "../reports/ReportFactory";
import { Server } from "../models/internal";
import { Questionnaire } from "./Questionnaire";

export class PromisQuestionnaire extends Questionnaire {
  constructor(
    item: IQuestionnaire,
    server: Server,
    private promisServer?: Server
  ) {
    super(item, server);
  }

  private getServer() {
    if (this.promisServer) {
      return this.promisServer;
    }
    return this.server;
  }

  public isAdaptive() {
    return true;
  }

  public createServiceRequest() {
    return {
      resourceType: "ServiceRequest",
      modifierExtension: [
        {
          url:
            "http://hl7.org/fhir/StructureDefinition/servicerequest-questionnaireRequest",
          valueReference: {
            reference: `${this.resourceType}/${this.id}`,
          },
        },
      ],
      status: RequestStatus.Active,
      intent: RequestIntent.Directive,
      subject: {
        reference: `Patient/${this.getServer().client.patient.id}`,
      },
      requester: {
        reference: this.getServer().client.getFhirUser(),
      },
    } as Exclude<ServiceRequest, "id">;
  }

  public getTitle() {
    if (this.title) {
      return `PROMIS ${this.title}`;
    }
    if (this.name) {
      return `PROMIS ${this.name}`;
    }
    return `PROMIS ${this.id}`;
  }

  public getNote() {
    return `Q ${this.id}`;
  }

  async getReports(serviceRequestId?: string) {
    if (this.reports) {
      return this.reports;
    }

    const response = await this.server.getQuestionnaireReports(
      this.id,
      serviceRequestId
    );

    const reportFactory = new ReportFactory(this.server);
    this.reports = response.map((item) => reportFactory.createReport(item));
    return this.reports;
  }

  getPromisId() {
    let qid = this.id;
    if (this.url) {
      const items = this.url.split("/");
      return items.length > 0 ? items[items.length - 1] : this.id;
    }
    return qid;
  }

  async getFirstNextStep() {
    const qid = this.getPromisId();
    const qResponse: IQuestionnaireResponse = {
      resourceType: "QuestionnaireResponse",
      id: "",
      meta: {
        id: qid,
        profile: [
          "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaireresponse-adapt",
        ],
      },
      contained: [
        {
          resourceType: this.resourceType,
          id: qid,
          meta: {
            ...this.meta,
            profile: [
              "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-adapt",
            ],
          },
          url: this.url,
          title: this.title,
          status: this.status,
          date: this.date,
          subjectType: this.subjectType,
        } as Resource,
      ],
      questionnaire:
        "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-questionnaire-dynamic",
      status: QuestionnaireResponseStatus.InProgress,
      subject: "TestPatient" as Reference,
      // subject: {
      //   reference: `Patient/${this.getServer().client.patient.id}`,
      // },
      authored: new Date(),
    };

    return await this.getServer().getPromisNextStep(qid, qResponse);
  }

  async getNextStep(qResponse: IQuestionnaireResponse) {
    const qid = this.getPromisId();
    return await this.getServer().getPromisNextStep(qid, qResponse);
  }
}
