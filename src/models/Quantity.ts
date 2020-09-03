import { IElement } from './Element'
export interface ISimpleQuantity extends IElement {
    value?: number
    unit?: string
    system?: string
    code?: string
}
export interface IQuantity extends ISimpleQuantity {
    comparator?: QuantityComparator
}
export enum QuantityComparator {
    GreaterThan = '>',
    LessThan = '<',
    GreaterOrEquals = '>=',
    LessOrEquals = '<=',
}
