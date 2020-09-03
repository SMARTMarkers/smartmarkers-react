import { IQuestionnaire, IDomainResource } from '../models'
import { Questionnaire } from './Questionnaire'
import { PromisQuestionnaire } from './PromisQuestionnaire'
import { Instrument } from './Instrument'
import { Server } from '../models/internal'

const ADAPTIVE_QUESTIONNAIRE =
    'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-adapt'
const ADAPTIVE_QUESTIONNAIRE_RESPONSE =
    'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaireresponse-adapt'

export class InstrumentFactory {
    constructor(private server: Server, private promisServer: Server | undefined) {}

    createInstrument(serviceRequestOptions: IQuestionnaire): Questionnaire
    createInstrument(serviceRequestOptions: IDomainResource): Instrument

    public createInstrument(questionnaireOptions: IDomainResource) {
        if (questionnaireOptions.resourceType === 'Questionnaire') {
            const questionnaire = questionnaireOptions as IQuestionnaire
            const hasUrl = questionnaire.url
                ?.toLocaleLowerCase()
                .startsWith('https://mss.fsm.northwestern.edu')
            if (
                (questionnaire.meta &&
                    questionnaire.meta.profile &&
                    questionnaire.meta.profile.includes(ADAPTIVE_QUESTIONNAIRE)) ||
                hasUrl
            ) {
                return new PromisQuestionnaire(questionnaire, this.server, this.promisServer)
            }
            return new Questionnaire(questionnaire, this.server)
        } else {
            throw new Error('Select Questionnaire')
        }
    }
}
