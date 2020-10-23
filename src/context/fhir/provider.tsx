import React from "react";
import { FHIR, ExpoStorage } from "../../client/";
import { AsyncStorage } from "react-native";
import { FhirContext, User } from "./context";
import Client from "fhirclient/lib/Client";
import { Server } from "../../models/internal";

export interface FhirProviderProps {
  iss: string;
  client_id: string;
  redirectUri: string;
  clientSecret?: string;
  scope?: string;
  children?: React.ReactNode;
  promisSettings?: FhirPromisProps;
}

export interface FhirPromisProps {
  identifier: string;
  token: string;
  url: string;
}

const createPromisClient = (settings?: FhirPromisProps) => {
  if (!settings) return undefined;
  const client: Client = FHIR.client({
    serverUrl: settings.url,
    password: settings.token,
    username: settings.identifier,
  });
  return client;
};

export const FhirProvider: React.FC<FhirProviderProps> = (props) => {
  const IS_AUTHENTICATED = "isAuthenticated";
  const TOKEN_RESPONSE = "tokenResponse";
  const SERVET_URL = "serverUrl";
  const TOKEN_URI = "tokenUri";
  const store = new ExpoStorage();
  const defaultScope =
    "openid fhirUser offline_access user/*.* patient/*.* launch/encounter launch/patient profile";
  const {
    iss,
    client_id,
    redirectUri,
    clientSecret,
    scope,
    promisSettings,
  } = props;
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [fhirClient, setFhirClient] = React.useState<Client | null>(null);
  const [fhirPromisClient, setFhirPromisClient] = React.useState<
    Client | undefined
  >(createPromisClient(promisSettings));
  const [server, setServer] = React.useState<Server | null>(null);
  const [proimisServer, setPromisServer] = React.useState<Server | null>(
    fhirPromisClient ? new Server(fhirPromisClient) : null
  );

  React.useEffect(() => {
    const retrieve = async () => {
      const value = await store.get<boolean>(IS_AUTHENTICATED);
      const tokenResponseJSON: string | null = await store.get(TOKEN_RESPONSE);
      const serverUrl: string | null = await store.get(SERVET_URL);
      const tokenUri: string | null = await store.get(TOKEN_URI);
      if (value && tokenResponseJSON && serverUrl) {
        new Promise((resolve, reject) => {
          const client: Client = FHIR.client({
            serverUrl,
            tokenResponse: JSON.parse(tokenResponseJSON),
            tokenUri: tokenUri || undefined,
          });
          setFhirClient(client);
          setServer(new Server(client, fhirPromisClient));
          resolve(client);
        })
          .then((client) => (client as Client).user.read())
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
      }
    };
    retrieve();
    // const retrieve = async () => {
    //   const value = await store.get<boolean>(IS_AUTHENTICATED);
    //   if (value) {
    //     await FHIR.oauth2
    //       .ready()
    //       .then((client) => {
    //         setFhirClient(client);
    //         setServer(new Server(client, fhirPromisClient));
    //         return client;
    //       })
    //       .then((client) => client.user.read())
    //       .then((user) => {
    //         const item = user.name[0];
    //         const name = [
    //           item.prefix.join(" "),
    //           item.given.join(" "),
    //           item.family,
    //         ].join(" ");
    //         const u: User = {
    //           id: user.id ? user.id : "",
    //           name,
    //           gender: user.gender,
    //           birthDate: user.birthDate,
    //           resourceType: user.resourceType,
    //         };
    //         setUser(u);
    //       })
    //       .catch(console.error);
    //   }
    //   setIsAuthenticated(value == null ? false : value);
    // };
    // retrieve();
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

  const loginCallback = async (
    tokenResponse: any,
    serverUrl: string,
    tokenUri: string
  ) => {
    await new Promise((resolve, reject) => {
      const client: Client = FHIR.client({
        serverUrl,
        tokenResponse,
        tokenUri,
      });
      setFhirClient(client);
      setServer(new Server(client, fhirPromisClient));
      resolve(client);
    })
      .then(async (client) => {
        await store.set(IS_AUTHENTICATED, true);
        await store.set(TOKEN_RESPONSE, JSON.stringify(tokenResponse));
        await store.set(SERVET_URL, serverUrl);
        await store.set(TOKEN_URI, tokenUri);
        return (client as Client).user.read();
      })
      .then((user) => {
        console.log(user);
        const item = user.name[0];
        const name = [
          item.prefix.join(" "),
          item.given.join(" "),
          item.family,
        ].join(" ");
        const u = {
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
    // await FHIR.oauth2
    //   .ready()
    //   .then((client) => {
    //     setFhirClient(client);
    //     setServer(new Server(client, fhirPromisClient));
    //     return client;
    //   })
    //   .then(async (client) => {
    //     await store.set(IS_AUTHENTICATED, true);
    //     return client.user.read();
    //   })
    //   .then((user) => {
    //     const item = user.name[0];
    //     const name = [
    //       item.prefix.join(" "),
    //       item.given.join(" "),
    //       item.family,
    //     ].join(" ");
    //     const u: User = {
    //       id: user.id ? user.id : "",
    //       name,
    //       gender: user.gender,
    //       birthDate: user.birthDate,
    //       resourceType: user.resourceType,
    //     };
    //     setUser(u);
    //     setIsAuthenticated(true);
    //   })
    //   .catch(console.error);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setFhirClient(null);
    setFhirPromisClient(undefined);
    setServer(null);
    setPromisServer(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <FhirContext.Provider
      value={{
        isAuthenticated,
        user,
        server,
        proimisServer,
        login,
        logout,
        loginCallback,
      }}
    >
      {props.children}
    </FhirContext.Provider>
  );
};
