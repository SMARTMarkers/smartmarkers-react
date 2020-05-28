import React from "react";
import { Switch, Redirect, Route } from "../react-router";
import { RouteWithLayout, PrivateRouteWithLayout } from "../components";
import { Main as MainLayout } from "../layouts";

import {
  NotFoundScreen,
  DashboardScreen,
  SettingsScreen,
  SurveyScreen,
  SurveysListScreen,
  SurveyWizardScreen,
  LoginScreen,
} from "../screens";
import { useFhirContext } from "../smartmarkers-lib/context";
import { LoginCallback } from "../smartmarkers-lib";

const Routes: React.FC = () => {
  const fhirContext = useFhirContext();

  React.useEffect(() => {});

  return (
    <Switch>
      <Redirect exact from="/" to={`/dashboard`} />
      <RouteWithLayout
        exact
        path="/login"
        component={LoginScreen}
        layout={MainLayout}
      />
      <Route
        exact
        path="/auth-callback"
        render={() => (
          <LoginCallback
            redirectTo="/dashboard"
            loginCallback={fhirContext.loginCallback}
          />
        )}
      />
      <PrivateRouteWithLayout
        component={DashboardScreen}
        exact
        layout={MainLayout}
        path="/dashboard"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <PrivateRouteWithLayout
        component={SettingsScreen}
        exact
        layout={MainLayout}
        path="/settings"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <PrivateRouteWithLayout
        component={SurveysListScreen}
        exact
        layout={MainLayout}
        path="/my-surveys"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <PrivateRouteWithLayout
        component={SurveyScreen}
        exact
        layout={MainLayout}
        path="/survey/:example"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <PrivateRouteWithLayout
        component={SurveyWizardScreen}
        exact
        layout={MainLayout}
        path="/survey-wizard/:example"
        isAuthenticated={fhirContext.isAuthenticated}
      />
      <RouteWithLayout
        component={NotFoundScreen}
        exact
        layout={MainLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
