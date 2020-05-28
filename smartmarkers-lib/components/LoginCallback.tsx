import React from "react";
import { Redirect } from "../../react-router";
import { AppLoading } from "expo";

export interface LoginCallbackProps {
  redirectTo: string;
  loginCallback: () => Promise<void>;
}

export const LoginCallback: React.FC<LoginCallbackProps> = (props) => {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const loginCallback = async () => {
      await props.loginCallback();
      setIsReady(true);
    };
    loginCallback();
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return <Redirect to={props.redirectTo} />;
};
