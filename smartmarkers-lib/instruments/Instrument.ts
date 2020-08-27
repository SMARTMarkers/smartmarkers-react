import { ServiceRequest, ResourceType } from "../models";
import { Report } from "../reports";
import { TaskSchedule } from "../models/internal";
import { User } from "../context";

export enum InstrumentType {
  ValueSet,
  Questionnaire,
}

export interface Instrument {
  id: string;
  resourceType: ResourceType;
  isAdaptive: () => boolean;
  getTitle: () => string;
  getNote: () => string;
  getReports: (serviceRequestId?: string) => Promise<Report[]>;
  createServiceRequest: (
    schedule: TaskSchedule,
    patientId: string
  ) => Exclude<ServiceRequest, "id">;
}
