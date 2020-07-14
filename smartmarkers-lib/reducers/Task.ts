import { User } from "../context";
import { Instrument } from "../instruments";
import { Report } from "../reports";
import { ServiceRequest, Status } from "../requests";

export interface TaskStateBase {
  patient?: User;
  reports?: Report[];
  status?: Status;
}

export interface TaskStateInstrument extends TaskStateBase {
  instrument: Instrument<Report>;
  request?: ServiceRequest;
}

export interface TaskStateRequest extends TaskStateBase {
  instrument?: Instrument<Report>;
  request: ServiceRequest;
}

export enum TaskStateActionTypeValue {
  LoadReports,
  LoadInstrument,
  SetInstrument,
  SetReports,
  SetStatus,
}

export interface TaskStateBaseAction {
  type: TaskStateActionTypeValue;
}

export interface TaskStateActionLoad extends TaskStateBaseAction {
  id: string;
}

export interface TaskStateActionSetInstrument extends TaskStateBaseAction {
  instrument: Instrument<Report>;
}

export interface TaskStateActionSetReports extends TaskStateBaseAction {
  reports: Report[];
}

export interface TaskStateActionSetStatus extends TaskStateBaseAction {
  status: Status;
}

export type TaskStateType = TaskStateInstrument | TaskStateRequest;
export type TaskStateActionType =
  | TaskStateActionLoad
  | TaskStateActionSetStatus
  | TaskStateActionSetInstrument
  | TaskStateActionSetReports;

export const createInitialTaskState = (data: TaskStateType) =>
  ({
    status: data.status,
    patient: data.patient,
    reports: data.reports,
    instrument: data.instrument,
    request: data.request,
  } as TaskStateType);

export const taskReducer = (
  state: TaskStateType,
  action: TaskStateActionType
) => {
  switch (action.type) {
    case TaskStateActionTypeValue.SetInstrument:
      return {
        ...state,
        instrument: (action as TaskStateActionSetInstrument).instrument,
      };
    case TaskStateActionTypeValue.SetReports:
      return {
        ...state,
        reports: (action as TaskStateActionSetReports).reports,
      };
    case TaskStateActionTypeValue.SetStatus:
      return {
        ...state,
        status: (action as TaskStateActionSetStatus).status,
      };
    default:
      throw new Error("Unexpected action");
  }
};
