import React, { useState } from 'react'
import { Router } from './react-router'
import Routes from './navigation/Routes'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import { FhirProvider, FhirProviderProps } from 'smartmarkers'

const App: React.FC = () => {
    const [isReady, setIsReady] = useState(false)

    React.useEffect(() => {
        const loadAssets = async () => {
            await Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
                ...Ionicons.font,
            })
            setIsReady(true)
        }
        loadAssets()
    }, [])

    if (!isReady) {
        return <AppLoading />
    }

    const redirectUri = Linking.makeUrl('auth-callback')
    // Practitioner
    // const iss =
    // "https://launch.smarthealthit.org/v/r4/sim/eyJoIjoiMSIsImIiOiIzMjZiNDY3NS0wYmM4LTRkYmQtYjQwNi1hNTU2NGMyODI0MDEsMTU1ZDNkODAtZjNmMC00YjM5LTkyMDctMGQxMjJjZjk0YTExIiwiZSI6IjM3ODgxMDg2LTdiMDUtNGIxOC1hMjc5LTA4ZTMzMWY1MGU5YiJ9/fhir";
    // Patient
    // const iss =
    //  "https://launch.smarthealthit.org/v/r4/sim/eyJrIjoiMSIsImoiOiIxIiwiYiI6Ijg3YTMzOWQwLThjYWUtNDE4ZS04OWM3LTg2NTFlNmFhYjNjNiJ9/fhir";

    // const iss =
    //     'https://launch.smarthealthit.org/v/r4/sim/eyJoIjoiMSIsImIiOiIzMjZiNDY3NS0wYmM4LTRkYmQtYjQwNi1hNTU2NGMyODI0MDEiLCJpIjoiMSIsImoiOiIxIiwiZSI6ImVmYjVkNGNlLWRmZmMtNDdkZi1hYTZkLTA1ZDM3MmZkYjQwNyJ9/fhir'
    // const iss = "https://launch.smarthealthit.org/v/r4/sim/eyJrIjoiMSIsImoiOiIxIiwiYiI6IjMyNmI0Njc1LTBiYzgtNGRiZC1iNDA2LWE1NTY0YzI4MjQwMSJ9/fhir";
    const iss = 'https://launch.smarthealthit.org/v/r4/sim/eyJrIjoiMSIsImoiOiIxIiwiYiI6IjE1NWQzZDgwLWYzZjAtNGIzOS05MjA3LTBkMTIyY2Y5NGExMSJ9/fhir'
    const scope =
        'openid fhirUser offline_access user/*.* patient/*.* launch/encounter launch/patient profile'
    const settings: FhirProviderProps = {
        client_id: 'my_web_app',
        scope,
        iss,
        redirectUri,
        promisSettings: {
            url: 'https://mss.fsm.northwestern.edu/ac_api_cr/2018-10/',
            token: '',
            identifier: '',
        },
    }

    return (
        <FhirProvider {...settings}>
            <Router>
                <Routes />
            </Router>
        </FhirProvider>
    )
}

export default App
