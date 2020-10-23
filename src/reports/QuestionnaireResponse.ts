import {
    IQuestionnaireResponse,
    ResourceType,
    QuestionnaireResponseStatus,
    IIdentifier,
    IReference,
    IQuestionnaireResponseItem,
    INarrative,
    IResource,
    IExtension,
    IMeta,
} from '../models'
import { Server } from '../models/internal'
import { Report } from './Report'

export class QuestionnaireResponse implements IQuestionnaireResponse, Report {
    id: string
    resourceType: ResourceType = 'QuestionnaireResponse'
    status: QuestionnaireResponseStatus
    identified?: IIdentifier | undefined
    basedOn?: IReference[] | undefined
    partOf?: IReference[] | undefined
    questionnaire?: string | undefined
    subject?: IReference | undefined
    encounter?: IReference | undefined
    authored?: Date | undefined
    authoredDate?: Date | undefined
    author?: IReference | undefined
    source?: IReference | undefined
    item?: IQuestionnaireResponseItem[] | undefined
    text?: INarrative | undefined
    contained?: IResource[] | undefined
    extension?: IExtension[] | undefined
    modifierExtension?: IExtension[] | undefined
    meta?: IMeta | undefined
    implicitRules?: string | undefined
    language?: string | undefined

    constructor(item: IQuestionnaireResponse, public server: Server) {
        this.id = item.id
        this.status = item.status
        this.authoredDate = item.authored
        Object.assign(this, item)
    }
    public getSummary() {
        return JSON.stringify(this.item)
    }

    public getTitle() {
        if (this.text && this.text.div) {
            return this.text.div
        }

        return this.id
    }

    public getNote() {
        if (
            this.modifierExtension &&
            this.modifierExtension.length > 0 &&
            this.modifierExtension[0] &&
            this.modifierExtension[0].valueReference &&
            this.modifierExtension[0].valueReference.reference
        ) {
            return this.modifierExtension[0].valueReference.reference
        }
        if (
            this.extension &&
            this.extension.length > 0 &&
            this.extension[0] &&
            this.extension[0].valueReference &&
            this.extension[0].valueReference.reference
        ) {
            return this.extension[0].valueReference.reference
        }

        return this.resourceType
    }
}
