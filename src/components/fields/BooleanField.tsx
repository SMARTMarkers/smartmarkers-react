import React from 'react'
import { View, Text } from 'native-base'
import { BaseFieldProps } from './BaseFieldProps'
import { ButtonGroup } from '../inputs'
import { getLabel, setFormValue, getFormValue } from './utils'
import { QuestionnaireItemFields } from './QuestionnaireItemFields'

export interface BooleanFieldProps extends BaseFieldProps {}

export const BooleanField: React.FC<BooleanFieldProps> = props => {
    const { item, id, questionsLayout, ...propsToPass } = props
    const choices = [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' },
    ]
    const onChange = (value: boolean) => {
        const newFormData = setFormValue<boolean>(props.formData, item.linkId, value)
        if (props.onChange) {
            props.onChange(newFormData, item.linkId)
        }
    }
    const { value } = getFormValue(props.formData, item.linkId)
    return (
        <View>
            <Text>{getLabel(item)}</Text>
            <ButtonGroup
                questionsLayout={questionsLayout}
                items={choices}
                onChange={onChange}
                value={value}
            />
            <QuestionnaireItemFields items={item.item} {...propsToPass} />
        </View>
    )
}
