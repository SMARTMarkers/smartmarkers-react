import { IElement } from './Element'
import { IQuantity } from './Quantity'
export interface IRatio extends IElement {
    numerator?: IQuantity
    denominator?: IQuantity
}
