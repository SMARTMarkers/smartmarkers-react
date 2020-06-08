import { DomainResource } from "./DomainResource";
import { Identifier } from "./Identifier";
import { ContactDetail } from "./ContactDetail";
import { UsageContext } from "./UsageContext";
import { CodeableConcept } from "./CodeableConcept";
import { Period } from "./Period";
import { Coding } from "./Coding";
import { BackboneElement } from "./BackboneElement";
import { ValueSet, PublicationStatus } from "./ValueSet";
import { Reference } from "./Reference";
import { Attachment } from "./Attachment";
import { Quantity } from "./Quantity";
import { ResourceType } from "./ResourceType";

export interface Questionnaire extends DomainResource {
  url?: string;
  identifier?: Identifier[];
  version?: string;
  name?: string;
  title?: string;
  derivedFrom?: string;
  status: PublicationStatus;
  experimental?: boolean;
  subjectType?: ResourceType[];
  date?: Date;
  publisher?: string;
  contact?: ContactDetail;
  description?: string;
  useContext?: UsageContext[];
  jurisdiction?: CodeableConcept[];
  purpose?: string;
  copyright?: string;
  approvalDate?: Date;
  lastReviewDate?: Date;
  effectivePeriod?: Period;
  code?: Coding[];
  item?: QuestionnaireItem[];
}

export interface QuestionnaireItem extends BackboneElement {
  linkId: string;
  definition?: string;
  code?: Coding[];
  prefix?: string;
  text?: string;
  type: QuestionnaireItemType;
  enableWhen?: QuestionnaireItemRule[];
  enableBehavior?: EnableWhenBehavior;
  required?: boolean;
  repeats?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  answerValueSet?: ValueSet;
  answerOption?: [
    {
      valueInteger?: number;
      valueDate?: Date;
      valueTime?: Date;
      valueString?: string;
      valueCoding?: Coding;
      valueReference?: Reference;
      initialSelected?: boolean;
    }
  ];
  initial: [
    {
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
    }
  ];
  item: QuestionnaireItem[];
}

export interface QuestionnaireItemRule extends BackboneElement {
  question: string;
  operator: QuestionnaireItemOperator;
  answerBoolean?: boolean;
  answerDecimal?: number;
  answerInteger?: number;
  answerDate?: Date;
  answerDateTime?: Date;
  answerTime?: Date;
  answerString?: string;
  answerCoding?: Coding;
  answerQuantity?: Quantity;
  answerReference?: any;
}

export enum EnableWhenBehavior {
  All = "all",
  Any = "any",
}

export enum QuestionnaireItemType {
  Group = "group",
  Display = "display",
  Question = "question",
  Boolean = "boolean",
  Decimal = "decimal",
  Integer = "integer",
  Date = "date",
  DateTime = "dateTime",
  Time = "time",
  String = "string",
  Text = "text",
  Url = "url",
  Choice = "choice",
  OpenChoice = "open-choice",
  Attachment = "attachment",
  Reference = "reference",
  Quantity = "quantity",
}

export enum QuestionnaireItemOperator {
  Exists = "exists",
  Equals = "=",
  NotEquals = "!=",
  GreaterThan = ">",
  LessThan = "<",
  GreaterOrEquals = ">=",
  LessOrEquals = "<=",
}
