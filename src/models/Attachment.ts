import { IElement } from './Element'

export interface IAttachment extends IElement {
    contentType?: string
    language?: string
    data?: string
    url?: string
    size?: number
    hash?: string
    title?: string
    creation?: Date
}
