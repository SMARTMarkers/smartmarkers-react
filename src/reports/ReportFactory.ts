import { IDomainResource, IObservation, IQuestionnaireResponse } from '../models'
import { QuestionnaireResponse } from './QuestionnaireResponse'
import { Observation } from './Observation'
import { Server } from '../models/internal'

export class ReportFactory {
    constructor(private server: Server) {}

    createReport(reportOptions: IQuestionnaireResponse): QuestionnaireResponse
    createReport(reportOptions: IObservation): Observation

    public createReport(reportOptions: IDomainResource) {
        if (reportOptions.resourceType === 'QuestionnaireResponse') {
            return new QuestionnaireResponse(reportOptions as IQuestionnaireResponse, this.server)
        } else if (reportOptions.resourceType === 'Observation') {
            return new Observation(reportOptions as IObservation, this.server)
        } else {
            throw new Error('Select either a QuestionnaireResponse or a Observation')
        }
    }
}
