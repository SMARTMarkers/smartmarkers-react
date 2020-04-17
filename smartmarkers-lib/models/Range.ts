import { Element } from "./Element";
import { Quantity } from "./Quantity";
export interface Range extends Element {
  low?: Quantity;
  high?: Quantity;
}
