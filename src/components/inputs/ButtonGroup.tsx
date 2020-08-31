import React from 'react'
import { Text, Button, Segment, Icon, View } from 'native-base'
import { GroupItem } from './GroupItem'
import { QuestionsLayout } from '../Form'

export interface ButtonGroupProps<T> {
    items: GroupItem<T>[]
    value?: T
    error?: string
    onChange?: (value: T) => void
    questionsLayout?: QuestionsLayout
}

export const ButtonGroup: React.FC<ButtonGroupProps<any>> = props => {
    const { items, value, onChange, error, questionsLayout = QuestionsLayout.Vertical } = props
    const hasError = !!error
    const onPress = (value: any) => () => {
        if (onChange) {
            onChange(value)
        }
    }

    const segmentStyle: any = {
        backgroundColor: 'transparent',
    }

    const buttonStyle: any = {}

    if (questionsLayout === QuestionsLayout.Vertical) {
        segmentStyle.flexDirection = 'column'
        segmentStyle.height = 'auto'
        segmentStyle.alignItems = 'center'
        segmentStyle.alignSelf = 'center'
        segmentStyle.width = 'max-content'

        buttonStyle.marginBottom = 5
        buttonStyle.width = '100%'
        buttonStyle.display = 'flex'
        buttonStyle.justifyContent = 'center'
    }

    return (
        <View style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Segment style={segmentStyle}>
                {items.map((item, index) => (
                    <Button
                        light
                        key={index}
                        first={index === 0}
                        active={item.value == value}
                        last={index === items.length - 1}
                        onPress={onPress(item.value)}
                        style={buttonStyle}
                    >
                        <Text>{item.label}</Text>
                    </Button>
                ))}
                {hasError && <Icon name="close-circle" />}
            </Segment>
        </View>
    )
}
