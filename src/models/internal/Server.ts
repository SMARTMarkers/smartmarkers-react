import Client from "fhirclient/lib/Client";
import { ServiceRequestFactory } from "../../requests";
import {
  InstrumentType,
  InstrumentFactory,
  Instrument,
} from "../../instruments";
import { ServiceRequest } from "../../requests";
import {
  Report,
  QuestionnaireResponse,
  ReportType,
  ReportFactory,
} from "../../reports";
import { fhirclient } from "fhirclient/lib/types";
import {
  IServiceRequest,
  IQuestionnaireResponse,
  IDomainResource,
  IPatient,
} from "..";
import { User } from "../../context";
import { Task } from "./Task";
import { TaskSchedule } from "./TaskSchedule";

export class Server {
  public client: Client;
  public promisClient?: Client;

  constructor(client: Client, promisClient?: Client) {
    this.client = client;
    this.promisClient = promisClient;
  }

  getPromisServer() {
    if (this.promisClient) {
      return new Server(this.promisClient);
    }
    return undefined;
  }

  async getPatients(filter?: string) {
    const reqUrl = filter ? `Patient?${filter}` : `Patient`;
    const reqOptions = {
      pageLimit: 0,
      flat: true,
    };
    return await this.client
      .request<IPatient[]>(reqUrl, reqOptions)
      .catch((err: any) => {
        // console.error(err);
        return [] as IPatient[];
      });
  }

  async getPatientTasksByRequests(filter?: string, patientId?: string) {
    const serviceRequestFactory = new ServiceRequestFactory(
      this,
      this.getPromisServer()
    );
    const ptId = patientId ? patientId : this.client.patient.id;
    const reqUrl = filter
      ? `ServiceRequest?patient=${ptId}&${filter}`
      : `ServiceRequest?patient=${ptId}`;
    const reqOptions = {
      pageLimit: 0,
      flat: true,
    };
    const items: IServiceRequest[] = await this.client
      .request<IServiceRequest[]>(reqUrl, reqOptions)
      .catch((err: any) => {
        // console.error(err);
        return [] as IServiceRequest[];
      });

    const tasks = await Promise.all(
      items.map(async (serviceRequest) => {
        const request = serviceRequestFactory.createServiceRequest(
          serviceRequest
        );
        const instrument = await request.getInstrument();
        const reports = await instrument?.getReports(undefined, patientId);
        const task = new Task({ request, instrument, reports, server: this });
        return task;
      })
    );

    return tasks;
  }

  async getTaskByRequestId(id: string, patientId?: string) {
    const serviceRequestFactory = new ServiceRequestFactory(
      this,
      this.getPromisServer()
    );
    const reqUrl = `ServiceRequest/${id}`;
    const reqOptions = {
      pageLimit: 0,
      flat: true,
    };
    const item = await this.client
      .request<IServiceRequest>(reqUrl, reqOptions)
      .catch((err: any) => {
        // console.error(err);
        return {} as IServiceRequest;
      });
    const request = serviceRequestFactory.createServiceRequest(item);
    const instrument = await request.getInstrument();
    const reports = await instrument?.getReports(patientId);
    const task = new Task({ request, instrument, reports, server: this });
    return task;
  }

  async getInstruments(
    type: InstrumentType,
    filter?: string,
    patientId?: string
  ) {
    const typeStr = InstrumentType[type];
    const instrumentFactory = new InstrumentFactory(
      this,
      this.getPromisServer()
    );

    const reqUrl = filter ? `${typeStr}?${filter}` : `${typeStr}`;
    const reqOptions = {
      pageLimit: 0,
      flat: true,
    };
    const items: IDomainResource[] = await this.client
      .request<IDomainResource[]>(reqUrl, reqOptions)
      .catch((err: any) => {
        // console.error(err);
        return [] as IDomainResource[];
      });

    const requests = await Promise.all(
      items.map(async (item: IDomainResource) => {
        const s = instrumentFactory.createInstrument(item);
        const i = await s.getReports(undefined, patientId);
        return s;
      })
    );
    return requests;
  }

  async getInstrument(type: InstrumentType, id: string) {
    const typeStr = InstrumentType[type];
    const instrumentFactory = new InstrumentFactory(
      this,
      this.getPromisServer()
    );

    const reqUrl = `${typeStr}/${id}`;
    const reqOptions = {
      flat: true,
    };
    const item = await this.client
      .request<IDomainResource>(reqUrl, reqOptions)
      .catch((err: any) => {
        // console.error(err);
        return undefined;
      });
    if (item) {
      return instrumentFactory.createInstrument(item);
    }
    return undefined;
  }

