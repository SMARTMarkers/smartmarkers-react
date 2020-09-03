import { IElement } from './Element'
import { IQuantity } from './Quantity'
export interface ISampledData extends IElement {
    origin: IQuantity
    period: number
    factor?: number
    lowerLimit?: number
    upperLimit?: number
    dimensions: number
    data?: string
}
