import React from "react";
import { Server } from "../../models/internal";

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
  // fhirClient: Client | null;
  server: Server | null;
  proimisServer: Server | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loginCallback: (tokenResponse: any, serverUrl: string) => Promise<void>;
}

export const FhirContext = React.createContext<FhirContextProps>({
  isAuthenticated: false,
  user: null,
  // fhirClient: null,
  server: null,
  proimisServer: null,
  login: async () => new Promise<void>((resole) => {}),
  logout: async () => new Promise<void>((resole) => {}),
  loginCallback: async (tokenResponse: any, serverUrl: string) =>
    new Promise<void>((resole) => {}),
});

export const useFhirContext = () =>
  React.useContext<FhirContextProps>(FhirContext);
