import { Element } from "./Element";
import { Period } from "./Period";
export interface HumanName extends Element {
  use?: NameUse;
  text?: string;
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
  period?: Period;
}
export enum NameUse {
  Usual = "usual",
  Official = "official",
  Temp = "temp",
  Nickname = "nickname",
  Anonymous = "anonymous",
  Old = "old",
  Maiden = "maiden",
}
