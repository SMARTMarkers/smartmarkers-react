import {
  DomainResource,
  BackboneElement,
  CodeableConcept,
  HumanName,
  ContactPoint,
  Address,
  Reference,
  Period,
  Identifier,
  Attachment,
} from ".";

export enum AdministrativeGender {
  Male = "male",
  Female = "female",
  Other = "other",
  Unknown = "unknown",
}

export interface PatientContact extends BackboneElement {
  relationship?: CodeableConcept[]; // The kind of relationship
  name?: HumanName; // A name associated with the contact person
  telecom?: ContactPoint[]; // A contact detail for the person
  address?: Address; // Address for the contact person
  gender?: AdministrativeGender; // male | female | other | unknown
  organization?: Reference; // C? Organization that is associated with the contact
  period?: Period; // The period during which this contact person or organization is valid to be contacted relating to this patient
}

export interface PatientCommunication extends BackboneElement {
  // A language which may be used to communicate with the patient about his or her health
  language: CodeableConcept; // R!  The language which can be used to communicate with the patient about his or her health
  preferred?: boolean; // Language preference indicator
}

export enum LinkType {
  ReplacedBy = "replaced-by",
  Replaces = "replaces",
  Refer = "refer",
  SeeAlso = "seealso",
}
export interface PatientLink extends BackboneElement {
  // Link to another patient resource that concerns the same actual person
  other: Reference; // R!  The other patient or related person resource that the link refers to
  type: LinkType; // R!  replaced-by | replaces | refer | seealso
}
export interface Patient extends DomainResource {
  // from Resource: id, meta, implicitRules, and language
  // from DomainResource: text, contained, extension, and modifierExtension
  identifier?: Identifier[]; // An identifier for this patient
  active?: boolean; // Whether this patient's record is in active use
  name?: HumanName[]; // A name associated with the patient
  telecom?: ContactPoint[]; // A contact detail for the individual
  gender?: AdministrativeGender; // male | female | other | unknown
  birthDate?: Date; // The date of birth for the individual
  // deceased[x]: Indicates if the individual is deceased or not. One of these 2:
  deceasedBoolean?: boolean;
  deceasedDateTime?: Date;
  address?: Address[]; // An address for the individual
  maritalStatus?: CodeableConcept; // Marital (civil) status of a patient
  // multipleBirth[x]: Whether patient is part of a multiple birth. One of these 2:
  multipleBirthBoolean?: boolean;
  multipleBirthInteger?: number;
  photo?: Attachment[]; // Image of the patient
  contact?: PatientContact[];
  communication?: PatientCommunication[];
  generalPractitioner?: Reference[]; // Patient's nominated primary care provider
  managingOrganization?: Reference; // Organization that is the custodian of the patient record
  link?: LinkType[];
}
