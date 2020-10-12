import {
  IQuestionnaire,
  IQuestionnaireResponse,
  IResource,
  IServiceRequest,
  RequestStatus,
  RequestIntent,
  QuestionnaireResponseStatus,
  IReference,
} from "../models";
import { ReportFactory } from "../reports/ReportFactory";
import { Server, TaskSchedule } from "../models/internal";
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

  public createServiceRequest(schedule: TaskSchedule, patientId: string) {
    const serviceRequest = {
      resourceType: "ServiceRequest",
      modifierExtension: [
        {
          url:
            "http://hl7.org/fhir/StructureDefinition/servicerequest-questionnaireRequest",
          valueReference: {
            reference: this.url,
            display: this.getTitle(),
          },
        },
      ],
      status: RequestStatus.Active,
      intent: RequestIntent.Order,
      subject: {
        reference: `Patient/${patientId}`,
      },
      requester: {
        reference: this.server.client.getFhirUser(),
      },
    } as Exclude<IServiceRequest, "id">;

    if (schedule.occurrenceDateTime) {
      serviceRequest.occurrenceDateTime = schedule.occurrenceDateTime;
    } else if (schedule.occurrencePeriod) {
      serviceRequest.occurrencePeriod = schedule.occurrencePeriod;
    } else if (schedule.occurrenceTiming) {
      serviceRequest.occurrenceTiming = schedule.occurrenceTiming;
    }

    return serviceRequest;
  }

  public getTitle() {
    if (this.title) {
      return this.title;
    }
    if (this.name) {
      return this.name;
    }
    if (this.text && this.text.textContent) {
      return this.text.textContent;
    }
    return this.id;
  }

  public getNote() {
    return `Q ${this.id}`;
  }

  async getReports(serviceRequestId?: string, patientId?: string) {
    if (this.reports) {
      return this.reports;
    }

    const response = await this.server.getQuestionnaireReports(
      this.id,
      serviceRequestId,
      patientId
    );

    const reportFactory = new ReportFactory(this.server);
    this.reports = response.map((item: IQuestionnaireResponse) =>
      reportFactory.createReport(item)
    );
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
        } as IResource,
      ],
      questionnaire:
        "http://hl7.org/fhir/us/sdc/StructureDefinition/sdc-questionnaire-dynamic",
      status: QuestionnaireResponseStatus.InProgress,
      subject: "TestPatient" as IReference,
      authored: new Date(),
    };

    return await this.getServer().getPromisNextStep(qid, qResponse);
  }

  async getNextStep(qResponse: IQuestionnaireResponse) {
    const qid = this.getPromisId();
    return await this.getServer().getPromisNextStep(qid, qResponse);
  }
}
