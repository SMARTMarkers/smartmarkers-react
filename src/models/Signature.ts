import { IElement } from './Element'
import { IReference } from './Reference'
export interface ISignature extends IElement {
    type: SignatureTypeCodes[]
    when: Date
    who: IReference
    onBehalfOf?: IReference
    targetFormat?: string
    sigFormat?: string
    data?: any
}
export enum SignatureTypeCodes {
    Author = '1.2.840.10065.1.12.1.1',
    CoAuthor = '1.2.840.10065.1.12.1.2',
    CoParticipant = '1.2.840.10065.1.12.1.3',
    TranscriptionistRecorder = '1.2.840.10065.1.12.1.4',
    Verification = '1.2.840.10065.1.12.1.5\t',
    Validation = '1.2.840.10065.1.12.1.6',
    Consent = '1.2.840.10065.1.12.1.7',
    SignatureWitness = '1.2.840.10065.1.12.1.8',
    EventWitness = '1.2.840.10065.1.12.1.9',
    IdentityWitness = '1.2.840.10065.1.12.1.10',
    ConsentWitness = '1.2.840.10065.1.12.1.11',
    Interpreter = '1.2.840.10065.1.12.1.12',
    Review = '1.2.840.10065.1.12.1.13',
    Source = '1.2.840.10065.1.12.1.14',
    Addendum = '1.2.840.10065.1.12.1.15',
    Modification = '1.2.840.10065.1.12.1.16',
    Administrative = '1.2.840.10065.1.12.1.17',
    Timestamp = '1.2.840.10065.1.12.1.18',
}
