import React from "react";
import Client from "fhirclient/lib/Client";

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
}

export const FhirContext = React.createContext<FhirContextProps>({
  isAuthenticated: false,
  user: null,
  fhirClient: null,
  login: async () => new Promise<void>((resole) => {}),
  logout: async () => new Promise<void>((resole) => {}),
  loginCallback: async () => new Promise<void>((resole) => {}),
});

export const useFhirContext = () =>
  React.useContext<FhirContextProps>(FhirContext);
