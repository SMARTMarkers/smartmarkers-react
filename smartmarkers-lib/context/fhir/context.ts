import React from "react";
import Client from "fhirclient/lib/Client";
import { ServiceRequest } from "../../requests/ServiceRequest";
import { InstrumentType, Instrument } from "../../instruments";
import { Report } from "../../reports";
import { QuestionnaireResponse, Observation } from "../../models";

export interface User {
  id: string;
  name: string;
  gender: string;
  birthDate: string;
  resourceType: string;
}

export interface FhirContextProps {
  isAuthenticated: boolean;
  user: User | null;
  fhirClient: Client | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loginCallback: () => Promise<void>;
  getPatientRequests: (filter?: string) => Promise<ServiceRequest[]>;
  getRequest: (id: string) => Promise<ServiceRequest>;
  getInstruments: <T extends Report>(
    type: InstrumentType,
    filter?: string
  ) => Promise<Instrument<T>[]>;
  getInstrument: <T extends Report>(
    type: InstrumentType,
    id: string
  ) => Promise<Instrument<T> | undefined>;
  createServiceRequest: <T extends Report>(
    instrument: Instrument<T>
  ) => Promise<ServiceRequest>;
  createReport: (
    report: QuestionnaireResponse | Observation
  ) => Promise<Report>;
}

export const FhirContext = React.createContext<FhirContextProps>({
  isAuthenticated: false,
  user: null,
  fhirClient: null,
  login: async () => new Promise<void>((resole) => {}),
  logout: async () => new Promise<void>((resole) => {}),
  loginCallback: async () => new Promise<void>((resole) => {}),
  getPatientRequests: async () =>
    new Promise<ServiceRequest[]>((resolve) => {
      resolve([]);
    }),
  getRequest: (id: string) =>
    new Promise<ServiceRequest>((resolve) => {
      resolve({} as ServiceRequest);
    }),
  getInstruments: async <T extends Report>(type: InstrumentType) =>
    new Promise<Instrument<T>[]>((resolve) => {
      resolve([]);
    }),
  getInstrument: <T extends Report>(type: InstrumentType, id: string) =>
    new Promise<Instrument<T>>((resolve) => {
      resolve({} as Instrument<T>);
    }),
  createServiceRequest: async <T extends Report>(instrument: Instrument<T>) =>
    new Promise<ServiceRequest>((resolve) => {
      resolve({} as ServiceRequest);
    }),
  createReport: (report: QuestionnaireResponse | Observation) =>
    new Promise<Report>((resolve) => {
      resolve({} as Report);
    }),
});

export const useFhirContext = () =>
  React.useContext<FhirContextProps>(FhirContext);
