import { ServiceRequest } from "../models";

export enum InstrumentType {
  ValueSet,
  Questionnaire,
}

export interface Instrument<TReport> {
  getTitle: () => string;
  getNote: () => string;
  getReports: () => Promise<TReport[]>;
  createServiceRequest: () => Exclude<ServiceRequest, "id">;
}
