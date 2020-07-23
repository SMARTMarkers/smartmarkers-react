import { ResourceType, Reference } from "../models";

export enum ReportType {
  Observation,
  QuestionnaireResponse,
}

export interface Report {
  resourceType: ResourceType;
  subject?: Reference;
  basedOn?: Reference[];
  id: string;
  getTitle: () => string;
  getNote: () => string;
  getSummary: () => string;
}
