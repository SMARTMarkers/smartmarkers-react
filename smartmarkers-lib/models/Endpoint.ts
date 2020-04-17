import { Resource } from "./Resource";
import { Identifier } from "./Identifier";
import { Coding } from "./Coding";
import { Organization } from "./Organization";
import { ContactPoint } from "./ContactPoint";
import { Period } from "./Period";
import { CodeableConcept } from "./CodeableConcept";
export interface Endpoint extends Resource {
  identifier: Identifier[];
  status: EndpointStatus;
  connectionType: Coding;
  name: string;
  managingOrganization: Organization;
  contact: ContactPoint[];
  period: Period;
  payloadType: CodeableConcept[];
  payloadMimeType: string[];
  address: string;
  header: string[];
}
export enum EndpointStatus {
  Active = "active",
  Suspended = "suspended",
  Error = "error",
  Off = "off",
  EnteredInError = "entered-in-error",
  Test = "test",
}
