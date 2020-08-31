import { IDomainResource } from './DomainResource'

export interface IPlanDefinition extends IDomainResource {
    //   "url" : string, // Canonical identifier for this plan definition, represented as a URI (globally unique)
    //   "identifier" : Identifier[], // Additional identifier for the plan definition
    //   "version" : string, // Business version of the plan definition
    //   "name" : string, // C? Name for this plan definition (computer friendly)
    //   "title" : string, // Name for this plan definition (human friendly)
    //   "subtitle" : string, // Subordinate title of the plan definition
    //   "type" : CodeableConcept, // order-set | clinical-protocol | eca-rule | workflow-definition
    //   "status" : "<code>", // R!  draft | active | retired | unknown
    //   "experimental" : <boolean>, // For testing purposes, not real usage
    //   // subject[x]: Type of individual the plan definition is focused on. One of these 2:
    //   "subjectCodeableConcept" : CodeableConcept,
    //   "subjectReference" : { Reference(Group) },
    //   "date" : Date, // Date last changed
    //   "publisher" : string, // Name of the publisher (organization or individual)
    //   "contact" : ContactDetail[], // Contact details for the publisher
    //   "description" : string, // Natural language description of the plan definition
    //   "useContext" : UsageContext[], // The context that the content is intended to support
    //   "jurisdiction" : CodeableConcept[], // Intended jurisdiction for plan definition (if applicable)
    //   "purpose" : string, // Why this plan definition is defined
    //   "usage" : string, // Describes the clinical usage of the plan
    //   "copyright" : string, // Use and/or publishing restrictions
    //   "approvalDate" : Date, // When the plan definition was approved by publisher
    //   "lastReviewDate" : Date, // When the plan definition was last reviewed
    //   "effectivePeriod" : Period, // When the plan definition is expected to be used
    //   "topic" : CodeableConcept[], // E.g. Education, Treatment, Assessment
    //   "author" : ContactDetail[], // Who authored the content
    //   "editor" : ContactDetail[], // Who edited the content
    //   "reviewer" : ContactDetail[], // Who reviewed the content
    //   "endorser" : ContactDetail[], // Who endorsed the content
    //   "relatedArtifact" : RelatedArtifact[], // Additional documentation, citations
    //   "library" : string[], // Logic used by the plan definition
    //   "goal" : [{ // What the plan is trying to accomplish
    //     "category" : CodeableConcept, // E.g. Treatment, dietary, behavioral
    //     "description" : CodeableConcept, // R!  Code or text describing the goal
    //     "priority" : CodeableConcept, // high-priority | medium-priority | low-priority
    //     "start" : CodeableConcept, // When goal pursuit begins
    //     "addresses" : CodeableConcept[], // What does the goal address
    //     "documentation" : RelatedArtifact[], // Supporting documentation for the goal
    //     "target" : [{ // Target outcome for the goal
    //       "measure" : CodeableConcept, // The parameter whose value is to be tracked
    //       // detail[x]: The target value to be achieved. One of these 3:
    //       "detailQuantity" : Quantity,
    //       "detailRange" : Range,
    //       "detailCodeableConcept" : CodeableConcept,
    //       "due" : Duration // Reach goal within
    //     }]
    //   }],
    //   "action" : [{ // Action defined by the plan
    //     "prefix" : string, // User-visible prefix for the action (e.g. 1. or A.)
    //     "title" : string, // User-visible title
    //     "description" : string, // Brief description of the action
    //     "textEquivalent" : string, // Static text equivalent of the action, used if the dynamic aspects cannot be interpreted by the receiving system
    //     "priority" : "<code>", // routine | urgent | asap | stat
    //     "code" : CodeableConcept[], // Code representing the meaning of the action or sub-actions
    //     "reason" : CodeableConcept[], // Why the action should be performed
    //     "documentation" : RelatedArtifact[], // Supporting documentation for the intended performer of the action
    //     "goalId" : ["<id>"], // What goals this action supports
    //     // subject[x]: Type of individual the action is focused on. One of these 2:
    //     "subjectCodeableConcept" : CodeableConcept,
    //     "subjectReference" : Group,
    //     "trigger" : TriggerDefinition[], // When the action should be triggered
    //     "condition" : [{ // Whether or not the action is applicable
    //       "kind" : "<code>", // R!  applicability | start | stop
    //       "expression" : { Expression } // Boolean-valued expression
    //     }],
    //     "input" : DataRequirement[], // Input data requirements
    //     "output" : DataRequirement[], // Output data definition
    //     "relatedAction" : [{ // Relationship to another action
    //       "actionId" : "<id>", // R!  What action is this related to
    //       "relationship" : "<code>", // R!  before-start | before | before-end | concurrent-with-start | concurrent | concurrent-with-end | after-start | after | after-end
    //       // offset[x]: Time offset for the relationship. One of these 2:
    //       "offsetDuration" : Duration
    //       "offsetRange" : Range
    //     }],
    //     // timing[x]: When the action should take place. One of these 6:
    //     "timingDateTime" : Date,
    //     "timingAge" : Age,
    //     "timingPeriod" : Period,
    //     "timingDuration" : Duration,
    //     "timingRange" : Range,
    //     "timingTiming" : Timing,
    //     "participant" : [{ // Who should participate in the action
    //       "type" : "<code>", // R!  patient | practitioner | related-person | device
    //       "role" : CodeableConcept // E.g. Nurse, Surgeon, Parent
    //     }],
    //     "type" : CodeableConcept, // create | update | remove | fire-event
    //     "groupingBehavior" : "<code>", // visual-group | logical-group | sentence-group
    //     "selectionBehavior" : "<code>", // any | all | all-or-none | exactly-one | at-most-one | one-or-more
    //     "requiredBehavior" : "<code>", // must | could | must-unless-documented
    //     "precheckBehavior" : "<code>", // yes | no
    //     "cardinalityBehavior" : "<code>", // single | multiple
    //     // definition[x]: Description of the activity to be performed. One of these 2:
    //     "definitionCanonical" : ActivityDefinition | PlanDefinition| Questionnaire,
    //     "definitionUri" : string,
    //     "transform" : { canonical(StructureMap) }, // Transform to apply the template
    //     "dynamicValue" : [{ // Dynamic aspects of the definition
    //       "path" : string, // The path to the element to be set dynamically
    //       "expression" : { Expression } // An expression that provides the dynamic value for the customization
    //     }],
    //     "action" : [{ Content as for PlanDefinition.action }] // A sub-action
    //   }]
}
