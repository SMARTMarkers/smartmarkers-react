import { IElement } from './Element'
import { IContactDetail } from './ContactDetail'
export interface IContributor extends IElement {
    type: ContributorType
    name: string
    contact?: IContactDetail
}
export enum ContributorType {
    Author = 'author',
    Editor = 'editor',
    Reviewer = 'reviewer',
    Endorser = 'endorser',
}
