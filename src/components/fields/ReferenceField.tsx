import React from 'react'
import { View, Text } from 'react-native'
import { BaseFieldProps } from './BaseFieldProps'

export interface ReferenceFieldProps extends BaseFieldProps {}

export const ReferenceField: React.FC<ReferenceFieldProps> = props => {
    const { item } = props
    return (
        <View>
            <Text>
                ReferenceField Id={item.id} LinkId={item.linkId}
            </Text>
        </View>
    )
}
