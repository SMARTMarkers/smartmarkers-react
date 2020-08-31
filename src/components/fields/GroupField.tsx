import React from 'react'
import { BaseFieldProps } from './BaseFieldProps'
import { QuestionnaireItemFields } from './QuestionnaireItemFields'
import { getLabel } from './utils'
import { CardItem, Card, Text } from 'native-base'

export interface GroupFieldProps extends BaseFieldProps {}

export const GroupField: React.FC<GroupFieldProps> = props => {
    const { id, item, ...propsToPass } = props

    return (
        <Card testID={item.linkId}>
            <CardItem header bordered>
                <Text>{getLabel(item)}</Text>
            </CardItem>
            <CardItem bordered>
                <QuestionnaireItemFields items={item.item} {...propsToPass} />
            </CardItem>
        </Card>
    )
}
