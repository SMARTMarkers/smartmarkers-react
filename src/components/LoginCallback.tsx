import React from 'react'
import { Spinner } from 'native-base'

export interface LoginCallbackProps {
    redirect: () => void
    loginCallback: () => Promise<void>
}

export const LoginCallback: React.FC<LoginCallbackProps> = props => {
    const [isReady, setIsReady] = React.useState(false)

    React.useEffect(() => {
        const loginCallback = async () => {
            await props.loginCallback()
            setIsReady(true)
        }
        loginCallback()
    }, [])

    React.useEffect(() => {
        if (isReady) {
            props.redirect()
        }
    }, [isReady])

    return <Spinner />
}
