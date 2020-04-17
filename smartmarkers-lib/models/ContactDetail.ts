import { Element } from "./Element";
import { ContactPoint } from "./ContactPoint";
export interface ContactDetail extends Element {
  name?: string;
  telecom?: ContactPoint[];
}
