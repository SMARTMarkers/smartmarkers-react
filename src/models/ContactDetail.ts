import { IElement } from './Element'
import { IContactPoint } from './ContactPoint'
export interface IContactDetail extends IElement {
    name?: string
    telecom?: IContactPoint[]
}
