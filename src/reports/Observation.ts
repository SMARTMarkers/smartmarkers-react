import {
    IObservation,
    IIdentifier,
    IReference,
    ObservationStatus,
    ICodeableConcept,
    IPeriod,
    ITiming,
    IQuantity,
    IRatio,
    ISampledData,
    IAnnotation,
    IObservationReferenceRange,
    IObservationComponent,
    INarrative,
    IResource,
    IExtension,
    ResourceType,
    IMeta,
} from '../models'
import { Server } from '../models/internal'
import { Report } from './Report'

export class Observation implements IObservation, Report {
    id: string
    resourceType: ResourceType = 'Observation'
    code: ICodeableConcept
    identifier?: IIdentifier[] | undefined
    basedOn?: IReference[] | undefined
    partOf?: IReference[] | undefined
    status: ObservationStatus
    category?: ICodeableConcept[] | undefined

    subject?: IReference | undefined
    focus?: IReference[] | undefined
    encounter?: IReference | undefined
    effectiveDateTime?: Date | undefined
    effectivePeriod?: IPeriod | undefined
    effectiveTiming?: ITiming | undefined
    effectiveDate?: Date | undefined
    issued?: Date | undefined
    performer?: IReference[] | undefined
    valueQuantity?: IQuantity | undefined
    valueCodeableConcept?: ICodeableConcept | undefined
    valueString?: string | undefined
    valueBoolean?: boolean | undefined
    valueInteger?: number | undefined
    valueRange?: Range | undefined
    valueRatio?: IRatio | undefined
    valueSampledData?: ISampledData | undefined
    valueTime?: Date | undefined
    valueDateTime?: Date | undefined
    valuePeriod?: IPeriod | undefined
    dataAbsentReason?: ICodeableConcept | undefined
    interpretation?: ICodeableConcept[] | undefined
    note?: IAnnotation[] | undefined
    bodySite?: ICodeableConcept | undefined
    method?: ICodeableConcept | undefined
    specimen?: IReference | undefined
    device?: IReference | undefined
    referenceRange?: IObservationReferenceRange[] | undefined
    hasMember?: IReference[] | undefined
    derivedFrom?: IReference[] | undefined
    component?: IObservationComponent[] | undefined
    text?: INarrative | undefined
    contained?: IResource[] | undefined
    extension?: IExtension[] | undefined
    modifierExtension?: IExtension[] | undefined
    meta?: IMeta | undefined
    implicitRules?: string | undefined
    language?: string | undefined

    constructor(item: IObservation, public server: Server) {
        this.id = item.id
        this.status = item.status
        this.code = item.code
        Object.assign(this, item)
    }

    public getSummary() {
        return this.getTitle()
    }

    public getTitle() {
        if (this.code && this.code.text) {
            return this.code.text
        }

        return this.id
    }

    public getNote() {
        if (
            this.modifierExtension &&
            this.modifierExtension.length > 0 &&
            this.modifierExtension[0] &&
            this.modifierExtension[0].valueReference &&
            this.modifierExtension[0].valueReference.reference
        ) {
            return this.modifierExtension[0].valueReference.reference
        }
        if (
            this.extension &&
            this.extension.length > 0 &&
            this.extension[0] &&
            this.extension[0].valueReference &&
            this.extension[0].valueReference.reference
        ) {
            return this.extension[0].valueReference.reference
        }

        return this.resourceType
    }
}
