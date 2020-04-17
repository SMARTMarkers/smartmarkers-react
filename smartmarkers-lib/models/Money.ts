import { Element } from "./Element";
export interface Money extends Element {
  value?: number;
  currency?: string;
}
