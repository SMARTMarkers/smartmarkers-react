import { IResource } from './Resource'
import { IIdentifier } from './Identifier'
import { IBackboneElement } from './BackboneElement'
import { ISignature } from './Signature'

export enum BundleType {
    Document = 'document',
    Message = 'message',
    Transaction = 'transaction',
    TransactionResponse = 'transaction-response',
    Batch = 'batch',
    BatchResponse = 'batch-response',
    History = 'history',
    Searchset = 'searchset',
    Collection = 'collection',
}

export interface IBundleLink extends IBackboneElement {
    relation: string // R!  See http://www.iana.org/assignments/link-relations/link-relations.xhtml#link-relations-1
    url: string // R!  Reference details for the link
}

export enum SearchEntryMode {
    Match = 'match',
    Include = 'include',
    Outcome = 'outcome',
}

export interface ISearchEntry extends IBackboneElement {
    mode?: SearchEntryMode // match | include | outcome - why this is in the result set
    score?: number // Search ranking (between 0 and 1)
}

export enum HTTPVerb {
    GET = 'GET',
    HEAD = 'HEAD',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
}

export interface IRequestEntry extends IBackboneElement {
    method: HTTPVerb // R!  GET | HEAD | POST | PUT | DELETE | PATCH
    url: string // R!  URL for HTTP equivalent of this entry
    ifNoneMatch?: string // For managing cache currency
    ifModifiedSince?: Date // For managing cache currency
    ifMatch?: string // For managing update contention
    ifNoneExist?: string // For conditional creates
}

export interface IResponseEntry extends IBackboneElement {
    // C? Results of execution (transaction/batch/history)
    status: string // R!  Status response code (text optional)
    location?: string // The location (if the operation returns a location)
    etag?: string // The Etag for the resource (if relevant)
    lastModified?: Date // Server's date time modified
    outcome?: IResource // OperationOutcome with hints and warnings (for batch/transaction)
}

export interface IBundleEntry extends IBackboneElement {
    link?: IBundleLink[] // Links related to this entry
    fullUrl?: string // URI for resource (Absolute URL server address or URI for UUID/OID)
    resource?: IResource // A resource in the bundle
    search?: ISearchEntry
    request?: IRequestEntry
    response?: IResponseEntry
}

export interface IBundle extends IResource {
    // from Resource: id, meta, implicitRules, and language
    identifier?: IIdentifier // Persistent identifier for the bundle
    type: BundleType // R!  document | message | transaction | transaction-response | batch | batch-response | history | searchset | collection
    timestamp?: Date // When the bundle was assembled
    total?: number // C? If search, the total number of matches
    link?: IBundleLink[]
    entry?: IBundleEntry[]
    signature?: ISignature // Digital Signature
}
