import { IResource } from './Resource'
import { INarrative } from './Narrative'
import { IExtension } from './Extension'
export interface IDomainResource extends IResource {
    text?: INarrative
    contained?: IResource[]
    extension?: IExtension[]
    modifierExtension?: IExtension[]
}
