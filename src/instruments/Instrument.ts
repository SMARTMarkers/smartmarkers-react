import { IServiceRequest, ResourceType } from "../models";
import { Report } from "../reports";
import { TaskSchedule } from "../task";

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
  getReports: (
    serviceRequestId?: string,
    patientId?: string
  ) => Promise<Report[] | undefined>;
  createServiceRequest: (
    schedule: TaskSchedule,
    patientId: string
  ) => Exclude<IServiceRequest, "id">;
}
