import { Element } from "./Element";
import { Quantity } from "./Quantity";
export interface SampledData extends Element {
  origin: Quantity;
  period: number;
  factor?: number;
  lowerLimit?: number;
  upperLimit?: number;
  dimensions: number;
  data?: string;
}
