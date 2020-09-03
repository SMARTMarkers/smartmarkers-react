import { IDomainResource } from './DomainResource'
import { IReference } from './Reference'
import { ICodeableConcept } from './CodeableConcept'
import { ISimpleQuantity, IQuantity } from './Quantity'
import { IPeriod } from './Period'
import { IIdentifier, ITiming, IRatio, ISampledData, IAnnotation } from '.'
import { IBackboneElement } from './BackboneElement'

export enum ObservationStatus {
    Registered = 'registered',
    Preliminary = 'preliminary',
    Final = 'final',
    Amended = 'amended',
}

export interface IObservationReferenceRange extends IBackboneElement {
    // Provides guide for interpretation
    low?: ISimpleQuantity // C? Low Range, if relevant
    high?: ISimpleQuantity // C? High Range, if relevant
    type?: ICodeableConcept // Reference range qualifier
    appliesTo?: ICodeableConcept[] // Reference range population
    age?: Range // Applicable age range, if relevant
    text?: string // Text based reference range in an observation
}

export interface IObservationComponent extends IBackboneElement {
    // Component results
    code: ICodeableConcept // R!  Type of component observation (code / type)
    // value[x]: Actual component result. One of these 11:
    valueQuantity?: IQuantity
    valueCodeableConcept?: ICodeableConcept
    valueString?: string
    valueBoolean?: boolean
    valueInteger?: number
    valueRange?: Range
    valueRatio?: IRatio
    valueSampledData?: ISampledData
    valueTime?: Date
    valueDateTime?: Date
    valuePeriod?: IPeriod
    dataAbsentReason?: ICodeableConcept // C? Why the component result is missing
    interpretation?: ICodeableConcept[] // High, low, normal, etc.
    referenceRange?: IObservationReferenceRange[] // Provides guide for interpretation of component result
}

export interface IObservation extends IDomainResource {
    identifier?: IIdentifier[] // Business Identifier for observation
    basedOn?: IReference[] // Fulfills plan, proposal or order
    partOf?: IReference[] // Part of referenced event
    status: ObservationStatus // R!  registered | preliminary | final | amended +
    category?: ICodeableConcept[] // Classification of  type of observation
    code: ICodeableConcept // R!  Type of observation (code / type)
    subject?: IReference // Who and/or what the observation is about
    focus?: IReference[] // What the observation is about, when it is not about the subject of record
    encounter?: IReference // Healthcare event during which this observation is made
    // effective[x]: Clinically relevant time/time-period for observation. One of these 4:
    effectiveDateTime?: Date
    effectivePeriod?: IPeriod
    effectiveTiming?: ITiming
    effectiveDate?: Date
    issued?: Date // Date/Time this version was made available
    performer?: IReference[] // Who is responsible for the observation
    // value[x]: Actual result. One of these 11:
    valueQuantity?: IQuantity
    valueCodeableConcept?: ICodeableConcept
    valueString?: string
    valueBoolean?: boolean
    valueInteger?: number
    valueRange?: Range
    valueRatio?: IRatio
    valueSampledData?: ISampledData
    valueTime?: Date
    valueDateTime?: Date
    valuePeriod?: IPeriod
    dataAbsentReason?: ICodeableConcept // C? Why the result is missing
    interpretation?: ICodeableConcept[] // High, low, normal, etc.
    note?: IAnnotation[] // Comments about the observation
    bodySite?: ICodeableConcept // Observed body part
    method?: ICodeableConcept // How it was done
    specimen?: IReference // Specimen used for this observation
    device?: IReference // (Measurement) Device
    referenceRange?: IObservationReferenceRange[]
    hasMember?: IReference[] // Related resource that belongs to the Observation group
    derivedFrom?: IReference[] // Related measurements the observation is made from
    component?: IObservationComponent[]
}
