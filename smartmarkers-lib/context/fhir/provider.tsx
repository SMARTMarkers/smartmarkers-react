import React from "react";
import { FHIR, ExpoStorage } from "../../client/";
import { AsyncStorage } from "react-native";
import { FhirContext, User } from "./context";
import Client from "fhirclient/lib/Client";

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

  return (
    <FhirContext.Provider
      value={{
        isAuthenticated,
        user,
        fhirClient,
        login,
        logout,
        loginCallback,
      }}
    >
      {props.children}
    </FhirContext.Provider>
  );
};
