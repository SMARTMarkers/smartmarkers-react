import { IElement } from './Element'
import { IStructureDefinition } from './StructureDefinition'
export interface IMeta extends IElement {
    versionId?: string
    lastUpdated?: string // DateTime TimeZone
    source?: string
    profile?: (IStructureDefinition | string)[]
}
