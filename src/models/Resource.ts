import { IMeta } from './Meta'
import { ResourceType } from './ResourceType'

export interface IResource {
    id: string
    resourceType: ResourceType
    meta?: IMeta
    implicitRules?: string
    language?: string
}
