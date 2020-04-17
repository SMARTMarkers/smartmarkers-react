import { Element } from "./Element";
import { Period } from "./Period";

export interface Address extends Element {
  use?: AddressUse;
  type?: AddressType;
  text?: string;
  line?: string[];
  city?: string;
  district?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  period?: Period;
}

export enum AddressUse {
  Home = "home",
  Work = "work",
  Temp = "temp",
  Old = "old",
  Billing = "billing",
}

export enum AddressType {
  Postal = "postal",
  Physical = "physical",
  Both = "both",
}
