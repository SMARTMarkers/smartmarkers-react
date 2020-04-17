import { Element } from "./Element";

export interface Attachment extends Element {
  contentType?: string;
  language?: string;
  data?: string;
  url?: string;
  size?: number;
  hash?: string;
  title?: string;
  creation?: Date;
}
