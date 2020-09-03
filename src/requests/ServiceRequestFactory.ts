import { IDomainResource, IServiceRequest } from '../models'
import { ServiceRequest } from './ServiceRequest'
import { Server } from '../models/internal'

export class ServiceRequestFactory {
    constructor(private server: Server, private promisServer: Server | undefined) {}
    createServiceRequest(serviceRequestOptions: IServiceRequest): ServiceRequest

    public createServiceRequest(serviceRequestOptions: IDomainResource) {
        if (serviceRequestOptions.resourceType === 'ServiceRequest') {
            return new ServiceRequest(
                serviceRequestOptions as IServiceRequest,
                this.server,
                this.promisServer
            )
        } else {
            throw new Error('Select either a ServiceRequest')
        }
    }
}
