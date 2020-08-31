import React from 'react'
import { View, Text } from 'react-native'
import { BaseFieldProps } from './BaseFieldProps'

export interface AttachmentFieldProps extends BaseFieldProps {}

export const AttachmentField: React.FC<AttachmentFieldProps> = props => {
    const { item } = props
    return (
        <View>
            <Text>
                AttachmentField Id={item.id} LinkId={item.linkId}
            </Text>
        </View>
    )
}
