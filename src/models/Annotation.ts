import { IElement } from './Element'
import { IReference } from './Reference'

export interface IAnnotation extends IElement {
    authorReference: IReference
    authorString: string
    time: Date
    text: string
}
