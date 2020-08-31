import { IDomainResource } from './DomainResource'

export interface IGroup extends IDomainResource {
    // "identifier" : [{ Identifier }], // Unique id
    // "active" : <boolean>, // Whether this group's record is in active use
    // "type" : "<code>", // R!  person | animal | practitioner | device | medication | substance
    // "actual" : <boolean>, // C? R!  Descriptive or actual
    // "code" : { CodeableConcept }, // Kind of Group members
    // "name" : "<string>", // Label for Group
    // "quantity" : "<unsignedInt>", // Number of members
    // "managingEntity" : { Reference(Organization|RelatedPerson|Practitioner|
    //  PractitionerRole) }, // Entity that is the custodian of the Group's definition
    // "characteristic" : [{ // Include / Exclude group members by Trait
    //   "code" : { CodeableConcept }, // R!  Kind of characteristic
    //   // value[x]: Value held by characteristic. One of these 5:
    //   "valueCodeableConcept" : { CodeableConcept },
    //   "valueBoolean" : <boolean>,
    //   "valueQuantity" : { Quantity },
    //   "valueRange" : { Range },
    //   "valueReference" : { Reference },
    //   "exclude" : <boolean>, // R!  Group includes or excludes
    //   "period" : { Period } // Period over which characteristic is tested
    // }],
    // "member" : [{ // C? Who or what is in group
    //   "entity" : { Reference(Patient|Practitioner|PractitionerRole|Device|
    //   Medication|Substance|Group) }, // R!  Reference to the group member
    //   "period" : { Period }, // Period member belonged to the group
    //   "inactive" : <boolean> // If member is no longer in group
    // }]
}
