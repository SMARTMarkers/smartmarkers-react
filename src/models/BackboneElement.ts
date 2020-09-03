import { IExtension } from './Extension'
import { IElement } from './Element'

export interface IBackboneElement extends IElement {
    modifiedExtension?: IExtension[]
}
