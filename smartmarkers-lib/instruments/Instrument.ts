import { ServiceRequest, ResourceType } from "../models";
import { Report } from "../reports";

export enum InstrumentType {
  ValueSet,
  Questionnaire,
}

export interface Instrument {
  id: string;
  resourceType: ResourceType;
  getTitle: () => string;
  getNote: () => string;
  getReports: (serviceRequestId?: string) => Promise<Report[]>;
  createServiceRequest: () => Exclude<ServiceRequest, "id">;
}
