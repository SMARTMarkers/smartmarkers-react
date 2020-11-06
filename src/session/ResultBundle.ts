import { Report } from "../reports";
import { ServiceRequest } from "../requests";
import { Task } from "../task/Task";

export enum ResultBundleStatus {
  Ready,
  Submitted,
  FailedToSubmit,
  Discarted,
}

export class ResultBundle {
  public task: Task;
  public report: Report;
  public request: ServiceRequest | null = null;
  public status: ResultBundleStatus = ResultBundleStatus.Ready;
  public canSubmit: boolean = false;

  constructor(task: Task, report: Report) {
    this.task = task;
    this.report = report;
  }
}
