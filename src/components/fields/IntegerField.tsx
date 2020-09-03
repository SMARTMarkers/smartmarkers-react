import React from 'react'
import { BaseFieldProps } from './BaseFieldProps'
import { View, Input, Item, Text, Icon } from 'native-base'
import { setFormValue, getLabel, getFormValue } from './utils'
import { QuestionnaireItemFields } from './QuestionnaireItemFields'

export interface IntegerFieldProps extends BaseFieldProps {}

export const IntegerField: React.FC<IntegerFieldProps> = props => {
    const { item, id, ...propsToPass } = props

    const onChange = (value: any) => {
        const newFormData = setFormValue(props.formData, item.linkId, value)
        if (props.onChange) {
            props.onChange(newFormData, item.linkId)
        }
    }
    const { value, touched } = getFormValue(props.formData, item.linkId)
    const error = props.errorData && touched ? props.errorData[item.linkId] : ''
    const hasError = !!error
    return (
        <View>
            <Text>{getLabel(item)}</Text>
            <Item regular error={hasError}>
                <Input value={value} onChangeText={onChange} keyboardType={'numeric'} />
                {hasError && <Icon name="close-circle" />}
            </Item>
            <QuestionnaireItemFields items={item.item} {...propsToPass} />
        </View>
    )
}
