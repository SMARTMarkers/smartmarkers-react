import { IDomainResource } from './DomainResource'
import { IIdentifier } from './Identifier'
import { IContactDetail } from './ContactDetail'
import { ICodeableConcept } from './CodeableConcept'
import { IUsageContext } from './UsageContext'
import { IBackboneElement } from './BackboneElement'
import { ICoding } from './Coding'

export interface IValueSet extends IDomainResource {
    url?: string
    identifier?: IIdentifier[]
    version?: string
    name?: string
    title?: string
    status: PublicationStatus
    experimental?: boolean
    date?: Date
    publisher?: string
    contact?: IContactDetail[]
    description?: string
    useContext?: IUsageContext[]
    jstringsdiction?: ICodeableConcept[]
    immutable?: boolean
    purpose?: string
    copyright?: string
    compose?: ValueSetContentDefinition
    expansion?: ValueSetExpansion
}

export interface ValueSetContentDefinition extends IBackboneElement {
    lockedDate?: Date
    inactive?: boolean
    include: ValueSetContent[]
    exclude?: ValueSetContent[]
}

export interface ValueSetContent extends IBackboneElement {
    system?: string
    version?: string
    concept?: ValueSetContentConcept[]
    filter?: ValueSetContentFilter[]
    valueSet?: IValueSet[]
}

export interface ValueSetContentFilter extends IBackboneElement {
    property: string
    op: FilterOperator
    value: string
}

export interface ValueSetContentConcept extends IBackboneElement {
    code: string
    display?: string
    designation?: ValueSetDesignation[]
}

export interface ValueSetDesignation extends IBackboneElement {
    language?: string
    use?: ICoding
    value: string
}

export interface ValueSetExpansion extends IBackboneElement {
    identifier?: string
    timestamp: Date
    total?: number
    offset?: number
    parameter?: ValueSetExpansionParameter[]
    contains?: ValueSetExpansionCode[]
}

export interface ValueSetExpansionParameter extends IBackboneElement {
    name: string
    valueString?: string
    valueBoolean?: boolean
    valueInteger?: number
    valueDecimal?: number
    valuestring?: string
    valueCode?: string
    valueDate?: Date
}

export interface ValueSetExpansionCode extends IBackboneElement {
    system?: string
    abstract?: boolean
    inactive?: boolean
    version?: string
    code?: string
    display?: string
    designation?: ValueSetDesignation[]
    contains?: ValueSetExpansionCode[]
}

export enum PublicationStatus {
    Draft = 'draft',
    Active = 'active',
    Retired = 'retired',
    Unknown = 'unknown',
}

export enum FilterOperator {
    Equals = '=',
    IsA = 'is-a',
    DescendentOf = 'descendent-of',
    IsNotA = 'is-not-a',
    RegEx = 'regex',
    InSet = 'in',
    NotInSet = 'not-in',
    Generalizes = 'generalizes',
    Exists = 'exists',
}
