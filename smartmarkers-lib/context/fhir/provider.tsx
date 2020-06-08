import React from "react";
import { FHIR, ExpoStorage } from "../../client/";
import { AsyncStorage } from "react-native";
import { FhirContext, User } from "./context";
import Client from "fhirclient/lib/Client";
import { ServiceRequestFactory } from "../../requests/ServiceRequestFactory";
import {
  ServiceRequest as IServiceRequest,
  QuestionnaireResponse as IQuestionnaireResponse,
  Observation as IObservation,
  DomainResource,
} from "../../models";
import {
  InstrumentType,
  InstrumentFactory,
  Instrument,
} from "../../instruments";
import { fhirclient } from "fhirclient/lib/types";
import { ServiceRequest } from "../../requests";
import { Report, QuestionnaireResponse, Observation } from "../../reports";

export interface FhirProviderProps {
  iss: string;
  client_id: string;
  redirectUri: string;
  clientSecret?: string;
  scope?: string;
  children?: React.ReactNode;
}

export const FhirProvider: React.FC<FhirProviderProps> = (props) => {
  const IS_AUTHENTICATED = "isAuthenticated";
  const store = new ExpoStorage();
  const defaultScope =
    "openid fhirUser offline_access user/*.* patient/*.* launch/encounter launch/patient profile";
  const { iss, client_id, redirectUri, clientSecret, scope } = props;
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [fhirClient, setFhirClient] = React.useState<Client | null>(null);

  React.useEffect(() => {
    const retrieve = async () => {
      const value = await store.get<boolean>(IS_AUTHENTICATED);
      if (value) {
        await FHIR.oauth2
          .ready()
          .then((client) => {
            setFhirClient(client);
            return client;
          })
          .then((client) => client.user.read())
          .then((user) => {
            const item = user.name[0];
            const name = [
              item.prefix.join(" "),
              item.given.join(" "),
              item.family,
            ].join(" ");
            const u: User = {
              id: user.id ? user.id : "",
              name,
              gender: user.gender,
              birthDate: user.birthDate,
              resourceType: user.resourceType,
            };
            setUser(u);
          })
          .catch(console.error);
      }
      setIsAuthenticated(value == null ? false : value);
    };
    retrieve();
  }, []);

  const login = async () => {
    FHIR.oauth2.authorize({
      iss,
      client_id,
      clientSecret: clientSecret ? clientSecret : undefined,
      scope: scope ? scope : defaultScope,
      redirectUri,
    });
  };

  const loginCallback = async () => {
    await FHIR.oauth2
      .ready()
      .then((client) => {
        setFhirClient(client);
        return client;
      })
      .then(async (client) => {
        await store.set(IS_AUTHENTICATED, true);
        return client.user.read();
      })
      .then((user) => {
        const item = user.name[0];
        const name = [
          item.prefix.join(" "),
          item.given.join(" "),
          item.family,
        ].join(" ");
        const u: User = {
          id: user.id ? user.id : "",
          name,
          gender: user.gender,
          birthDate: user.birthDate,
          resourceType: user.resourceType,
        };
        setUser(u);
        setIsAuthenticated(true);
      })
      .catch(console.error);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setFhirClient(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const getPatientRequests = async (filter?: string) => {
    if (fhirClient) {
      const serviceRequestFactory = new ServiceRequestFactory(fhirClient);
      const patientId = fhirClient.patient.id;
      const reqUrl = filter
        ? `ServiceRequest?patient=${patientId}&${filter}`
        : `ServiceRequest?patient=${patientId}`;
      const reqOptions = {
        pageLimit: 0,
        flat: true,
      };
      const items = await fhirClient
        .request<IServiceRequest[]>(reqUrl, reqOptions)
        .catch((err) => {
          console.error(err);
          return [] as IServiceRequest[];
        });

      const requests = await Promise.all(
        items.map(async (item) => {
          const s = serviceRequestFactory.createServiceRequest(item);
          const i = await s.getInstrument();
          const r = await i?.getReports();
          s.setReports(r);
          return s;
        })
      );
      return requests;
    }
    return [];
  };

  const getRequest = async (id: string) => {
    if (fhirClient) {
      const serviceRequestFactory = new ServiceRequestFactory(fhirClient);
      const reqUrl = `ServiceRequest/${id}`;
      const reqOptions = {
        pageLimit: 0,
        flat: true,
      };
      const item = await fhirClient
        .request<IServiceRequest>(reqUrl, reqOptions)
        .catch((err) => {
          console.error(err);
          return {} as IServiceRequest;
        });

      const s = serviceRequestFactory.createServiceRequest(item);
      const i = await s.getInstrument();
      const r = await i?.getReports();
      s.setReports(r);
      return s;
    }
    throw new Error("fhirClient is not initialized");
  };

  const getInstruments = async (type: InstrumentType, filter?: string) => {
    if (fhirClient) {
      const typeStr = InstrumentType[type];
      const instrumentFactory = new InstrumentFactory(fhirClient, "");

      const reqUrl = filter ? `${typeStr}?${filter}` : `${typeStr}`;
      const reqOptions = {
        pageLimit: 0,
        flat: true,
      };
      const items = await fhirClient
        .request<DomainResource[]>(reqUrl, reqOptions)
        .catch((err) => {
          console.error(err);
          return [] as DomainResource[];
        });

      const requests = await Promise.all(
        items.map(async (item) => {
          const s = instrumentFactory.createInstrument(item);
          const i = await s.getReports();
          return s;
        })
      );
      return requests;
    }
    return [];
  };

  const getInstrument = async (type: InstrumentType, id: string) => {
    if (fhirClient) {
      const typeStr = InstrumentType[type];
      const instrumentFactory = new InstrumentFactory(fhirClient, id);

      const reqUrl = `${typeStr}/${id}`;
      const reqOptions = {
        flat: true,
      };
      const item = await fhirClient
        .request<DomainResource>(reqUrl, reqOptions)
        .catch((err) => {
          console.error(err);
          return undefined;
        });
      if (item) {
        return instrumentFactory.createInstrument(item);
      }
    }
    return undefined;
  };

  const createServiceRequest = async (instrument: Instrument<any>) => {
    if (fhirClient) {
      const serviceRequest = instrument.createServiceRequest();
      console.log({ serviceRequest });
      return (await fhirClient.create(
        serviceRequest as fhirclient.FHIR.Resource
      )) as ServiceRequest;
    }
    throw new Error("fhirClient is not initialized");
  };

  const createReport = async (
    report: IQuestionnaireResponse | IObservation
  ) => {
    if (fhirClient) {
      console.log({ report });
      report.subject = {
        reference: `Patient/${fhirClient.patient.id}`,
      };
      const u = fhirClient.getFhirUser();
      if (report.resourceType == "QuestionnaireResponse") {
        if (u) {
          (report as QuestionnaireResponse).source = {
            reference: u,
          };
        }
      }
      return (await fhirClient.create(
        report as fhirclient.FHIR.Resource
      )) as Report;
    }
    throw new Error("fhirClient is not initialized");
  };

  return (
    <FhirContext.Provider
      value={{
        isAuthenticated,
        user,
        fhirClient,
        login,
        logout,
        loginCallback,
        getPatientRequests,
        getRequest,
        getInstruments,
        getInstrument,
        createServiceRequest,
        createReport,
      }}
    >
      {props.children}
    </FhirContext.Provider>
  );
};
