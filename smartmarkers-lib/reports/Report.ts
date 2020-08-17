import { ResourceType, Reference, Meta } from "../models";
import { Server } from "../models/internal";

export enum ReportType {
  Observation,
  QuestionnaireResponse,
}

export interface Report {
  server: Server;
  resourceType: ResourceType;
  meta?: Meta | undefined;
  subject?: Reference;
  basedOn?: Reference[];
  id: string;
  getTitle: () => string;
  getNote: () => string;
  getSummary: () => string;
}
