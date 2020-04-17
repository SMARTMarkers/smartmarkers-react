import { Coding } from "./Coding";

export interface CodeableConcept {
  coding: Coding[];
  text: string;
}
