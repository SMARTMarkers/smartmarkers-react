import { DomainResource } from "./DomainResource";
import { Identifier } from "./Identifier";
import { ContactDetail } from "./ContactDetail";
import { CodeableConcept } from "./CodeableConcept";
import { UsageContext } from "./UsageContext";
import { BackboneElement } from "./BackboneElement";
import { Coding } from "./Coding";

export interface ValueSet extends DomainResource {
  url?: string;
  identifier?: Identifier[];
  version?: string;
  name?: string;
  title?: string;
  status: PublicationStatus;
  experimental?: boolean;
  date?: Date;
  publisher?: string;
  contact?: ContactDetail[];
  description?: string;
  useContext?: UsageContext[];
  jstringsdiction?: CodeableConcept[];
  immutable?: boolean;
  purpose?: string;
  copyright?: string;
  compose?: ValueSetContentDefinition;
  expansion?: ValueSetExpansion;
}

export interface ValueSetContentDefinition extends BackboneElement {
  lockedDate?: Date;
  inactive?: boolean;
  include: ValueSetContent[];
  exclude?: ValueSetContent[];
}

export interface ValueSetContent extends BackboneElement {
  system?: string;
  version?: string;
  concept?: ValueSetContentConcept[];
  filter?: ValueSetContentFilter[];
  valueSet?: ValueSet[];
}

export interface ValueSetContentFilter extends BackboneElement {
  property: string;
  op: FilterOperator;
  value: string;
}

export interface ValueSetContentConcept extends BackboneElement {
  code: string;
  display?: string;
  designation?: ValueSetDesignation[];
}

export interface ValueSetDesignation extends BackboneElement {
  language?: string;
  use?: Coding;
  value: string;
}

export interface ValueSetExpansion extends BackboneElement {
  identifier?: string;
  timestamp: Date;
  total?: number;
  offset?: number;
  parameter?: ValueSetExpansionParameter[];
  contains?: ValueSetExpansionCode[];
}

export interface ValueSetExpansionParameter extends BackboneElement {
  name: string;
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueDecimal?: number;
  valuestring?: string;
  valueCode?: string;
  valueDate?: Date;
}

export interface ValueSetExpansionCode extends BackboneElement {
  system?: string;
  abstract?: boolean;
  inactive?: boolean;
  version?: string;
  code?: string;
  display?: string;
  designation?: ValueSetDesignation[];
  contains?: ValueSetExpansionCode[];
}

export enum PublicationStatus {
  Draft = "draft",
  Active = "active",
  Retired = "retired",
  Unknown = "unknown",
}

export enum FilterOperator {
  Equals = "=",
  IsA = "is-a",
  DescendentOf = "descendent-of",
  IsNotA = "is-not-a",
  RegEx = "regex",
  InSet = "in",
  NotInSet = "not-in",
  Generalizes = "generalizes",
  Exists = "exists",
}
