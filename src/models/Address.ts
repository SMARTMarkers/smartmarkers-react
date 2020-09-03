import { IElement } from './Element'
import { IPeriod } from './Period'

export interface IAddress extends IElement {
    use?: AddressUse
    type?: AddressType
    text?: string
    line?: string[]
    city?: string
    district?: string
    state?: string
    postalCode?: string
    country?: string
    period?: IPeriod
}

export enum AddressUse {
    Home = 'home',
    Work = 'work',
    Temp = 'temp',
    Old = 'old',
    Billing = 'billing',
}

export enum AddressType {
    Postal = 'postal',
    Physical = 'physical',
    Both = 'both',
}
