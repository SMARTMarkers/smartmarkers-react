import { IElement } from './Element'
import { IAddress } from './Address'
import { IAge } from './Age'
import { IAnnotation } from './Annotation'
import { IAttachment } from './Attachment'
import { ICodeableConcept } from './CodeableConcept'
import { ICoding } from './Coding'
import { IContactPoint } from './ContactPoint'
import { ICount } from './Count'
import { IDistance } from './Distance'
import { IDuration } from './Duration'
import { IHumanName } from './HumanName'
import { IIdentifier } from './Identifier'
import { IMoney } from './Money'
import { IPeriod } from './Period'
import { IQuantity } from './Quantity'
import { IRatio } from './Ratio'
import { IReference } from './Reference'
import { ISampledData } from './SampledData'
import { ISignature } from './Signature'
import { ITiming } from './Timing'
import { IContactDetail } from './ContactDetail'
import { IUsageContext } from './UsageContext'
import { IContributor } from './Contributor'
import { IDataRequirement } from './DataRequirement'
import { IParameterDefinition } from './ParameterDefinition'
import { IExpression } from './Expression'
import { IRelatedArtifact } from './RelatedArtifact'
import { ITriggerDefinition } from './TriggerDefinition'
import { IDosage } from './Dosage'
import { IMeta } from './Meta'
export interface IExtension extends IElement {
    url: string
    valueBase64Binary?: any
    valueBoolean?: boolean
    valueCanonical?: string
    valueCode?: string
    valueDate?: Date
    valueDateTime?: Date
    valueDecimal?: number
    valueId?: string
    valueInstant?: string
    valueInteger?: number
    valueMarkdown?: string
    valueOid?: string
    valuePositiveInt?: number
    valueString?: string
    valueTime?: Date
    valueUnsignedInt?: string
    valueUri?: string
    valueUrl?: string
    valueUuid?: string
    valueAddress?: IAddress
    valueAge?: IAge
    valueAnnotation?: IAnnotation
    valueAttachment?: IAttachment
    valueCodeableConcept?: ICodeableConcept
    valueCoding?: ICoding
    valueContactPoint?: IContactPoint
    valueCount?: ICount
    valueDistance?: IDistance
    valueDuration?: IDuration
    valueHumanName?: IHumanName
    valueIdentifier?: IIdentifier
    valueMoney?: IMoney
    valuePeriod?: IPeriod
    valueQuantity?: IQuantity
    valueRange?: Range
    valueRatio?: IRatio
    valueReference?: IReference
    valueSampledData?: ISampledData
    valueSignature?: ISignature
    valueTiming?: ITiming
    valueContactDetail?: IContactDetail
    valueContributor?: IContributor
    valueDataRequirement?: IDataRequirement
    valueExpression?: IExpression
    valueParameterDefinition?: IParameterDefinition
    valueRelatedArtifact?: IRelatedArtifact
    valueTriggerDefinition?: ITriggerDefinition
    valueUsageContext?: IUsageContext
    valueDosage?: IDosage
    valueMeta?: IMeta
}
