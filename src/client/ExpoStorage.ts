import { AsyncStorage } from 'react-native'
import { fhirclient } from 'fhirclient/lib/types'

export class ExpoStorage implements fhirclient.Storage {
    /**
     * Gets the value at `key`. Returns a promise that will be resolved
     * with that value (or undefined for missing keys).
     */
    async get<T>(key: string): Promise<T | null> {
        const value = await AsyncStorage.getItem(key)
        if (value) {
            return JSON.parse(value)
        }
        return null
    }

    /**
     * Sets the `value` on `key` and returns a promise that will be resolved
     * with the value that was set.
     */
    async set<T>(key: string, value: T): Promise<T> {
        await AsyncStorage.setItem(key, JSON.stringify(value))
        return value
    }

    /**
     * Deletes the value at `key`. Returns a promise that will be resolved
     * with true if the key was deleted or with false if it was not (eg. if
     * did not exist).
     */
    async unset(key: string): Promise<boolean> {
        const value = await AsyncStorage.getItem(key)
        if (value) {
            await AsyncStorage.removeItem(key)
            return true
        }
        return false
    }
}
