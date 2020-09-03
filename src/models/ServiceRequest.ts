import { IDomainResource } from './DomainResource'
import { IIdentifier } from './Identifier'
import { ICodeableConcept } from './CodeableConcept'
import { IReference } from './Reference'
import { IQuantity } from './Quantity'
import { IRatio } from './Ratio'
import { IPeriod } from './Period'
import { ITiming } from './Timing'
import { IAnnotation } from './Annotation'

export enum RequestStatus {
    Draft = 'draft',
    Active = 'active',
    OnHold = 'on-hold',
    Revoked = 'revoked',
    Completed = 'completed',
    EnteredInError = 'entered-in-error',
    Unknown = 'unknown',
}

export enum RequestIntent {
    Proposal = 'proposal',
    Plan = 'plan',
    Directive = 'directive',
    Order = 'order',
    OriginalOrder = 'original-order',
    ReflexOrder = 'reflex-order',
    FillerOrder = 'filler-order',
    InstanceOrder = 'instance-order',
    Option = 'option',
}

export enum RequestPriority {
    Routine = 'routine',
    Urgent = 'urgent',
    Asap = 'asap',
    Stat = 'stat',
}

export interface IServiceRequest extends IDomainResource {
    identifier?: IIdentifier[] // Identifiers assigned to this order
    instantiatesCanonical?: string[] // [{ canonical(ActivityDefinition|PlanDefinition) }], // Instantiates FHIR protocol or definition
    instantiatesUri?: string[] // Instantiates external protocol or definition
    basedOn?: IReference[] // [{ Reference(CarePlan|ServiceRequest|MedicationRequest) }], // What request fulfills
    replaces?: IReference[] // [{ Reference(ServiceRequest) }], // What request replaces
    requisition?: IIdentifier // Composite Request ID
    status: RequestStatus // R!  draft | active | on-hold | revoked | completed | entered-in-error | unknown
    intent: RequestIntent // R!  proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
    category?: ICodeableConcept[] // Classification of service
    priority?: RequestPriority // routine | urgent | asap | stat
    doNotPerform?: boolean // True if service/procedure should not be performed
    code?: ICodeableConcept // What is being requested/ordered
    orderDetail?: ICodeableConcept[] // C? Additional order information
    // // quantity[x]: Service amount. One of these 3:
    quantityQuantity?: IQuantity
    quantityRatio?: IRatio
    quantityRange?: Range
    subject: IReference // R!  Individual or Entity the service is ordered for
    encounte?: IReference // { Reference(Encounter) }, // Encounter in which the request was created
    // // occurrence[x]: When service should occur. One of these 3:
    occurrenceDateTime?: Date
    occurrencePeriod?: IPeriod
    occurrenceTiming?: ITiming
    // // asNeeded[x]: Preconditions for service. One of these 2:
    asNeededBoolean?: boolean
    asNeededCodeableConcept?: ICodeableConcept
    authoredOn?: Date // Date request signed
    requester?: IReference //{ Reference(Practitioner|PractitionerRole|Organization|
    //  Patient|RelatedPerson|Device) }, // Who/what is requesting service
    performerType?: ICodeableConcept // Performer role
    performer?: IReference[] // [{ Reference(Practitioner|PractitionerRole|Organization|
    //  CareTeam|HealthcareService|Patient|Device|RelatedPerson) }], // Requested performer
    locationCode?: ICodeableConcept[] // Requested location
    locationReference?: IReference[] // [{ Reference(Location) }], // Requested location
    reasonCode?: ICodeableConcept[] // Explanation/Justification for procedure or service
    reasonReference?: IReference[] // [{ Reference(Condition|Observation|DiagnosticReport|
    //  DocumentReference) }], // Explanation/Justification for service or service
    insurance?: IReference[] // [{ Reference(Coverage|ClaimResponse) }], // Associated insurance coverage
    supportingInfo?: IReference[] // [{ Reference(Any) }], // Additional clinical information
    specimen?: IReference[] // [{ Reference(Specimen) }], // Procedure Samples
    bodySite?: ICodeableConcept[] // Location on Body
    note?: IAnnotation[] // Comments
    patientInstruction?: String // Patient or consumer-oriented instructions
    relevantHistory?: IReference[] // [{ Reference(Provenance) }] // Request provenance
}
