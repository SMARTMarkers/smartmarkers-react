import { Resource } from "./Resource";
import { Narrative } from "./Narrative";
import { Extension } from "./Extension";
export interface DomainResource extends Resource {
  text?: Narrative;
  contained?: Resource[];
  extension?: Extension[];
  modifierExtension?: Extension[];
}
