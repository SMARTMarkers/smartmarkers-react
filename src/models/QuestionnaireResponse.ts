import { IDomainResource } from "./DomainResource";
import { IIdentifier } from "./Identifier";
import { IReference } from "./Reference";
import { IQuestionnaire } from "./Questionnaire";
import { IBackboneElement } from "./BackboneElement";
import { ICoding } from "./Coding";
import { IQuantity } from "./Quantity";
import { IAttachment } from "./Attachment";

export enum QuestionnaireResponseStatus {
  InProgress = "in-progress",
  Completed = "completed",
  Amended = "amended",
  EnteredInError = "entered-in-error",
  Stopped = "stopped",
}

export interface IQuestionnaireResponse extends IDomainResource {
  identified?: IIdentifier;
  basedOn?: Array<IReference>;
  partOf?: Array<IReference>;
  questionnaire?: string;
  status: QuestionnaireResponseStatus;
  subject?: IReference;
  encounter?: IReference;
  authored?: Date;
  author?: IReference;
  source?: IReference;
  item?: Array<IQuestionnaireResponseItem>;
}

export interface IQuestionnaireResponseItem extends IBackboneElement {
  linkId: string;
  definition?: string;
  text?: string;
  answer?: Array<IQuestionnaireResponseItemAnswer>;
  item?: Array<IQuestionnaireResponseItem>;
}

export interface IQuestionnaireResponseItemAnswer extends IBackboneElement {
  valueBoolean?: boolean;
  valueDecimal?: number;
  valueInteger?: number;
  valueDate?: string;
  valueDateTime?: string;
  valueTime?: string;
  valueString?: string;
  valueUri?: string;
  valueAttachment?: IAttachment;
  valueCoding?: ICoding;
  valueQuantity?: IQuantity;
  valueReference?: IReference;
  item?: Array<IQuestionnaireResponseItem>;
}
