import { IElement } from './Element'
import { IQuantity } from './Quantity'
export interface IRange extends IElement {
    low?: IQuantity
    high?: IQuantity
}
