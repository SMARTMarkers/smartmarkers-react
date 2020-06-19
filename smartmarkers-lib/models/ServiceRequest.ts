import { DomainResource } from "./DomainResource";
import { Identifier } from "./Identifier";
import { CodeableConcept } from "./CodeableConcept";
import { Reference } from "./Reference";
import { Quantity } from "./Quantity";
import { Ratio } from "./Ratio";
import { Period } from "./Period";
import { Timing } from "./Timing";
import { Annotation } from "./Annotation";

export enum RequestStatus {
  Draft = "draft",
  Active = "active",
  OnHold = "on-hold",
  Revoked = "revoked",
  Completed = "completed",
  EnteredInError = "entered-in-error",
  Unknown = "unknown",
}

export enum RequestIntent {
  Proposal = "proposal",
  Plan = "plan",
  Directive = "directive",
  Order = "order",
  OriginalOrder = "original-order",
  ReflexOrder = "reflex-order",
  FillerOrder = "filler-order",
  InstanceOrder = "instance-order",
  Option = "option",
}

export enum RequestPriority {
  Routine = "routine",
  Urgent = "urgent",
  Asap = "asap",
  Stat = "stat",
}

export interface ServiceRequest extends DomainResource {
  identifier?: Identifier[]; // Identifiers assigned to this order
  instantiatesCanonical?: string[]; // [{ canonical(ActivityDefinition|PlanDefinition) }], // Instantiates FHIR protocol or definition
  instantiatesUri?: string[]; // Instantiates external protocol or definition
  basedOn?: Reference[]; // [{ Reference(CarePlan|ServiceRequest|MedicationRequest) }], // What request fulfills
  replaces?: Reference[]; // [{ Reference(ServiceRequest) }], // What request replaces
  requisition?: Identifier; // Composite Request ID
  status: RequestStatus; // R!  draft | active | on-hold | revoked | completed | entered-in-error | unknown
  intent: RequestIntent; // R!  proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
  category?: CodeableConcept[]; // Classification of service
  priority?: RequestPriority; // routine | urgent | asap | stat
  doNotPerform?: boolean; // True if service/procedure should not be performed
  code?: CodeableConcept; // What is being requested/ordered
  orderDetail?: CodeableConcept[]; // C? Additional order information
  // // quantity[x]: Service amount. One of these 3:
  quantityQuantity?: Quantity;
  quantityRatio?: Ratio;
  quantityRange?: Range;
  subject: Reference; // R!  Individual or Entity the service is ordered for
  encounte?: Reference; // { Reference(Encounter) }, // Encounter in which the request was created
  // // occurrence[x]: When service should occur. One of these 3:
  occurrenceDateTime?: Date;
  occurrencePeriod?: Period;
  occurrenceTiming?: Timing;
  // // asNeeded[x]: Preconditions for service. One of these 2:
  asNeededBoolean?: boolean;
  asNeededCodeableConcept?: CodeableConcept;
  authoredOn?: Date; // Date request signed
  requester?: Reference; //{ Reference(Practitioner|PractitionerRole|Organization|
  //  Patient|RelatedPerson|Device) }, // Who/what is requesting service
  performerType?: CodeableConcept; // Performer role
  performer?: Reference[]; // [{ Reference(Practitioner|PractitionerRole|Organization|
  //  CareTeam|HealthcareService|Patient|Device|RelatedPerson) }], // Requested performer
  locationCode?: CodeableConcept[]; // Requested location
  locationReference?: Reference[]; // [{ Reference(Location) }], // Requested location
  reasonCode?: CodeableConcept[]; // Explanation/Justification for procedure or service
  reasonReference?: Reference[]; // [{ Reference(Condition|Observation|DiagnosticReport|
  //  DocumentReference) }], // Explanation/Justification for service or service
  insurance?: Reference[]; // [{ Reference(Coverage|ClaimResponse) }], // Associated insurance coverage
  supportingInfo?: Reference[]; // [{ Reference(Any) }], // Additional clinical information
  specimen?: Reference[]; // [{ Reference(Specimen) }], // Procedure Samples
  bodySite?: CodeableConcept[]; // Location on Body
  note?: Annotation[]; // Comments
  patientInstruction?: String; // Patient or consumer-oriented instructions
  relevantHistory?: Reference[]; // [{ Reference(Provenance) }] // Request provenance
}
