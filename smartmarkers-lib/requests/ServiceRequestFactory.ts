import { DomainResource, ServiceRequest as IServiceRequest } from "../models";
import { ServiceRequest } from "./ServiceRequest";
import { Server } from "../models/internal";

export class ServiceRequestFactory {
  constructor(private server: Server) {}
  createServiceRequest(serviceRequestOptions: IServiceRequest): ServiceRequest;

  public createServiceRequest(serviceRequestOptions: DomainResource) {
    if (serviceRequestOptions.resourceType === "ServiceRequest") {
      return new ServiceRequest(
        serviceRequestOptions as IServiceRequest,
        this.server
      );
    } else {
      throw new Error("Select either a ServiceRequest");
    }
  }
}
