import { Element } from "./Element";
import { ContactDetail } from "./ContactDetail";
export interface Contributor extends Element {
  type: ContributorType;
  name: string;
  contact?: ContactDetail;
}
export enum ContributorType {
  Author = "author",
  Editor = "editor",
  Reviewer = "reviewer",
  Endorser = "endorser",
}
