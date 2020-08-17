import {
  QuestionnaireResponse as IQuestionnaireResponse,
  ResourceType,
  QuestionnaireResponseStatus,
  Identifier,
  Reference,
  Questionnaire,
  QuestionnaireResponseItem,
  Narrative,
  Resource,
  Extension,
  Meta,
} from "../models";
import { Server } from "../models/internal";
import { Report } from "./Report";

export class QuestionnaireResponse implements IQuestionnaireResponse, Report {
  id: string;
  resourceType: ResourceType = "QuestionnaireResponse";
  status: QuestionnaireResponseStatus;
  identified?: Identifier | undefined;
  basedOn?: Reference[] | undefined;
  partOf?: Reference[] | undefined;
  questionnaire?: string | undefined;
  subject?: Reference | undefined;
  encounter?: Reference | undefined;
  authored?: Date | undefined;
  author?: Reference | undefined;
  source?: Reference | undefined;
  item?: QuestionnaireResponseItem[] | undefined;
  text?: Narrative | undefined;
  contained?: Resource[] | undefined;
  extension?: Extension[] | undefined;
  modifierExtension?: Extension[] | undefined;
  meta?: Meta | undefined;
  implicitRules?: string | undefined;
  language?: string | undefined;

  constructor(item: IQuestionnaireResponse, public server: Server) {
    this.id = item.id;
    this.status = item.status;
    Object.assign(this, item);
  }
  public getSummary() {
    return JSON.stringify(this.item);
  }

  public getTitle() {
    if (this.text && this.text.div) {
      return this.text.div;
    }

    return this.id;
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
}
