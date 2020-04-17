import { Element } from "./Element";
import { Quantity } from "./Quantity";
export interface Ratio extends Element {
  numerator?: Quantity;
  denominator?: Quantity;
}
