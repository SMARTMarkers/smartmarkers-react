import { Task } from "../task/Task";
import { User } from "../context";
import { Server } from "../models/internal/Server";
import { ResultBundleStatus } from "./ResultBundle";

export class Session {
  public tasks: Task[];
  public patient: User;
  public server: Server;
  private currentTaskIndex: number = 0;

  constructor(tasks: Task[], patient: User, server: Server) {
    this.tasks = tasks;
    this.patient = patient;
    this.server = server;
  }

  hasNextTask(): boolean {
    return this.currentTaskIndex < this.tasks.length - 1;
  }

  getNextTask(): Task | null {
    if (this.hasNextTask()) {
      this.currentTaskIndex += 1;
      return this.currentTask();
    } else {
      return null;
    }
  }

  currentTask(): Task {
    return this.tasks[this.currentTaskIndex];
  }

  markResultsToSubmit(selectedIndexes: number[]) {
    this.tasks.forEach((task, index) => {
      if (selectedIndexes.includes(index)) {
        if (task.resultBundle) {
          task.resultBundle.canSubmit = true;
        }
      }
    });
  }

  async submit() {
    this.tasks.forEach(async (task) => {
      if (task.resultBundle) {
        if (task.resultBundle.canSubmit) {
          try {
            const report = await this.server.createReport(
              task.resultBundle.report
            );
            task.resultBundle.report = report;
            task.resultBundle.status = ResultBundleStatus.Submitted;
          } catch (e) {
            console.error(e);
            task.resultBundle.status = ResultBundleStatus.FailedToSubmit;
          }
        } else {
          task.resultBundle.status = ResultBundleStatus.Discarted;
        }
      }
    });
  }
}
