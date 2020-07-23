import {
  Questionnaire as IQuestionnaire,
  Identifier,
  PublicationStatus,
  ResourceType,
  ContactDetail,
  UsageContext,
  CodeableConcept,
  Period,
  Coding,
  QuestionnaireItem,
  Narrative,
  Resource,
  Extension,
  Meta,
  ServiceRequest,
  RequestStatus,
  RequestIntent,
} from "../models";
import { Instrument } from "./Instrument";
import { QuestionnaireResponse } from "../reports/QuestionnaireResponse";
import { ReportFactory } from "../reports/ReportFactory";
import { Server } from "../models/internal";

export class Questionnaire implements IQuestionnaire, Instrument {
  id: string;
  resourceType: ResourceType = "Questionnaire";
  status: PublicationStatus;
  url?: string | undefined;
  identifier?: Identifier[] | undefined;
  version?: string | undefined;
  name?: string | undefined;
  title?: string | undefined;
  derivedFrom?: string | undefined;
  experimental?: boolean | undefined;
  subjectType?: ResourceType[] | undefined;
  date?: Date | undefined;
  publisher?: string | undefined;
  contact?: ContactDetail | undefined;
  description?: string | undefined;
  useContext?: UsageContext[] | undefined;
  jurisdiction?: CodeableConcept[] | undefined;
  purpose?: string | undefined;
  copyright?: string | undefined;
  approvalDate?: Date | undefined;
  lastReviewDate?: Date | undefined;
  effectivePeriod?: Period | undefined;
  code?: Coding[] | undefined;
  item?: QuestionnaireItem[] | undefined;
  text?: Narrative | undefined;
  contained?: Resource[] | undefined;
  extension?: Extension[] | undefined;
  modifierExtension?: Extension[] | undefined;
  meta?: Meta | undefined;
  implicitRules?: string | undefined;
  language?: string | undefined;
  private reports?: QuestionnaireResponse[] | undefined;

  constructor(item: IQuestionnaire, private server: Server) {
    this.id = item.id;
    this.status = item.status;
    Object.assign(this, item);
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
        reference: `Patient/${this.server.client.patient.id}`,
      },
      requester: {
        reference: this.server.client.getFhirUser(),
      },
    } as Exclude<ServiceRequest, "id">;
  }

  public getTitle() {
    if (this.title) {
      return this.title;
    }
    if (this.name) {
      return this.name;
    }
    return this.id;
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
    console.log({ reports: this.reports });
    return this.reports;
  }
}
