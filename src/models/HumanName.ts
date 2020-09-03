import { IElement } from './Element'
import { IPeriod } from './Period'
export interface IHumanName extends IElement {
    use?: NameUse
    text?: string
    family?: string
    given?: string[]
    prefix?: string[]
    suffix?: string[]
    period?: IPeriod
}
export enum NameUse {
    Usual = 'usual',
    Official = 'official',
    Temp = 'temp',
    Nickname = 'nickname',
    Anonymous = 'anonymous',
    Old = 'old',
    Maiden = 'maiden',
}
