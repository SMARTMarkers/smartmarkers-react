import { Instrument } from "../instruments";
import { User } from "../context";
import { Report, QuestionnaireResponse } from "../reports";
import { ServiceRequest } from "../requests";
import { ResultBundle } from "../session/ResultBundle";
import { TaskSchedule } from "./TaskSchedule";
import { Server } from "../models/internal/Server";

export interface TaskStateBase {
  patient?: User;
  reports?: Report[];
  schedule?: TaskSchedule;
  server: Server;
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
  public server: Server;

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
    this.server = params.server;
    this.calculateSchedule();
  }

  getTitle() {
    if (this.instrument) {
      return this.instrument.getTitle();
    } else if (this.request) {
      return this.request.getTitle();
    }
    return "";
  }

  getNote() {
    if (this.instrument) {
      return this.instrument.getNote();
    } else if (this.request) {
      return this.request.getNote();
    }
    return "";
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
    return undefined;
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
      if (
        result.report.meta &&
        result.report.meta.profile &&
        result.report.meta.profile.includes(
          "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaireresponse-adapt"
        )
      ) {
        console.log({ server: this.server });
        const serverUrl = this.server.promisClient?.state?.serverUrl;
        console.log(serverUrl);
        (result.report as QuestionnaireResponse).questionnaire = `${serverUrl}Questionnaire/${this.instrument.id}`;
      } else {
        (result.report as QuestionnaireResponse).questionnaire = `Questionnaire/${this.instrument.id}`;
      }
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
