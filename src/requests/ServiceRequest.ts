import {
  IIdentifier,
  ICodeableConcept,
  INarrative,
  IResource,
  IServiceRequest,
  IExtension,
  IMeta,
  IQuestionnaire,
  ResourceType,
  RequestStatus,
  RequestIntent,
  IReference,
  RequestPriority,
  IQuantity,
  IRatio,
  IPeriod,
  ITiming,
  IAnnotation,
} from "../models";
import { InstrumentFactory } from "../instruments/InstrumentFactory";
import { Questionnaire } from "../instruments/Questionnaire";
import { QuestionnaireResponse } from "../reports";
import { Server } from "../models/internal";

export class ServiceRequest implements IServiceRequest {
  id: string;
  resourceType: ResourceType = "ServiceRequest";
  identifier?: IIdentifier[] | undefined;
  category?: ICodeableConcept[] | undefined;
  code?: ICodeableConcept | undefined;
  text?: INarrative | undefined;
  contained?: IResource[] | undefined;
  extension?: IExtension[] | undefined;
  modifierExtension?: IExtension[] | undefined;
  meta?: IMeta | undefined;
  implicitRules?: string | undefined;
  language?: string | undefined;
  instrument?: Questionnaire;
  reports?: QuestionnaireResponse[];
  status: RequestStatus;
  intent: RequestIntent;
  subject: IReference;
  requester?: IReference;
  instantiatesCanonical?: string[] | undefined;
  instantiatesUri?: string[] | undefined;
  basedOn?: IReference[] | undefined;
  replaces?: IReference[] | undefined;
  requisition?: IIdentifier | undefined;
  priority?: RequestPriority | undefined;
  doNotPerform?: boolean | undefined;
  orderDetail?: ICodeableConcept[] | undefined;
  quantityQuantity?: IQuantity | undefined;
  quantityRatio?: IRatio | undefined;
  quantityRange?: Range | undefined;
  encounte?: IReference;
  occurrenceDateTime?: Date | undefined;
  occurrencePeriod?: IPeriod | undefined;
  occurrenceTiming?: ITiming | undefined;
  asNeededBoolean?: boolean | undefined;
  asNeededCodeableConcept?: ICodeableConcept | undefined;
  authoredOn?: Date | undefined;
  performerType?: ICodeableConcept | undefined;
  performer?: IReference[] | undefined;
  locationCode?: ICodeableConcept[] | undefined;
  locationReference?: IReference[] | undefined;
  reasonCode?: ICodeableConcept[] | undefined;
  reasonReference?: IReference[] | undefined;
  insurance?: IReference[] | undefined;
  supportingInfo?: IReference[] | undefined;
  specimen?: IReference[] | undefined;
  bodySite?: ICodeableConcept[] | undefined;
  note?: IAnnotation[] | undefined;
  patientInstruction?: String | undefined;
  relevantHistory?: IReference[] | undefined;

  constructor(
    item: IServiceRequest,
    private server: Server,
    private promisServer: Server | undefined
  ) {
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
      const response =
        reference
          .toLocaleLowerCase()
          .startsWith("https://mss.fsm.northwestern.edu") && this.promisServer
          ? await this.promisServer.getPromisResource<IQuestionnaire>(reference)
          : await this.server.getInstrumentByReference<IQuestionnaire>(
              reference
            );

      if (response && response.resourceType) {
        const instrumentFactory = new InstrumentFactory(
          this.server,
          this.promisServer
        );
        this.instrument = instrumentFactory.createInstrument(response);
      } else {
        this.instrument = undefined;
      }

      return this.instrument;
    }
    return undefined;
  }
}
