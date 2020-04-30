import React from "react";
import { Switch, Redirect } from "../react-router";

import { RouteWithLayout } from "../components";
import { Main as MainLayout } from "../layouts";

import {
  NotFoundScreen,
  DashboardScreen,
  SettingsScreen,
  SurveyScreen,
  SurveysListScreen,
  SurveyWizardScreen,
} from "../screens";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to={`/dashboard`} />
      <RouteWithLayout
        component={DashboardScreen}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={SettingsScreen}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SurveysListScreen}
        exact
        layout={MainLayout}
        path="/my-surveys"
      />
      <RouteWithLayout
        component={SurveyScreen}
        exact
        layout={MainLayout}
        path="/survey/:example"
      />
      <RouteWithLayout
        component={SurveyWizardScreen}
        exact
        layout={MainLayout}
        path="/survey-wizard/:example"
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
