import { CodeableConcept } from "./CodeableConcept";
import { Period } from "./Period";
import { Organization } from "./Organization";
export interface Identifier {
  code: string;
  type: CodeableConcept;
  system: string;
  value: string;
  period: Period;
  assigner?: Organization;
}
