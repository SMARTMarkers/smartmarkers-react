import { IBackboneElement } from './BackboneElement'

export interface IElementDefinition extends IBackboneElement {
    // from BackboneElement: extension, modifierExtension
    //   "path" : "<string>", // R!  Path of the element in the hierarchy of elements
    //   "representation" : ["<code>"], // xmlAttr | xmlText | typeAttr | cdaText | xhtml
    //   "sliceName" : "<string>", // Name for this particular element (in a set of slices)
    //   "sliceIsConstraining" : <boolean>, // If this slice definition constrains an inherited slice definition (or not)
    //   "label" : "<string>", // Name for element to display with or prompt for element
    //   "code" : [{ Coding }], // Corresponding codes in terminologies
    //   "slicing" : { // This element is sliced - slices follow
    //     "discriminator" : [{ // Element values that are used to distinguish the slices
    //       "type" : "<code>", // R!  value | exists | pattern | type | profile
    //       "path" : "<string>" // R!  Path to element value
    //     }],
    //     "description" : "<string>", // C? Text description of how slicing works (or not)
    //     "ordered" : <boolean>, // If elements must be in same order as slices
    //     "rules" : "<code>" // R!  closed | open | openAtEnd
    //   },
    //   "short" : "<string>", // Concise definition for space-constrained presentation
    //   "definition" : "<markdown>", // Full formal definition as narrative text
    //   "comment" : "<markdown>", // Comments about the use of this element
    //   "requirements" : "<markdown>", // Why this resource has been created
    //   "alias" : ["<string>"], // Other names
    //   "min" : "<unsignedInt>", // C? Minimum Cardinality
    //   "max" : "<string>", // C? Maximum Cardinality (a number or *)
    //   "base" : { // Base definition information for tools
    //     "path" : "<string>", // R!  Path that identifies the base element
    //     "min" : "<unsignedInt>", // R!  Min cardinality of the base element
    //     "max" : "<string>" // R!  Max cardinality of the base element
    //   },
    //   "contentReference" : "<uri>", // C? Reference to definition of content for the element
    //   "type" : [{ // C? Data type and Profile for this element
    //     "code" : "<uri>", // R!  Data type or Resource (reference to definition)
    //     "profile" : [{ canonical(StructureDefinition|ImplementationGuide) }], // Profiles (StructureDefinition or IG) - one must apply
    //     "targetProfile" : [{ canonical(StructureDefinition|ImplementationGuide) }], // Profile (StructureDefinition or IG) on the Reference/canonical target - one must apply
    //     "aggregation" : ["<code>"], // C? contained | referenced | bundled - how aggregated
    //     "versioning" : "<code>" // either | independent | specific
    //   }],
    //   // defaultValue[x]: Specified value if missing from instance. One of these 50:
    //   "defaultValueBase64Binary" : "<base64Binary>",
    //   "defaultValueBoolean" : <boolean>,
    //   "defaultValueCanonical" : "<canonical>",
    //   "defaultValueCode" : "<code>",
    //   "defaultValueDate" : "<date>",
    //   "defaultValueDateTime" : "<dateTime>",
    //   "defaultValueDecimal" : <decimal>,
    //   "defaultValueId" : "<id>",
    //   "defaultValueInstant" : "<instant>",
    //   "defaultValueInteger" : <integer>,
    //   "defaultValueMarkdown" : "<markdown>",
    //   "defaultValueOid" : "<oid>",
    //   "defaultValuePositiveInt" : "<positiveInt>",
    //   "defaultValueString" : "<string>",
    //   "defaultValueTime" : "<time>",
    //   "defaultValueUnsignedInt" : "<unsignedInt>",
    //   "defaultValueUri" : "<uri>",
    //   "defaultValueUrl" : "<url>",
    //   "defaultValueUuid" : "<uuid>",
    //   "defaultValueAddress" : { Address },
    //   "defaultValueAge" : { Age },
    //   "defaultValueAnnotation" : { Annotation },
    //   "defaultValueAttachment" : { Attachment },
    //   "defaultValueCodeableConcept" : { CodeableConcept },
    //   "defaultValueCoding" : { Coding },
    //   "defaultValueContactPoint" : { ContactPoint },
    //   "defaultValueCount" : { Count },
    //   "defaultValueDistance" : { Distance },
    //   "defaultValueDuration" : { Duration },
    //   "defaultValueHumanName" : { HumanName },
    //   "defaultValueIdentifier" : { Identifier },
    //   "defaultValueMoney" : { Money },
    //   "defaultValuePeriod" : { Period },
    //   "defaultValueQuantity" : { Quantity },
    //   "defaultValueRange" : { Range },
    //   "defaultValueRatio" : { Ratio },
    //   "defaultValueReference" : { Reference },
    //   "defaultValueSampledData" : { SampledData },
    //   "defaultValueSignature" : { Signature },
    //   "defaultValueTiming" : { Timing },
    //   "defaultValueContactDetail" : { ContactDetail },
    //   "defaultValueContributor" : { Contributor },
    //   "defaultValueDataRequirement" : { DataRequirement },
    //   "defaultValueExpression" : { Expression },
    //   "defaultValueParameterDefinition" : { ParameterDefinition },
    //   "defaultValueRelatedArtifact" : { RelatedArtifact },
    //   "defaultValueTriggerDefinition" : { TriggerDefinition },
    //   "defaultValueUsageContext" : { UsageContext },
    //   "defaultValueDosage" : { Dosage },
    //   "defaultValueMeta" : { Meta },
    //   "meaningWhenMissing" : "<markdown>", // C? Implicit meaning when this element is missing
    //   "orderMeaning" : "<string>", // What the order of the elements means
    //   // fixed[x]: Value must be exactly this. One of these 50:
    //   "fixedBase64Binary" : "<base64Binary>",
    //   "fixedBoolean" : <boolean>,
    //   "fixedCanonical" : "<canonical>",
    //   "fixedCode" : "<code>",
    //   "fixedDate" : "<date>",
    //   "fixedDateTime" : "<dateTime>",
    //   "fixedDecimal" : <decimal>,
    //   "fixedId" : "<id>",
    //   "fixedInstant" : "<instant>",
    //   "fixedInteger" : <integer>,
    //   "fixedMarkdown" : "<markdown>",
    //   "fixedOid" : "<oid>",
    //   "fixedPositiveInt" : "<positiveInt>",
    //   "fixedString" : "<string>",
    //   "fixedTime" : "<time>",
    //   "fixedUnsignedInt" : "<unsignedInt>",
    //   "fixedUri" : "<uri>",
    //   "fixedUrl" : "<url>",
    //   "fixedUuid" : "<uuid>",
    //   "fixedAddress" : { Address },
    //   "fixedAge" : { Age },
    //   "fixedAnnotation" : { Annotation },
    //   "fixedAttachment" : { Attachment },
    //   "fixedCodeableConcept" : { CodeableConcept },
    //   "fixedCoding" : { Coding },
    //   "fixedContactPoint" : { ContactPoint },
    //   "fixedCount" : { Count },
    //   "fixedDistance" : { Distance },
    //   "fixedDuration" : { Duration },
    //   "fixedHumanName" : { HumanName },
    //   "fixedIdentifier" : { Identifier },
    //   "fixedMoney" : { Money },
    //   "fixedPeriod" : { Period },
    //   "fixedQuantity" : { Quantity },
    //   "fixedRange" : { Range },
    //   "fixedRatio" : { Ratio },
    //   "fixedReference" : { Reference },
    //   "fixedSampledData" : { SampledData },
    //   "fixedSignature" : { Signature },
    //   "fixedTiming" : { Timing },
    //   "fixedContactDetail" : { ContactDetail },
    //   "fixedContributor" : { Contributor },
    //   "fixedDataRequirement" : { DataRequirement },
    //   "fixedExpression" : { Expression },
    //   "fixedParameterDefinition" : { ParameterDefinition },
    //   "fixedRelatedArtifact" : { RelatedArtifact },
    //   "fixedTriggerDefinition" : { TriggerDefinition },
    //   "fixedUsageContext" : { UsageContext },
    //   "fixedDosage" : { Dosage },
    //   "fixedMeta" : { Meta },
    //   // pattern[x]: Value must have at least these property values. One of these 50:
    //   "patternBase64Binary" : "<base64Binary>",
    //   "patternBoolean" : <boolean>,
    //   "patternCanonical" : "<canonical>",
    //   "patternCode" : "<code>",
    //   "patternDate" : "<date>",
    //   "patternDateTime" : "<dateTime>",
    //   "patternDecimal" : <decimal>,
    //   "patternId" : "<id>",
    //   "patternInstant" : "<instant>",
    //   "patternInteger" : <integer>,
    //   "patternMarkdown" : "<markdown>",
    //   "patternOid" : "<oid>",
    //   "patternPositiveInt" : "<positiveInt>",
    //   "patternString" : "<string>",
    //   "patternTime" : "<time>",
    //   "patternUnsignedInt" : "<unsignedInt>",
    //   "patternUri" : "<uri>",
    //   "patternUrl" : "<url>",
    //   "patternUuid" : "<uuid>",
    //   "patternAddress" : { Address },
    //   "patternAge" : { Age },
    //   "patternAnnotation" : { Annotation },
    //   "patternAttachment" : { Attachment },
    //   "patternCodeableConcept" : { CodeableConcept },
    //   "patternCoding" : { Coding },
    //   "patternContactPoint" : { ContactPoint },
    //   "patternCount" : { Count },
    //   "patternDistance" : { Distance },
    //   "patternDuration" : { Duration },
    //   "patternHumanName" : { HumanName },
    //   "patternIdentifier" : { Identifier },
    //   "patternMoney" : { Money },
    //   "patternPeriod" : { Period },
    //   "patternQuantity" : { Quantity },
    //   "patternRange" : { Range },
    //   "patternRatio" : { Ratio },
    //   "patternReference" : { Reference },
    //   "patternSampledData" : { SampledData },
    //   "patternSignature" : { Signature },
    //   "patternTiming" : { Timing },
    //   "patternContactDetail" : { ContactDetail },
    //   "patternContributor" : { Contributor },
    //   "patternDataRequirement" : { DataRequirement },
    //   "patternExpression" : { Expression },
    //   "patternParameterDefinition" : { ParameterDefinition },
    //   "patternRelatedArtifact" : { RelatedArtifact },
    //   "patternTriggerDefinition" : { TriggerDefinition },
    //   "patternUsageContext" : { UsageContext },
    //   "patternDosage" : { Dosage },
    //   "patternMeta" : { Meta },
    //   "example" : [{ // Example value (as defined for type)
    //     "label" : "<string>", // R!  Describes the purpose of this example
    //     // value[x]: Value of Example (one of allowed types). One of these 50:
    //     "valueBase64Binary" : "<base64Binary>"
    //     "valueBoolean" : <boolean>
    //     "valueCanonical" : "<canonical>"
    //     "valueCode" : "<code>"
    //     "valueDate" : "<date>"
    //     "valueDateTime" : "<dateTime>"
    //     "valueDecimal" : <decimal>
    //     "valueId" : "<id>"
    //     "valueInstant" : "<instant>"
    //     "valueInteger" : <integer>
    //     "valueMarkdown" : "<markdown>"
    //     "valueOid" : "<oid>"
    //     "valuePositiveInt" : "<positiveInt>"
    //     "valueString" : "<string>"
    //     "valueTime" : "<time>"
    //     "valueUnsignedInt" : "<unsignedInt>"
    //     "valueUri" : "<uri>"
    //     "valueUrl" : "<url>"
    //     "valueUuid" : "<uuid>"
    //     "valueAddress" : { Address }
    //     "valueAge" : { Age }
    //     "valueAnnotation" : { Annotation }
    //     "valueAttachment" : { Attachment }
    //     "valueCodeableConcept" : { CodeableConcept }
    //     "valueCoding" : { Coding }
    //     "valueContactPoint" : { ContactPoint }
    //     "valueCount" : { Count }
    //     "valueDistance" : { Distance }
    //     "valueDuration" : { Duration }
    //     "valueHumanName" : { HumanName }
    //     "valueIdentifier" : { Identifier }
    //     "valueMoney" : { Money }
    //     "valuePeriod" : { Period }
    //     "valueQuantity" : { Quantity }
    //     "valueRange" : { Range }
    //     "valueRatio" : { Ratio }
    //     "valueReference" : { Reference }
    //     "valueSampledData" : { SampledData }
    //     "valueSignature" : { Signature }
    //     "valueTiming" : { Timing }
    //     "valueContactDetail" : { ContactDetail }
    //     "valueContributor" : { Contributor }
    //     "valueDataRequirement" : { DataRequirement }
    //     "valueExpression" : { Expression }
    //     "valueParameterDefinition" : { ParameterDefinition }
    //     "valueRelatedArtifact" : { RelatedArtifact }
    //     "valueTriggerDefinition" : { TriggerDefinition }
    //     "valueUsageContext" : { UsageContext }
    //     "valueDosage" : { Dosage }
    //     "valueMeta" : { Meta }
    //   }],
    //   // minValue[x]: Minimum Allowed Value (for some types). One of these 9:
    //   "minValueDate" : "<date>",
    //   "minValueDateTime" : "<dateTime>",
    //   "minValueInstant" : "<instant>",
    //   "minValueTime" : "<time>",
    //   "minValueDecimal" : <decimal>,
    //   "minValueInteger" : <integer>,
    //   "minValuePositiveInt" : "<positiveInt>",
    //   "minValueUnsignedInt" : "<unsignedInt>",
    //   "minValueQuantity" : { Quantity },
    //   // maxValue[x]: Maximum Allowed Value (for some types). One of these 9:
    //   "maxValueDate" : "<date>",
    //   "maxValueDateTime" : "<dateTime>",
    //   "maxValueInstant" : "<instant>",
    //   "maxValueTime" : "<time>",
    //   "maxValueDecimal" : <decimal>,
    //   "maxValueInteger" : <integer>,
    //   "maxValuePositiveInt" : "<positiveInt>",
    //   "maxValueUnsignedInt" : "<unsignedInt>",
    //   "maxValueQuantity" : { Quantity },
    //   "maxLength" : <integer>, // Max length for strings
    //   "condition" : ["<id>"], // Reference to invariant about presence
    //   "constraint" : [{ // Condition that must evaluate to true
    //     "key" : "<id>", // C? R!  Target of 'condition' reference above
    //     "requirements" : "<string>", // Why this constraint is necessary or appropriate
    //     "severity" : "<code>", // R!  error | warning
    //     "human" : "<string>", // R!  Human description of constraint
    //     "expression" : "<string>", // FHIRPath expression of constraint
    //     "xpath" : "<string>", // XPath expression of constraint
    //     "source" : { canonical(StructureDefinition) } // Reference to original source of constraint
    //   }],
    //   "mustSupport" : <boolean>, // If the element must be supported
    //   "isModifier" : <boolean>, // If this modifies the meaning of other elements
    //   "isModifierReason" : "<string>", // Reason that this element is marked as a modifier
    //   "isSummary" : <boolean>, // Include when _summary = true?
    //   "binding" : { // C? ValueSet details if this is coded
    //     "strength" : "<code>", // R!  required | extensible | preferred | example
    //     "description" : "<string>", // Human explanation of the value set
    //     "valueSet" : { canonical(ValueSet) } // C? Source of value set
    //   },
    //   "mapping" : [{ // Map element to another set of definitions
    //     "identity" : "<id>", // R!  Reference to mapping declaration
    //     "language" : "<code>", // Computable language of mapping
    //     "map" : "<string>", // R!  Details of the mapping
    //     "comment" : "<string>" // Comments about the mapping or its use
    //   }]
}
