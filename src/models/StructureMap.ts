import { IDomainResource } from './DomainResource'

export interface IStructureMap extends IDomainResource {
    // "url" : "<uri>", // R!  Canonical identifier for this structure map, represented as a URI (globally unique)
    // "identifier" : [{ Identifier }], // Additional identifier for the structure map
    // "version" : "<string>", // Business version of the structure map
    // "name" : "<string>", // C? R!  Name for this structure map (computer friendly)
    // "title" : "<string>", // Name for this structure map (human friendly)
    // "status" : "<code>", // R!  draft | active | retired | unknown
    // "experimental" : <boolean>, // For testing purposes, not real usage
    // "date" : "<dateTime>", // Date last changed
    // "publisher" : "<string>", // Name of the publisher (organization or individual)
    // "contact" : [{ ContactDetail }], // Contact details for the publisher
    // "description" : "<markdown>", // Natural language description of the structure map
    // "useContext" : [{ UsageContext }], // The context that the content is intended to support
    // "jurisdiction" : [{ CodeableConcept }], // Intended jurisdiction for structure map (if applicable)
    // "purpose" : "<markdown>", // Why this structure map is defined
    // "copyright" : "<markdown>", // Use and/or publishing restrictions
    // "structure" : [{ // Structure Definition used by this map
    //   "url" : { canonical(StructureDefinition) }, // R!  Canonical reference to structure definition
    //   "mode" : "<code>", // R!  source | queried | target | produced
    //   "alias" : "<string>", // Name for type in this map
    //   "documentation" : "<string>" // Documentation on use of structure
    // }],
    // "import" : [{ canonical(StructureMap) }], // Other maps used by this map (canonical URLs)
    // "group" : [{ // R!  Named sections for reader convenience
    //   "name" : "<id>", // R!  Human-readable label
    //   "extends" : "<id>", // Another group that this group adds rules to
    //   "typeMode" : "<code>", // R!  none | types | type-and-types
    //   "documentation" : "<string>", // Additional description/explanation for group
    //   "input" : [{ // R!  Named instance provided when invoking the map
    //     "name" : "<id>", // R!  Name for this instance of data
    //     "type" : "<string>", // Type for this instance of data
    //     "mode" : "<code>", // R!  source | target
    //     "documentation" : "<string>" // Documentation for this instance of data
    //   }],
    //   "rule" : [{ // R!  Transform Rule from source to target
    //     "name" : "<id>", // R!  Name of the rule for internal references
    //     "source" : [{ // R!  Source inputs to the mapping
    //       "context" : "<id>", // R!  Type or variable this rule applies to
    //       "min" : <integer>, // Specified minimum cardinality
    //       "max" : "<string>", // Specified maximum cardinality (number or *)
    //       "type" : "<string>", // Rule only applies if source has this type
    //       // defaultValue[x]: Default value if no value exists. One of these 50:
    //       "defaultValueBase64Binary" : "<base64Binary>",
    //       "defaultValueBoolean" : <boolean>,
    //       "defaultValueCanonical" : "<canonical>",
    //       "defaultValueCode" : "<code>",
    //       "defaultValueDate" : "<date>",
    //       "defaultValueDateTime" : "<dateTime>",
    //       "defaultValueDecimal" : <decimal>,
    //       "defaultValueId" : "<id>",
    //       "defaultValueInstant" : "<instant>",
    //       "defaultValueInteger" : <integer>,
    //       "defaultValueMarkdown" : "<markdown>",
    //       "defaultValueOid" : "<oid>",
    //       "defaultValuePositiveInt" : "<positiveInt>",
    //       "defaultValueString" : "<string>",
    //       "defaultValueTime" : "<time>",
    //       "defaultValueUnsignedInt" : "<unsignedInt>",
    //       "defaultValueUri" : "<uri>",
    //       "defaultValueUrl" : "<url>",
    //       "defaultValueUuid" : "<uuid>",
    //       "defaultValueAddress" : { Address },
    //       "defaultValueAge" : { Age },
    //       "defaultValueAnnotation" : { Annotation },
    //       "defaultValueAttachment" : { Attachment },
    //       "defaultValueCodeableConcept" : { CodeableConcept },
    //       "defaultValueCoding" : { Coding },
    //       "defaultValueContactPoint" : { ContactPoint },
    //       "defaultValueCount" : { Count },
    //       "defaultValueDistance" : { Distance },
    //       "defaultValueDuration" : { Duration },
    //       "defaultValueHumanName" : { HumanName },
    //       "defaultValueIdentifier" : { Identifier },
    //       "defaultValueMoney" : { Money },
    //       "defaultValuePeriod" : { Period },
    //       "defaultValueQuantity" : { Quantity },
    //       "defaultValueRange" : { Range },
    //       "defaultValueRatio" : { Ratio },
    //       "defaultValueReference" : { Reference },
    //       "defaultValueSampledData" : { SampledData },
    //       "defaultValueSignature" : { Signature },
    //       "defaultValueTiming" : { Timing },
    //       "defaultValueContactDetail" : { ContactDetail },
    //       "defaultValueContributor" : { Contributor },
    //       "defaultValueDataRequirement" : { DataRequirement },
    //       "defaultValueExpression" : { Expression },
    //       "defaultValueParameterDefinition" : { ParameterDefinition },
    //       "defaultValueRelatedArtifact" : { RelatedArtifact },
    //       "defaultValueTriggerDefinition" : { TriggerDefinition },
    //       "defaultValueUsageContext" : { UsageContext },
    //       "defaultValueDosage" : { Dosage },
    //       "defaultValueMeta" : { Meta },
    //       "element" : "<string>", // Optional field for this source
    //       "listMode" : "<code>", // first | not_first | last | not_last | only_one
    //       "variable" : "<id>", // Named context for field, if a field is specified
    //       "condition" : "<string>", // FHIRPath expression  - must be true or the rule does not apply
    //       "check" : "<string>", // FHIRPath expression  - must be true or the mapping engine throws an error instead of completing
    //       "logMessage" : "<string>" // Message to put in log if source exists (FHIRPath)
    //     }],
    //     "target" : [{ // Content to create because of this mapping rule
    //       "context" : "<id>", // Type or variable this rule applies to
    //       "contextType" : "<code>", // type | variable
    //       "element" : "<string>", // Field to create in the context
    //       "variable" : "<id>", // Named context for field, if desired, and a field is specified
    //       "listMode" : ["<code>"], // first | share | last | collate
    //       "listRuleId" : "<id>", // Internal rule reference for shared list items
    //       "transform" : "<code>", // create | copy +
    //       "parameter" : [{ // Parameters to the transform
    //         // value[x]: Parameter value - variable or literal. One of these 5:
    //         "valueId" : "<id>"
    //         "valueString" : "<string>"
    //         "valueBoolean" : <boolean>
    //         "valueInteger" : <integer>
    //         "valueDecimal" : <decimal>
    //       }]
    //     }],
    //     "rule" : [{ Content as for StructureMap.group.rule }], // Rules contained in this rule
    //     "dependent" : [{ // Which other rules to apply in the context of this rule
    //       "name" : "<id>", // R!  Name of a rule or group to apply
    //       "variable" : ["<string>"] // R!  Variable to pass to the rule or group
    //     }],
    //     "documentation" : "<string>" // Documentation for this instance of data
    //   }]
    // }]
}
