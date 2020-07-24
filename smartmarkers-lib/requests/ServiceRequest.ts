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
  RequestPriority,
  Quantity,
  Ratio,
  Period,
  Timing,
  Annotation,
} from "../models";
import { InstrumentFactory } from "../instruments/InstrumentFactory";
import { Questionnaire } from "../instruments/Questionnaire";
import { QuestionnaireResponse } from "../reports";
import { Server } from "../models/internal";

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
  instantiatesCanonical?: string[] | undefined;
  instantiatesUri?: string[] | undefined;
  basedOn?: Reference[] | undefined;
  replaces?: Reference[] | undefined;
  requisition?: Identifier | undefined;
  priority?: RequestPriority | undefined;
  doNotPerform?: boolean | undefined;
  orderDetail?: CodeableConcept[] | undefined;
  quantityQuantity?: Quantity | undefined;
  quantityRatio?: Ratio | undefined;
  quantityRange?: Range | undefined;
  encounte?: Reference;
  occurrenceDateTime?: Date | undefined;
  occurrencePeriod?: Period | undefined;
  occurrenceTiming?: Timing | undefined;
  asNeededBoolean?: boolean | undefined;
  asNeededCodeableConcept?: CodeableConcept | undefined;
  authoredOn?: Date | undefined;
  performerType?: CodeableConcept | undefined;
  performer?: Reference[] | undefined;
  locationCode?: CodeableConcept[] | undefined;
  locationReference?: Reference[] | undefined;
  reasonCode?: CodeableConcept[] | undefined;
  reasonReference?: Reference[] | undefined;
  insurance?: Reference[] | undefined;
  supportingInfo?: Reference[] | undefined;
  specimen?: Reference[] | undefined;
  bodySite?: CodeableConcept[] | undefined;
  note?: Annotation[] | undefined;
  patientInstruction?: String | undefined;
  relevantHistory?: Reference[] | undefined;

  constructor(item: IServiceRequest, private server: Server) {
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

  private getExtensionReference() {
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
    const reference = this.getExtensionReference();
    if (reference) {
      const response = await this.server.getInstrumentByReference<
        IQuestionnaire
      >(reference);

      if (response) {
        const instrumentFactory = new InstrumentFactory(this.server);
        this.instrument = instrumentFactory.createInstrument(response);
      } else {
        this.instrument = undefined;
      }

      return this.instrument;
    }
    return undefined;
  }
}
