import { IResource } from './Resource'
import { IIdentifier } from './Identifier'
import { ICodeableConcept } from './CodeableConcept'
import { IContactPoint } from './ContactPoint'
import { IAddress } from './Address'
import { IHumanName } from './HumanName'
import { IEndpoint } from './Endpoint'
export interface IOrganization extends IResource {
    identifier: IIdentifier[]
    active: boolean
    type: ICodeableConcept[]
    name: string
    alias: string[]
    telecom: IContactPoint[]
    address: IAddress[]
    partOf: IOrganization
    contact: [
        {
            purpose: ICodeableConcept
            name: IHumanName
            telecom: IContactPoint[]
            address: IAddress
        }
    ]
    endpoint: IEndpoint[]
}
