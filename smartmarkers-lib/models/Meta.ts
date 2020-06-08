import { Element } from "./Element";
import { StructureDefinition } from "./StructureDefinition";
export interface Meta extends Element {
  versionId?: string;
  lastUpdated?: string; // DateTime TimeZone
  source?: string;
  profile?: StructureDefinition[];
}
