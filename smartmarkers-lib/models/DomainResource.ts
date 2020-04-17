import { Resource } from "./Resource";
import { Narrative } from "./Narrative";
export interface DomainResource extends Resource {
  text?: Narrative;
  contained?: Resource[];
}
