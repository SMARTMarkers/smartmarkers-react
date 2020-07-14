import React from "react";
import { Spinner, ListItem, Body, Right, Text, Icon } from "native-base";
import { useFhirContext, User } from "../context";
import { Instrument } from "../Instruments";
import { ServiceRequest } from "../requests";
import { Report } from "../reports";

export interface TaskPropsBase {
  patient?: User;
}

export interface TaskPropsWithInstrument extends TaskPropsBase {
  instrument: Instrument<Report>;
  request?: ServiceRequest;
}

export interface TaskPropsWithRequest extends TaskPropsBase {
  instrument?: Instrument<Report>;
  request: ServiceRequest;
}

export type TaskProps = TaskPropsWithInstrument | TaskPropsWithRequest;

export const Task: React.FC<TaskProps> = (props) => {
  const { instrument, patient, request } = props;
  const [currentInstrument, setCurrentInstrument] = React.useState<
    Instrument<Report> | undefined
  >(instrument);
  const [reports, setReports] = React.useState<Report[] | undefined>(undefined);
  const [isReady, setIsReady] = React.useState(false);

  const hasInstrument = !!currentInstrument;
  const hasReports = !!reports;

  React.useEffect(() => {
    if (!hasInstrument) {
      const loadInstrument = async () => {
        const inst = await request?.getInstrument();
        setCurrentInstrument(inst);
      };

      loadInstrument();
    }

    if (hasInstrument && !hasReports) {
      setIsReady(false);
      const loadReports = async () => {
        const reports = await currentInstrument?.getReports();
        setReports(reports);
        setIsReady(true);
      };
      loadReports();
    }
  }, []);

  if (!isReady) {
    return <Spinner />;
  }
  return (
    <>
      <Body>
        <Text>{currentInstrument?.getTitle()}</Text>
        <Text note>{currentInstrument?.getNote()}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-forward" />
      </Right>
    </>
  );
};
