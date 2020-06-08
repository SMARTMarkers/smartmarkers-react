import { DomainResource, ServiceRequest as IServiceRequest } from "../models";
import { ServiceRequest } from "./ServiceRequest";
import Client from "fhirclient/lib/Client";
import { Instrument } from "../instruments";

export class ServiceRequestFactory {
  constructor(private fhirClient: Client) {}
  createServiceRequest(serviceRequestOptions: IServiceRequest): ServiceRequest;

  public createServiceRequest(serviceRequestOptions: DomainResource) {
    if (serviceRequestOptions.resourceType === "ServiceRequest") {
      return new ServiceRequest(
        serviceRequestOptions as IServiceRequest,
        this.fhirClient
      );
    } else {
      throw new Error("Select either a ServiceRequest");
    }
  }
}
