import React from "react";
import { useParams, useHistory } from "../react-router";

import { useFhirContext, User } from "../smartmarkers-lib";
import { View, Spinner } from "native-base";

import { SessionWizard } from "../smartmarkers-lib/components/SessionWizard";
import { Task, Server } from "../smartmarkers-lib/models/internal";
import { InstrumentFactory } from "../smartmarkers-lib/instruments";
import { ExampleMap, ExampleType } from "../example";

const ManualScreen: React.FC<any> = (props) => {
  const history = useHistory();
  const { server, user } = useFhirContext();
  const [isReady, setIsReady] = React.useState(false);
  const instrumentFactory = new InstrumentFactory(server as Server);
  const instrument1 = instrumentFactory.createInstrument(
    ExampleMap[ExampleType.General]
  );
  const instrument2 = instrumentFactory.createInstrument(
    ExampleMap[ExampleType.GlasgowComaScore]
  );
  const task1 = new Task({ instrument: instrument1, patient: user as User });
  const task2 = new Task({ instrument: instrument2, patient: user as User });

  return (
    <SessionWizard
      tasks={[task1, task2]}
      onCompleted={() => history.push(`/dashboard`)}
    ></SessionWizard>
  );
};

export default ManualScreen;
