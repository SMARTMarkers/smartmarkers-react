import { ResourceType, IReference, IMeta } from '../models'
import { Server } from '../models/internal'

export enum ReportType {
    Observation,
    QuestionnaireResponse,
}

export interface Report {
    server: Server
    resourceType: ResourceType
    meta?: IMeta | undefined
    subject?: IReference
    basedOn?: IReference[]
    id: string
    getTitle: () => string
    getNote: () => string
    getSummary: () => string
}
