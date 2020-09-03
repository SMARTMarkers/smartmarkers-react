import React from 'react'
import { View, Text } from 'native-base'
import { QuestionnaireResponse } from '../reports'

export interface FhirResourceViewProps {
    response: QuestionnaireResponse
    space?: string | number
}

export const FhirResourceView: React.FC<FhirResourceViewProps> = ({ response, space = 4 }) => {
    if (!response) return null

    const getJSON = () => {
        return JSON.stringify(
            {
                id: response.id,
                resourceType: response.resourceType,
                status: response.status,
                identified: response.identified,
                basedOn: response.basedOn,
                partOf: response.partOf,
                questionnaire: response.questionnaire,
                subject: response.subject,
                encounter: response.encounter,
                authored: response.authored,
                author: response.author,
                source: response.source,
                item: response.item,
                text: response.text,
                contained: response.contained,
                extension: response.extension,
                modifierExtension: response.modifierExtension,
                meta: response.meta,
                implicitRules: response.implicitRules,
                language: response.language,
            },
            null,
            space
        )
    }

    return (
        <View>
            <Text>{getJSON()}</Text>
        </View>
    )
}
