import { IElement } from './Element'
export interface IMoney extends IElement {
    value?: number
    currency?: string
}
