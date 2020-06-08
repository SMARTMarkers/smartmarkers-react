import { DomainResource } from "./DomainResource";
import { Identifier } from "./Identifier";
import { PublicationStatus } from "./ValueSet";
import { ContactDetail } from "./ContactDetail";
import { UsageContext } from "./UsageContext";
import { CodeableConcept } from "./CodeableConcept";
import { Coding } from "./Coding";
import { BackboneElement } from "./BackboneElement";
import { ElementDefinition } from "./ElementDefinition";

export enum StructureDefinitionKind {
  PrimitiveType = "primitive-type",
  ComplexType = "complex-type",
  Resource = "resource",
  Logical = "logical",
}

export enum ExtensionContentType {
  FHIRPath = "fhirpath",
  Element = "element",
  Extension = "extension",
}

export enum TypeDerivationRule {
  Specialization = "specialization",
  Constraint = "constraint",
}

export interface StructureDefinitionContext extends BackboneElement {
  type: ExtensionContentType; // R!  fhirpath | element | extension
  expression: string; // R!  Where the extension can be used in instances
}

export interface StructureDefinitionMapping extends BackboneElement {
  // External specification that the content is mapped to
  identity: string; // R!  Internal id when this mapping is used
  uri: string; // C? Identifies what this mapping refers to
  name: string; // C? Names what this mapping refers to
  comment: string; // Versions, Issues, Scope limitations etc.
}

export interface StructureDefinitionSnapshot extends BackboneElement {
  element: ElementDefinition[];
}

export interface StructureDefinitionDifferential extends BackboneElement {
  element: ElementDefinition[];
}

export interface StructureDefinition extends DomainResource {
  url: string;
  identifier?: Identifier[];
  version?: string;
  name: string;
  title?: string;
  status: PublicationStatus;
  experimental?: boolean; // For testing purposes, not real usage
  date?: Date; // Date last changed
  publisher?: string; // Name of the publisher (organization or individual)
  contact?: ContactDetail[]; // Contact details for the publisher
  description?: string; // Natural language description of the structure definition
  useContext?: UsageContext[]; // The context that the content is intended to support
  jurisdiction?: CodeableConcept[]; // Intended jurisdiction for structure definition (if applicable)
  purpose?: string; // Why this structure definition is defined
  copyright?: string; // Use and/or publishing restrictions
  keyword?: Coding[]; // Assist with indexing and finding
  fhirVersion?: string; // FHIR Version this StructureDefinition targets
  mapping?: StructureDefinitionMapping[];
  kind: StructureDefinitionKind; // R!  primitive-type | complex-type | resource | logical
  abstract: boolean; // R!  Whether the structure is abstract
  context?: StructureDefinitionContext[];
  contextInvariant?: string[]; // C? FHIRPath invariants - when the extension can be used
  type: string; // C? R!  Type defined or constrained by this structure
  baseDefinition?: StructureDefinition; // C? Definition that this type is constrained/specialized from
  derivation?: TypeDerivationRule; // specialization | constraint - How relates to base definition
  snapshot?: StructureDefinitionSnapshot;
  differential?: StructureDefinitionDifferential;
}
