import { Meta } from "./Meta";
import { ResourceType } from "./ResourceType";

export interface Resource {
  id: string;
  resourceType: ResourceType;
  meta?: Meta;
  implicitRules?: string;
  language?: string;
}
