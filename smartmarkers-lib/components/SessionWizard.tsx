import React from "react";
import {
  Spinner,
  ListItem,
  Text,
  View,
  List,
  Button,
  Body,
  Right,
  Switch,
} from "native-base";
import { useFhirContext, User } from "../context";
import { Task, Session, ResultBundle } from "../models/internal";
import { FormMode, Form } from "./Form";
import { Questionnaire } from "../instruments";
import { QuestionnaireResponse } from "../models";
import { ReportFactory } from "../reports";
import { FormData } from "./types";

export interface SessionWizardProps {
  patient?: User;
  tasks: Task[];
  onCompleted: () => void;
}

export const SessionWizard: React.FC<SessionWizardProps> = (props) => {
  const { patient, tasks, onCompleted } = props;
  const { server, user } = useFhirContext();
  if (!server) {
    return <View>FHIR Client is not initialized</View>;
  }
  const [isReady, setIsReady] = React.useState(false);
  const [session, setSession] = React.useState(
    new Session(tasks, patient ? patient : (user as User), server)
  );

  const [selected, setSelected] = React.useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [task, setTask] = React.useState(session.currentTask());

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const onTaskSubmit = (
    formData: FormData,
    response: QuestionnaireResponse
  ) => {
    const reportFactory = new ReportFactory(server);
    const report = reportFactory.createReport(response);
    const bundle = new ResultBundle(task, report);
    console.log({ bundle });
    session.currentTask().setResultBundle(bundle);
    if (session.hasNextTask()) {
      setTask(session.getNextTask() as Task);
    } else {
      setIsReady(true);
    }
  };

  const onToggleSelect = (index: number) => {
    console.log({ selected, index });
    if (selected.includes(index)) {
      const itemIndex = selected.indexOf(index);
      if (itemIndex > -1) {
        selected.splice(itemIndex, 1);
        console.log({ selected });
        setSelected(selected);
      }
    } else {
      selected.push(index);
      console.log({ selected });
      setSelected(selected);
    }
    forceUpdate();
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    session.markResultsToSubmit(selected);
    await session.submit();
    setIsSubmitting(false);
    if (onCompleted) {
      onCompleted();
    }
  };

  if (isSubmitting) {
    return <Spinner />;
  }

  if (isReady) {
    console.log({ tasks: session.tasks });
    return (
      <View>
        <List>
          {session.tasks.map((task, index) => {
            const isSelected = selected.includes(index);
            console.log({ isSelected, task, index });
            return (
              <ListItem
                key={`selectionItem${index}`}
                selected={isSelected}
                onPress={() => onToggleSelect(index)}
              >
                <Body>
                  <Text>
                    {index + 1} {task.instrument?.getTitle()}
                  </Text>
                </Body>
                <Right>
                  <Switch value={isSelected} />
                </Right>
              </ListItem>
            );
          })}
        </List>
        <Button onPress={onSubmit}>
          <Text>Submit selected results</Text>
        </Button>
      </View>
    );
  }

  return (
    <View>
      {task.instrument && (
        <Form
          questionnaire={task.instrument as Questionnaire}
          mode={FormMode.Wizard}
          onSubmit={onTaskSubmit}
        />
      )}
    </View>
  );
};
