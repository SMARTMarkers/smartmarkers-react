import { IDomainResource } from './DomainResource'
import { IIdentifier } from './Identifier'
import { PublicationStatus } from './ValueSet'
import { IContactDetail } from './ContactDetail'
import { IUsageContext } from './UsageContext'
import { ICodeableConcept } from './CodeableConcept'
import { ICoding } from './Coding'
import { IBackboneElement } from './BackboneElement'
import { IElementDefinition } from './ElementDefinition'

export enum StructureDefinitionKind {
    PrimitiveType = 'primitive-type',
    ComplexType = 'complex-type',
    Resource = 'resource',
    Logical = 'logical',
}

export enum ExtensionContentType {
    FHIRPath = 'fhirpath',
    Element = 'element',
    Extension = 'extension',
}

export enum TypeDerivationRule {
    Specialization = 'specialization',
    Constraint = 'constraint',
}

export interface IStructureDefinitionContext extends IBackboneElement {
    type: ExtensionContentType // R!  fhirpath | element | extension
    expression: string // R!  Where the extension can be used in instances
}

export interface IStructureDefinitionMapping extends IBackboneElement {
    // External specification that the content is mapped to
    identity: string // R!  Internal id when this mapping is used
    uri: string // C? Identifies what this mapping refers to
    name: string // C? Names what this mapping refers to
    comment: string // Versions, Issues, Scope limitations etc.
}

export interface IStructureDefinitionSnapshot extends IBackboneElement {
    element: IElementDefinition[]
}

export interface IStructureDefinitionDifferential extends IBackboneElement {
    element: IElementDefinition[]
}

export interface IStructureDefinition extends IDomainResource {
    url: string
    identifier?: IIdentifier[]
    version?: string
    name: string
    title?: string
    status: PublicationStatus
    experimental?: boolean // For testing purposes, not real usage
    date?: Date // Date last changed
    publisher?: string // Name of the publisher (organization or individual)
    contact?: IContactDetail[] // Contact details for the publisher
    description?: string // Natural language description of the structure definition
    useContext?: IUsageContext[] // The context that the content is intended to support
    jurisdiction?: ICodeableConcept[] // Intended jurisdiction for structure definition (if applicable)
    purpose?: string // Why this structure definition is defined
    copyright?: string // Use and/or publishing restrictions
    keyword?: ICoding[] // Assist with indexing and finding
    fhirVersion?: string // FHIR Version this StructureDefinition targets
    mapping?: IStructureDefinitionMapping[]
    kind: StructureDefinitionKind // R!  primitive-type | complex-type | resource | logical
    abstract: boolean // R!  Whether the structure is abstract
    context?: IStructureDefinitionContext[]
    contextInvariant?: string[] // C? FHIRPath invariants - when the extension can be used
    type: string // C? R!  Type defined or constrained by this structure
    baseDefinition?: IStructureDefinition // C? Definition that this type is constrained/specialized from
    derivation?: TypeDerivationRule // specialization | constraint - How relates to base definition
    snapshot?: IStructureDefinitionSnapshot
    differential?: IStructureDefinitionDifferential
}
