import React from 'react'
import { BaseFieldProps } from './BaseFieldProps'
import { View, Text } from 'native-base'
import { setFormValue, getLabel, getFormValue } from './utils'
import { QuestionnaireItemFields } from './QuestionnaireItemFields'
import { DateTime } from '../inputs/DateTime'

export interface DateTimeFieldProps extends BaseFieldProps {}

export const DateTimeField: React.FC<DateTimeFieldProps> = props => {
    const { item, id, ...propsToPass } = props

    const onChange = (value: any) => {
        const newFormData = setFormValue(props.formData, item.linkId, value)
        if (props.onChange) {
            props.onChange(newFormData, item.linkId)
        }
    }
    const { value } = getFormValue(props.formData, item.linkId)
    return (
        <View>
            <Text>{getLabel(item)}</Text>
            <DateTime mode="datetime" value={value} onChange={onChange} />
            <QuestionnaireItemFields items={item.item} {...propsToPass} />
        </View>
    )
}
