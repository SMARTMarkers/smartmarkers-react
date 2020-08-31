import { ICodeableConcept } from './CodeableConcept'
import { IPeriod } from './Period'
import { IOrganization } from './Organization'
export interface IIdentifier {
    code: string
    type: ICodeableConcept
    system: string
    value: string
    period: IPeriod
    assigner?: IOrganization
}
