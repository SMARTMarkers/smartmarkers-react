import { IDomainResource } from './DomainResource'
import { IIdentifier } from './Identifier'
import { IContactDetail } from './ContactDetail'
import { IUsageContext } from './UsageContext'
import { ICodeableConcept } from './CodeableConcept'
import { IPeriod } from './Period'
import { ICoding } from './Coding'
import { IBackboneElement } from './BackboneElement'
import { IValueSet, PublicationStatus } from './ValueSet'
import { IReference } from './Reference'
import { IAttachment } from './Attachment'
import { IQuantity } from './Quantity'
import { ResourceType } from './ResourceType'

export interface IQuestionnaire extends IDomainResource {
    url?: string
    identifier?: IIdentifier[]
    version?: string
    name?: string
    title?: string
    derivedFrom?: string
    status: PublicationStatus
    experimental?: boolean
    subjectType?: ResourceType[]
    date?: Date
    publisher?: string
    contact?: IContactDetail
    description?: string
    useContext?: IUsageContext[]
    jurisdiction?: ICodeableConcept[]
    purpose?: string
    copyright?: string
    approvalDate?: Date
    lastReviewDate?: Date
    effectivePeriod?: IPeriod
    code?: ICoding[]
    item?: IQuestionnaireItem[]
}

export interface IQuestionnaireItem extends IBackboneElement {
    linkId: string
    definition?: string
    code?: ICoding[]
    prefix?: string
    text?: string
    type: QuestionnaireItemType
    enableWhen?: IQuestionnaireItemRule[]
    enableBehavior?: EnableWhenBehavior
    required?: boolean
    repeats?: boolean
    readOnly?: boolean
    maxLength?: number
    answerValueSet?: IValueSet
    answerOption?: [
        {
            valueInteger?: number
            valueDate?: Date
            valueTime?: Date
            valueString?: string
            valueCoding?: ICoding
            valueReference?: IReference
            initialSelected?: boolean
        }
    ]
    initial: [
        {
            valueBoolean?: boolean
            valueDecimal?: number
            valueInteger?: number
            valueDate?: Date
            valueDateTime?: Date
            valueTime?: Date
            valueString?: string
            valueUri?: string
            valueAttachment?: IAttachment
            valueCoding?: ICoding
            valueQuantity?: IQuantity
            valueReference?: IReference
        }
    ]
    item: IQuestionnaireItem[]
}

export interface IQuestionnaireItemRule extends IBackboneElement {
    question: string
    operator: QuestionnaireItemOperator
    answerBoolean?: boolean
    answerDecimal?: number
    answerInteger?: number
    answerDate?: Date
    answerDateTime?: Date
    answerTime?: Date
    answerString?: string
    answerCoding?: ICoding
    answerQuantity?: IQuantity
    answerReference?: any
}

export enum EnableWhenBehavior {
    All = 'all',
    Any = 'any',
}

export enum QuestionnaireItemType {
    Group = 'group',
    Display = 'display',
    Question = 'question',
    Boolean = 'boolean',
    Decimal = 'decimal',
    Integer = 'integer',
    Date = 'date',
    DateTime = 'dateTime',
    Time = 'time',
    String = 'string',
    Text = 'text',
    Url = 'url',
    Choice = 'choice',
    OpenChoice = 'open-choice',
    Attachment = 'attachment',
    Reference = 'reference',
    Quantity = 'quantity',
}

export enum QuestionnaireItemOperator {
    Exists = 'exists',
    Equals = '=',
    NotEquals = '!=',
    GreaterThan = '>',
    LessThan = '<',
    GreaterOrEquals = '>=',
    LessOrEquals = '<=',
}
