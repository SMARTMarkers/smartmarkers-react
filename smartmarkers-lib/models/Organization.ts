import { Resource } from "./Resource";
import { Identifier } from "./Identifier";
import { CodeableConcept } from "./CodeableConcept";
import { ContactPoint } from "./ContactPoint";
import { Address } from "./Address";
import { HumanName } from "./HumanName";
import { Endpoint } from "./Endpoint";
export interface Organization extends Resource {
  identifier: Identifier[];
  active: boolean;
  type: CodeableConcept[];
  name: string;
  alias: string[];
  telecom: ContactPoint[];
  address: Address[];
  partOf: Organization;
  contact: [
    {
      purpose: CodeableConcept;
      name: HumanName;
      telecom: ContactPoint[];
      address: Address;
    }
  ];
  endpoint: Endpoint[];
}
