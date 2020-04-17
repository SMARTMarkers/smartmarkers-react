import { Coding } from "./Coding";
import { Element } from "./Element";
export interface UsageContext extends Element {
  code: Coding;
}
