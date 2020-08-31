import React from 'react'
import { IQuestionnaire, QuestionnaireItemType } from '../../models'
import { QuestionnaireItemFields } from './QuestionnaireItemFields'
import { View, Content, Text } from 'native-base'
import { EnumDictionary, QuestionsLayout } from '../Form'
import { BaseFieldProps } from './BaseFieldProps'

export interface QuestionnaireFieldProps {
    id?: string
    testID?: string
    questionnaire: IQuestionnaire
    fieldsMap: EnumDictionary<QuestionnaireItemType, React.FC<BaseFieldProps>>
    formData?: any
    errorData?: any
    onChange?: (formData: any, linkId: string) => void
    onSubmit?: Function
    onFocus?: Function
    onBlur?: Function
    questionsLayout?: QuestionsLayout
}

export const QuestionnaireField: React.FC<QuestionnaireFieldProps> = props => {
    const { questionnaire } = props
    const { id, testID, ...propsToPass } = props

    return (
        <Content testID={testID}>
            {questionnaire.item && (
                <QuestionnaireItemFields
                    id={props.id}
                    items={questionnaire.item}
                    {...propsToPass}
                />
            )}
            {!questionnaire.item && <Text>No items to render</Text>}
        </Content>
    )
}
