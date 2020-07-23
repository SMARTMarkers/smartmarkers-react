import { Instrument } from "../../instruments";
import { User } from "../../context";
import { Report, QuestionnaireResponse } from "../../reports";
import { ServiceRequest } from "../../requests";
import { ResultBundle } from "./ResultBundle";
import { TaskSchedule } from "./TaskSchedule";

export interface TaskStateBase {
  patient?: User;
  reports?: Report[];
  schedule?: TaskSchedule;
}

export interface TaskInstrument extends TaskStateBase {
  instrument: Instrument;
  request?: ServiceRequest;
}

export interface TaskRequest extends TaskStateBase {
  instrument?: Instrument;
  request: ServiceRequest;
}

export type TaskType = TaskInstrument | TaskRequest;

export class Task {
  public patient: User | null;
  public reports: Report[] | undefined;

  public instrument: Instrument | undefined;
  public request: ServiceRequest | null;
  public resultBundle: ResultBundle | null = null;
  public schedule: TaskSchedule | null;
  public isLoading: boolean = false;

  constructor(params: TaskType) {
    this.patient = params.patient ? params.patient : null;
    this.reports = params.reports ? params.reports : [];
    this.instrument = params.instrument ? params.instrument : undefined;
    this.request = params.request ? params.request : null;
    this.schedule = params.schedule ? params.schedule : null;
    this.calculateSchedule();
  }

  getTitle() {
    if (this.request) {
      return this.request.getTitle();
    } else if (this.instrument) {
      return this.instrument.getTitle();
    }
  }

  getNote() {
    if (this.request) {
      return this.request.getNote();
    } else if (this.instrument) {
      return this.instrument.getNote();
    }
  }

  calculateSchedule() {
    this.schedule = new TaskSchedule(
      this.request?.occurrenceDateTime,
      this.request?.occurrencePeriod,
      this.request?.occurrenceTiming,
      this.reports
    );
  }

  async getInstrument() {
    if (this.instrument) {
      return this.instrument;
    } else if (this.request) {
      this.isLoading = true;
      this.instrument = await this.request.getInstrument();
      this.isLoading = false;
      return this.instrument;
    }
  }

  async getReports() {
    if (this.reports) {
      return this.reports;
    } else {
      this.isLoading = true;
      const instrument = await this.getInstrument();
      this.reports = instrument ? await instrument.getReports() : [];
      this.calculateSchedule();
      this.isLoading = false;
      return this.reports;
    }
  }

  setResultBundle(result: ResultBundle) {
    if (this.request) {
      result.report.basedOn = [
        {
          reference: `ServiceRequest/${this.request.id}`,
        },
      ];
    }
    if (this.instrument && this.instrument.resourceType == "Questionnaire") {
      (result.report as QuestionnaireResponse).questionnaire = `Questionnaire/${this.instrument.id}`;
    }
    this.resultBundle = result;
    if (this.reports) {
      this.reports.push(result.report);
    } else {
      this.reports = [result.report];
    }
    this.calculateSchedule();
  }
}
