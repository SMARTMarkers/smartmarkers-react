import React from 'react'
import { View, Text } from 'react-native'
import { BaseFieldProps } from './BaseFieldProps'
import { checkEnableRules } from './utils'

export interface OpenChoiceFieldProps extends BaseFieldProps {}

export const OpenChoiceField: React.FC<OpenChoiceFieldProps> = props => {
    const { item } = props
    return (
        <View>
            <Text>
                OpenChoiceField Id={item.id} LinkId={item.linkId}
            </Text>
        </View>
    )
}
