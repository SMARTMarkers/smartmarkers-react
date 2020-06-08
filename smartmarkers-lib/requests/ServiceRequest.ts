import {
  Identifier,
  CodeableConcept,
  Narrative,
  Resource,
  ServiceRequest as IServiceRequest,
  Extension,
  Meta,
  Questionnaire as IQuestionnaire,
  ResourceType,
  RequestStatus,
  RequestIntent,
  Reference,
} from "../models";
import Client from "fhirclient/lib/Client";
import { InstrumentFactory } from "../instruments/InstrumentFactory";
import { Questionnaire } from "../instruments/Questionnaire";
import { QuestionnaireResponse } from "../reports";

export class ServiceRequest implements IServiceRequest {
  id: string;
  resourceType: ResourceType = "ServiceRequest";
  identifier?: Identifier[] | undefined;
  category?: CodeableConcept[] | undefined;
  code?: CodeableConcept | undefined;
  text?: Narrative | undefined;
  contained?: Resource[] | undefined;
  extension?: Extension[] | undefined;
  modifierExtension?: Extension[] | undefined;
  meta?: Meta | undefined;
  implicitRules?: string | undefined;
  language?: string | undefined;
  instrument?: Questionnaire;
  reports?: QuestionnaireResponse[];
  status: RequestStatus;
  intent: RequestIntent;
  subject: Reference;
  requester?: Reference;

  constructor(item: IServiceRequest, private fhirClient: Client) {
    this.id = item.id;
    this.status = item.status;
    this.intent = item.intent ? item.intent : RequestIntent.Option;
    this.subject = item.subject;
    Object.assign(this, item);
  }

  public getTitle() {
    if (this.code && this.code.text) return this.code.text;
    if (
      this.code &&
      this.code.coding &&
      this.code.coding[0] &&
      this.code.coding[0].display
    )
      return this.code.coding[0].display;
    if (this.category && this.category[0] && this.category[0].text)
      return this.category[0].text;

    return `REQ ${this.id}`;
  }

  public getNote() {
    if (
      this.modifierExtension &&
      this.modifierExtension.length > 0 &&
      this.modifierExtension[0] &&
      this.modifierExtension[0].valueReference &&
      this.modifierExtension[0].valueReference.reference
    ) {
      return this.modifierExtension[0].valueReference.reference;
    }
    if (
      this.extension &&
      this.extension.length > 0 &&
      this.extension[0] &&
      this.extension[0].valueReference &&
      this.extension[0].valueReference.reference
    ) {
      return this.extension[0].valueReference.reference;
    }

    return this.resourceType;
  }

  private getExtensionRegerence() {
    if (
      this.modifierExtension &&
      this.modifierExtension.length > 0 &&
      this.modifierExtension[0] &&
      this.modifierExtension[0].valueReference &&
      this.modifierExtension[0].valueReference.reference
    ) {
      return this.modifierExtension[0].valueReference.reference;
    }
    if (
      this.extension &&
      this.extension.length > 0 &&
      this.extension[0] &&
      this.extension[0].valueReference &&
      this.extension[0].valueReference.reference
    ) {
      return this.extension[0].valueReference.reference;
    }
    return undefined;
  }

  async getInstrument() {
    if (this.instrument) {
      return this.instrument;
    }
    const reference = this.getExtensionRegerence();
    if (reference) {
      const response = await this.fhirClient
        .request<IQuestionnaire>(reference)
        .catch((err) => {
          console.error(err);
          return undefined;
        });
      console.log({ insturmentResponse: response });
      if (response) {
        const instrumentFactory = new InstrumentFactory(
          this.fhirClient,
          this.id
        );
        this.instrument = instrumentFactory.createInstrument(response);
      } else {
        this.instrument = undefined;
      }

      return this.instrument;
    }
    return undefined;
  }

  async getReports() {
    if (this.reports) {
      return this.reports;
    }
    const instrument = await this.getInstrument();
    if (instrument) {
      this.reports = await instrument.getReports();
    }

    return this.reports;
  }

  setReports(reports: QuestionnaireResponse[] | undefined) {
    this.reports = reports;
  }

  getReportsCount() {
    const r = this.reports;

    if (r) {
      return r.length;
    }
    return 0;
  }
}
