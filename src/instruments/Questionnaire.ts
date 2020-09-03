import {
    IQuestionnaire,
    IIdentifier,
    PublicationStatus,
    ResourceType,
    IContactDetail,
    IUsageContext,
    ICodeableConcept,
    IPeriod,
    ICoding,
    IQuestionnaireItem,
    INarrative,
    IResource,
    IExtension,
    IMeta,
    IServiceRequest,
    RequestStatus,
    RequestIntent,
    IQuestionnaireResponse,
} from '../models'
import { Instrument } from './Instrument'
import { ReportFactory } from '../reports/ReportFactory'
import { Server, TaskSchedule } from '../models/internal'
import { Report, QuestionnaireResponse } from '../reports'

export class Questionnaire implements IQuestionnaire, Instrument {
    id: string
    resourceType: ResourceType = 'Questionnaire'
    status: PublicationStatus
    url?: string | undefined
    identifier?: IIdentifier[] | undefined
    version?: string | undefined
    name?: string | undefined
    title?: string | undefined
    derivedFrom?: string | undefined
    experimental?: boolean | undefined
    subjectType?: ResourceType[] | undefined
    date?: Date | undefined
    publisher?: string | undefined
    contact?: IContactDetail | undefined
    description?: string | undefined
    useContext?: IUsageContext[] | undefined
    jurisdiction?: ICodeableConcept[] | undefined
    purpose?: string | undefined
    copyright?: string | undefined
    approvalDate?: Date | undefined
    lastReviewDate?: Date | undefined
    effectivePeriod?: IPeriod | undefined
    code?: ICoding[] | undefined
    item?: IQuestionnaireItem[] | undefined
    text?: INarrative | undefined
    contained?: IResource[] | undefined
    extension?: IExtension[] | undefined
    modifierExtension?: IExtension[] | undefined
    meta?: IMeta | undefined
    implicitRules?: string | undefined
    language?: string | undefined
    protected reports?: QuestionnaireResponse[] | undefined
    protected server: Server

    constructor(item: IQuestionnaire, server: Server) {
        this.id = item.id
        this.status = item.status
        this.server = server
        Object.assign(this, item)
    }

    public isAdaptive() {
        return false
    }

    public createServiceRequest(schedule: TaskSchedule, patientId: string) {
        const serviceRequest = {
            resourceType: 'ServiceRequest',
            modifierExtension: [
                {
                    url:
                        'http://hl7.org/fhir/StructureDefinition/servicerequest-questionnaireRequest',
                    valueReference: {
                        reference: `${this.resourceType}/${this.id}`,
                        display: this.getTitle(),
                    },
                },
            ],
            status: RequestStatus.Active,
            intent: RequestIntent.Order,
            subject: {
                reference: `Patient/${patientId}`,
            },
            requester: {
                reference: this.server.client.getFhirUser(),
            },
        } as Exclude<IServiceRequest, 'id'>

        if (schedule.occurrenceDateTime) {
            serviceRequest.occurrenceDateTime = schedule.occurrenceDateTime
        } else if (schedule.occurrencePeriod) {
            serviceRequest.occurrencePeriod = schedule.occurrencePeriod
        } else if (schedule.occurrenceTiming) {
            serviceRequest.occurrenceTiming = schedule.occurrenceTiming
        }

        return serviceRequest
    }

    public getTitle() {
        if (this.title) {
            return this.title
        }
        if (this.name) {
            return this.name
        }
        if (this.text && this.text.textContent) {
            return this.text.textContent
        }
        return this.id
    }

    public getNote() {
        return `Q ${this.id}`
    }

    async getReports(serviceRequestId?: string) {
        if (this.reports) {
            return this.reports
        }

        const response = await this.server.getQuestionnaireReports(this.id, serviceRequestId)

        const reportFactory = new ReportFactory(this.server)
        this.reports = response.map((item: IQuestionnaireResponse) =>
            reportFactory.createReport(item)
        )
        return this.reports
    }
}
