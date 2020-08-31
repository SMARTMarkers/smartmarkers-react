import { ExpoAdapter } from './ExpoAdapter'

const adapter = new ExpoAdapter()
const { ready, authorize, init, client, options } = adapter.getSmartApi()

export const FHIR = {
    AbortController: AbortController,
    client,
    oauth2: {
        settings: options,
        ready,
        authorize,
        init,
    },
}
