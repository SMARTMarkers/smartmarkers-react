import React from 'react'
import { View, Text } from 'react-native'
import { BaseFieldProps } from './BaseFieldProps'

export interface QuestionFieldProps extends BaseFieldProps {}

export const QuestionField: React.FC<QuestionFieldProps> = props => {
    const { item } = props
    return (
        <View>
            <Text>
                QuestionField Id={item.id} LinkId={item.linkId}
            </Text>
        </View>
    )
}
