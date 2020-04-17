import { Element } from "./Element";
import { Reference } from "./Reference";

export interface Annotation extends Element {
  authorReference: Reference;
  authorString: string;
  time: Date;
  text: string;
}
