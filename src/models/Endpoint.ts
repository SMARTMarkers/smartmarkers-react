import { IResource } from './Resource'
import { IIdentifier } from './Identifier'
import { ICoding } from './Coding'
import { IOrganization } from './Organization'
import { IContactPoint } from './ContactPoint'
import { IPeriod } from './Period'
import { ICodeableConcept } from './CodeableConcept'
export interface IEndpoint extends IResource {
    identifier: IIdentifier[]
    status: EndpointStatus
    connectionType: ICoding
    name: string
    managingOrganization: IOrganization
    contact: IContactPoint[]
    period: IPeriod
    payloadType: ICodeableConcept[]
    payloadMimeType: string[]
    address: string
    header: string[]
}
export enum EndpointStatus {
    Active = 'active',
    Suspended = 'suspended',
    Error = 'error',
    Off = 'off',
    EnteredInError = 'entered-in-error',
    Test = 'test',
}
