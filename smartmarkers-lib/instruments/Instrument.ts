import { ServiceRequest } from "../models";
import { Report } from "../reports";

export enum InstrumentType {
  ValueSet,
  Questionnaire,
}

export interface Instrument<TReport extends Report> {
  getTitle: () => string;
  getNote: () => string;
  getReports: () => Promise<TReport[]>;
  createServiceRequest: () => Exclude<ServiceRequest, "id">;
}
