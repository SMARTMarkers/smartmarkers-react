import { DomainResource } from "./DomainResource";
import { Identifier } from "./Identifier";
import { Reference } from "./Reference";
import { Questionnaire } from "./Questionnaire";
import { BackboneElement } from "./BackboneElement";
import { Coding } from "./Coding";
import { Quantity } from "./Quantity";
import { Attachment } from "./Attachment";

export enum QuestionnaireResponseStatus {
  InProgress = "in-progress",
  Completed = "completed",
  Amended = "amended",
  EnteredInError = "entered-in-error",
  Stopped = "stopped",
}

export interface QuestionnaireResponse extends DomainResource {
  identified?: Identifier;
  basedOn?: Array<Reference>;
  partOf?: Array<Reference>;
  questionnaire?: string;
  status: QuestionnaireResponseStatus;
  subject?: Reference;
  encounter?: Reference;
  authored?: Date;
  author?: Reference;
  source?: Reference;
  item?: Array<QuestionnaireResponseItem>;
}

export interface QuestionnaireResponseItem extends BackboneElement {
  linkId: string;
  definition?: string;
  text?: string;
  answer?: Array<QuestionnaireResponseItemAnswer>;
  item?: Array<QuestionnaireResponseItem>;
}

export interface QuestionnaireResponseItemAnswer extends BackboneElement {
  valueBoolean?: boolean;
  valueDecimal?: number;
  valueInteger?: number;
  valueDate?: Date;
  valueDateTime?: Date;
  valueTime?: Date;
  valueString?: string;
  valueUri?: string;
  valueAttachment?: Attachment;
  valueCoding?: Coding;
  valueQuantity?: Quantity;
  valueReference?: Reference;
  item?: Array<QuestionnaireResponseItem>;
}
