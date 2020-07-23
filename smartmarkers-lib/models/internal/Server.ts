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
  ServiceRequest as IServiceRequest,
  QuestionnaireResponse as IQuestionnaireResponse,
  Observation as IObservation,
  DomainResource,
} from "..";
import { User } from "../../context";

export class Server {
  public client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getPatientRequests(filter?: string) {
    const serviceRequestFactory = new ServiceRequestFactory(this);
    const patientId = this.client.patient.id;
    const reqUrl = filter
      ? `ServiceRequest?patient=${patientId}&${filter}`
      : `ServiceRequest?patient=${patientId}`;
    const reqOptions = {
      pageLimit: 0,
      flat: true,
    };
    const items = await this.client
      .request<IServiceRequest[]>(reqUrl, reqOptions)
      .catch((err) => {
        console.error(err);
        return [] as IServiceRequest[];
      });

    const requests = await Promise.all(
      items.map(async (item) => {
        const s = serviceRequestFactory.createServiceRequest(item);
        const i = await s.getInstrument();
        const r = await i?.getReports();
        s.setReports(r);
        return s;
      })
    );
    return requests;
  }

  async getRequest(id: string) {
    const serviceRequestFactory = new ServiceRequestFactory(this);
    const reqUrl = `ServiceRequest/${id}`;
    const reqOptions = {
      pageLimit: 0,
      flat: true,
    };
    const item = await this.client
      .request<IServiceRequest>(reqUrl, reqOptions)
      .catch((err) => {
        console.error(err);
        return {} as IServiceRequest;
      });

    const s = serviceRequestFactory.createServiceRequest(item);
    const i = await s.getInstrument();
    const r = await i?.getReports();
    s.setReports(r);
    return s;
  }

  async getInstruments(type: InstrumentType, filter?: string) {
    const typeStr = InstrumentType[type];
    const instrumentFactory = new InstrumentFactory(this);

    const reqUrl = filter ? `${typeStr}?${filter}` : `${typeStr}`;
    const reqOptions = {
      pageLimit: 0,
      flat: true,
    };
    const items = await this.client
      .request<DomainResource[]>(reqUrl, reqOptions)
      .catch((err) => {
        console.error(err);
        return [] as DomainResource[];
      });

    const requests = await Promise.all(
      items.map(async (item) => {
        const s = instrumentFactory.createInstrument(item);
        const i = await s.getReports();
        return s;
      })
    );
    return requests;
  }

  async getInstrument(type: InstrumentType, id: string) {
    const typeStr = InstrumentType[type];
    const instrumentFactory = new InstrumentFactory(this);

    const reqUrl = `${typeStr}/${id}`;
    const reqOptions = {
      flat: true,
    };
    const item = await this.client
      .request<DomainResource>(reqUrl, reqOptions)
      .catch((err) => {
        console.error(err);
        return undefined;
      });
    if (item) {
      return instrumentFactory.createInstrument(item);
    }
  }

  async createServiceRequest(instrument: Instrument) {
    const serviceRequest = instrument.createServiceRequest();

    return (await this.client.create(
      serviceRequest as fhirclient.FHIR.Resource
    )) as ServiceRequest;
  }

  async createReport(report: Report, patient?: User) {
    console.log({ report });
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
        (report as QuestionnaireResponse).source = {
          reference: u,
        };
      }
    }
    return (await this.client.create(
      report as fhirclient.FHIR.Resource
    )) as Report;
  }

  async getPatientReports(type: ReportType, filter?: string) {
    const typeStr = ReportType[type];
    return await this.client.patient.request(
      filter ? `${typeStr}?${filter}` : typeStr,
      {
        pageLimit: 0,
        flat: true,
      }
    );
  }

  async getQuestionnaireReportsByServiceRequestId(serviceRequestId: string) {
    return await this.client
      .request<IQuestionnaireResponse[]>(
        `QuestionnaireResponse?patient=${this.client.patient.id}&based-on=ServiceRequest/${serviceRequestId}`,
        { flat: true }
      )
      .catch((err) => {
        console.error(err);
        return [] as IQuestionnaireResponse[];
      });
  }

  async getQuestionnaireReports(id: string, serviceRequestId?: string) {
    const url = serviceRequestId
      ? `QuestionnaireResponse?patient=${this.client.patient.id}&questionnaire=Questionnaire/${id}&based-on=ServiceRequest/${serviceRequestId}`
      : `QuestionnaireResponse?patient=${this.client.patient.id}&questionnaire=Questionnaire/${id}`;
    return await this.client
      .request<IQuestionnaireResponse[]>(url, { flat: true })
      .catch((err) => {
        console.error(err);
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
    return await this.client.request<T>(reference).catch((err) => {
      console.error(err);
      return undefined;
    });
  }
}
