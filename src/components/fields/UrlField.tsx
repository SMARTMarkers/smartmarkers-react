import React from 'react'
import { BaseFieldProps } from './BaseFieldProps'
import { Content, Input, Item, Text } from 'native-base'
import { setFormValue, getLabel, getFormValue } from './utils'
import { QuestionnaireItemFields } from './QuestionnaireItemFields'

export interface UrlFieldProps extends BaseFieldProps {}

export const UrlField: React.FC<UrlFieldProps> = props => {
    const { item, id, ...propsToPass } = props

    const onChange = (value: any) => {
        const newFormData = setFormValue(props.formData, item.linkId, value)
        if (props.onChange) {
            props.onChange(newFormData, item.linkId)
        }
    }
    const { value } = getFormValue(props.formData, item.linkId)
    return (
        <Content>
            <Text>{getLabel(item)}</Text>
            <Item regular>
                <Input value={value} onChangeText={onChange} keyboardType={'url'} />
            </Item>
            <QuestionnaireItemFields items={item.item} {...propsToPass} />
        </Content>
    )
}
