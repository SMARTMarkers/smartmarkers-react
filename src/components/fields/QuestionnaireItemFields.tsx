import React from 'react'
import { IQuestionnaireItem, IQuestionnaire, QuestionnaireItemType } from '../../models'
import { QuestionnaireItemField } from './QuestionnaireItemField'
import { View } from 'native-base'
import { EnumDictionary, QuestionsLayout } from '../Form'
import { BaseFieldProps } from './BaseFieldProps'

export interface QuestionnaireItemFieldsProps {
    id?: string
    testID?: string
    questionnaire: IQuestionnaire
    items: IQuestionnaireItem[]
    fieldsMap: EnumDictionary<QuestionnaireItemType, React.FC<BaseFieldProps>>
    formData?: any
    errorData?: any
    onChange?: (formData: any, linkId: string) => void
    onSubmit?: Function
    onFocus?: Function
    onBlur?: Function
    questionsLayout?: QuestionsLayout
}

export const QuestionnaireItemFields: React.FC<QuestionnaireItemFieldsProps> = props => {
    const { id, testID, items, ...propsToPass } = props
    return (
        <View testID={testID} style={{ flex: 1 }}>
            {items &&
                items.length > 0 &&
                items.map((q, index) => {
                    return (
                        <QuestionnaireItemField
                            key={index}
                            id={q.linkId}
                            item={q}
                            {...propsToPass}
                        />
                    )
                })}
        </View>
    )
}
