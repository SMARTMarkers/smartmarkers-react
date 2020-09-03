import {
    IDomainResource,
    IBackboneElement,
    ICodeableConcept,
    IHumanName,
    IContactPoint,
    IAddress,
    IReference,
    IPeriod,
    IIdentifier,
    IAttachment,
} from '.'

export enum AdministrativeGender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
    Unknown = 'unknown',
}

export interface IPatientContact extends IBackboneElement {
    relationship?: ICodeableConcept[] // The kind of relationship
    name?: IHumanName // A name associated with the contact person
    telecom?: IContactPoint[] // A contact detail for the person
    address?: IAddress // Address for the contact person
    gender?: AdministrativeGender // male | female | other | unknown
    organization?: IReference // C? Organization that is associated with the contact
    period?: IPeriod // The period during which this contact person or organization is valid to be contacted relating to this patient
}

export interface IPatientCommunication extends IBackboneElement {
    // A language which may be used to communicate with the patient about his or her health
    language: ICodeableConcept // R!  The language which can be used to communicate with the patient about his or her health
    preferred?: boolean // Language preference indicator
}

export enum LinkType {
    ReplacedBy = 'replaced-by',
    Replaces = 'replaces',
    Refer = 'refer',
    SeeAlso = 'seealso',
}
export interface IPatientLink extends IBackboneElement {
    // Link to another patient resource that concerns the same actual person
    other: IReference // R!  The other patient or related person resource that the link refers to
    type: LinkType // R!  replaced-by | replaces | refer | seealso
}
export interface IPatient extends IDomainResource {
    // from Resource: id, meta, implicitRules, and language
    // from DomainResource: text, contained, extension, and modifierExtension
    identifier?: IIdentifier[] // An identifier for this patient
    active?: boolean // Whether this patient's record is in active use
    name?: IHumanName[] // A name associated with the patient
    telecom?: IContactPoint[] // A contact detail for the individual
    gender?: AdministrativeGender // male | female | other | unknown
    birthDate?: Date // The date of birth for the individual
    // deceased[x]: Indicates if the individual is deceased or not. One of these 2:
    deceasedBoolean?: boolean
    deceasedDateTime?: Date
    address?: IAddress[] // An address for the individual
    maritalStatus?: ICodeableConcept // Marital (civil) status of a patient
    // multipleBirth[x]: Whether patient is part of a multiple birth. One of these 2:
    multipleBirthBoolean?: boolean
    multipleBirthInteger?: number
    photo?: IAttachment[] // Image of the patient
    contact?: IPatientContact[]
    communication?: IPatientCommunication[]
    generalPractitioner?: IReference[] // Patient's nominated primary care provider
    managingOrganization?: IReference // Organization that is the custodian of the patient record
    link?: LinkType[]
}
