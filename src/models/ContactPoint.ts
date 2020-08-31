import { IPeriod } from './Period'
import { IElement } from './Element'
export interface IContactPoint extends IElement {
    system?: ContactPointSystem
    value?: string
    use?: ContactPointUse
    rank?: number
    period?: IPeriod
}
export enum ContactPointSystem {
    Phone = 'phone',
    Fax = 'fax',
    Email = 'email',
    Pager = 'pager',
    Url = 'url',
    Sms = 'sms',
    Other = 'other',
}
export enum ContactPointUse {
    Home = 'home',
    Work = 'work',
    Temp = 'temp',
    Old = 'old',
    Mobile = 'mobile',
}
