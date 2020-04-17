import { Extension } from "./Extension";
import { Element } from "./Element";

export interface BackboneElement extends Element {
  modifiedExtension?: Extension[];
}
