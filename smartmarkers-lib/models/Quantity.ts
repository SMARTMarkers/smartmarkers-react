import { Element } from "./Element";
export interface SimpleQuantity extends Element {
  value?: number;
  unit?: string;
  system?: string;
  code?: string;
}
export interface Quantity extends SimpleQuantity {
  comparator?: QuantityComparator;
}
export enum QuantityComparator {
  GreaterThan = ">",
  LessThan = "<",
  GreaterOrEquals = ">=",
  LessOrEquals = "<=",
}