  async createServiceRequest(
    instrument: Instrument,
    schedule: TaskSchedule,
    patientId: string
  ) {
    const serviceRequest = instrument.createServiceRequest(schedule, patientId);

    return (await this.client.create(
      serviceRequest as fhirclient.FHIR.Resource
    )) as ServiceRequest;
  }

  async createReport(report: Report, patient?: User) {
    if (patient) {
      report.subject = {
        reference: `Patient/${patient.id}`,
      };
    } else {
      report.subject = {
        reference: `Patient/${this.client.patient.id}`,
      };
    }
    const u = this.client.getFhirUser();
    if (report.resourceType == "QuestionnaireResponse") {
      if (u) {
        (report as Partial<QuestionnaireResponse>).source = {
          reference: u,
        };
      }
    }
    const { server, ...rest } = report;
    return (await this.client.create(
      rest as fhirclient.FHIR.Resource
    )) as Report;
  }

  async getPatientReports(
    type: ReportType,
    filter?: string,
    useClientPatientId: boolean = true
  ) {
    const typeStr = ReportType[type];

    if (useClientPatientId) {
      return await this.client.patient.request(
        filter ? `${typeStr}?${filter}` : typeStr,
        {
          pageLimit: 0,
          flat: true,
        }
      );
    }

    return await this.client.request(
      filter ? `${typeStr}?${filter}` : typeStr,
      {
        pageLimit: 0,
        flat: true,
      }
    );
  }

  async getQuestionnaireReportsByServiceRequestId(
    serviceRequestId: string,
    patientId?: string
  ) {
    return await this.client
      .request<IQuestionnaireResponse[]>(
        `QuestionnaireResponse?patient=${
          patientId ? patientId : this.client.patient.id
        }&based-on=ServiceRequest/${serviceRequestId}`,
        { flat: true }
      )
      .catch((err: any) => {
        // console.error(err);
        return [] as IQuestionnaireResponse[];
      });
  }

  async getQuestionnaireReports(
    id: string,
    serviceRequestId?: string,
    patientId?: string
  ) {
    const url = serviceRequestId
      ? `QuestionnaireResponse?patient=${
          patientId ? patientId : this.client.patient.id
        }&questionnaire=Questionnaire/${id}&based-on=ServiceRequest/${serviceRequestId}`
      : `QuestionnaireResponse?patient=${
          patientId ? patientId : this.client.patient.id
        }&questionnaire=Questionnaire/${id}`;
    return await this.client
      .request<IQuestionnaireResponse[]>(url, { flat: true })
      .catch((err: any) => {
        // console.error(err);
        return [] as IQuestionnaireResponse[];
      });
  }

  async getQuestionnaireResponseById(id: string) {
    const item = await this.client.request(`QuestionnaireResponse/${id}/`, {
      pageLimit: 0,
      flat: true,
    });

    const factory = new ReportFactory(this);
    if (item) {
      return factory.createReport(item);
    }
    return null;
  }

  async getInstrumentByReference<T>(reference: string) {
    return await this.client.request<T>(reference).catch((err: any) => {
      // console.error(err);
      return undefined;
    });
  }

  authenticateUser() {
    const user = this.client.state.tokenResponse?.client_id;
    const password = this.client.state.tokenResponse?.clientSecret;

    if (!user || !password) return "";

    const token = `${user}:${password}`;
    const hash = btoa(token);

    return `Basic ${hash}`;
  }

  async getPromisNextStep(
    questionnaireId: string,
    postResponse: IQuestionnaireResponse
  ) {
    return await this.client
      .request<IQuestionnaireResponse>({
        url: `Questionnaire/${questionnaireId}/next-q`,
        method: "POST",
        mode: "cors",
        body: JSON.stringify(postResponse),
        headers: {
          "Content-Type": "application/json",
          Authorization: this.authenticateUser(),
        },
      })
      .catch((err: any) => {
        // console.error(err);
        return undefined;
      });
  }

  async getPromisResource<T>(reference: string) {
    return await this.client
      .request<T>({
        url: reference,
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.authenticateUser(),
        },
      })
      .catch((err: any) => {
        // console.error(err);
        return undefined;
      });
  }
}
