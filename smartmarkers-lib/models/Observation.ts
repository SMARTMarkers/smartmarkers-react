import { DomainResource } from "./DomainResource";
import { Reference } from "./Reference";
import { CodeableConcept } from "./CodeableConcept";
import { SimpleQuantity, Quantity } from "./Quantity";
import { Period } from "./Period";
import { Identifier, Timing, Ratio, SampledData, Annotation } from ".";
import { BackboneElement } from "./BackboneElement";

export enum ObservationStatus {
  Registered = "registered",
  Preliminary = "preliminary",
  Final = "final",
  Amended = "amended",
}

export interface ObservationReferenceRange extends BackboneElement {
  // Provides guide for interpretation
  low?: SimpleQuantity; // C? Low Range, if relevant
  high?: SimpleQuantity; // C? High Range, if relevant
  type?: CodeableConcept; // Reference range qualifier
  appliesTo?: CodeableConcept[]; // Reference range population
  age?: Range; // Applicable age range, if relevant
  text?: string; // Text based reference range in an observation
}

export interface ObservationComponent extends BackboneElement {
  // Component results
  code: CodeableConcept; // R!  Type of component observation (code / type)
  // value[x]: Actual component result. One of these 11:
  valueQuantity?: Quantity;
  valueCodeableConcept?: CodeableConcept;
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueRange?: Range;
  valueRatio?: Ratio;
  valueSampledData?: SampledData;
  valueTime?: Date;
  valueDateTime?: Date;
  valuePeriod?: Period;
  dataAbsentReason?: CodeableConcept; // C? Why the component result is missing
  interpretation?: CodeableConcept[]; // High, low, normal, etc.
  referenceRange?: ObservationReferenceRange[]; // Provides guide for interpretation of component result
}

export interface Observation extends DomainResource {
  identifier?: Identifier[]; // Business Identifier for observation
  basedOn?: Reference[]; // Fulfills plan, proposal or order
  partOf?: Reference[]; // Part of referenced event
  status: ObservationStatus; // R!  registered | preliminary | final | amended +
  category?: CodeableConcept[]; // Classification of  type of observation
  code: CodeableConcept; // R!  Type of observation (code / type)
  subject?: Reference; // Who and/or what the observation is about
  focus?: Reference[]; // What the observation is about, when it is not about the subject of record
  encounter?: Reference; // Healthcare event during which this observation is made
  // effective[x]: Clinically relevant time/time-period for observation. One of these 4:
  effectiveDateTime?: Date;
  effectivePeriod?: Period;
  effectiveTiming?: Timing;
  effectiveDate?: Date;
  issued?: Date; // Date/Time this version was made available
  performer?: Reference[]; // Who is responsible for the observation
  // value[x]: Actual result. One of these 11:
  valueQuantity?: Quantity;
  valueCodeableConcept?: CodeableConcept;
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueRange?: Range;
  valueRatio?: Ratio;
  valueSampledData?: SampledData;
  valueTime?: Date;
  valueDateTime?: Date;
  valuePeriod?: Period;
  dataAbsentReason?: CodeableConcept; // C? Why the result is missing
  interpretation?: CodeableConcept[]; // High, low, normal, etc.
  note?: Annotation[]; // Comments about the observation
  bodySite?: CodeableConcept; // Observed body part
  method?: CodeableConcept; // How it was done
  specimen?: Reference; // Specimen used for this observation
  device?: Reference; // (Measurement) Device
  referenceRange?: ObservationReferenceRange[];
  hasMember?: Reference[]; // Related resource that belongs to the Observation group
  derivedFrom?: Reference[]; // Related measurements the observation is made from
  component?: ObservationComponent[];
}
