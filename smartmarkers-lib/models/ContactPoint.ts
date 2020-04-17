import { Period } from "./Period";
import { Element } from "./Element";
export interface ContactPoint extends Element {
  system?: ContactPointSystem;
  value?: string;
  use?: ContactPointUse;
  rank?: number;
  period?: Period;
}
export enum ContactPointSystem {
  Phone = "phone",
  Fax = "fax",
  Email = "email",
  Pager = "pager",
  Url = "url",
  Sms = "sms",
  Other = "other",
}
export enum ContactPointUse {
  Home = "home",
  Work = "work",
  Temp = "temp",
  Old = "old",
  Mobile = "mobile",
}
