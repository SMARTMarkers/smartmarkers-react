import React from 'react'
import { View, Text } from 'react-native'
import { BaseFieldProps } from './BaseFieldProps'

export interface UnsupportedFieldProps extends BaseFieldProps {}

export const UnsupportedField: React.FC<UnsupportedFieldProps> = props => {
    const { item } = props
    return (
        <View>
            <Text>
                Unsupported field type `{item.type}` Id={item.id} LinkId={item.linkId}
            </Text>
        </View>
    )
}
