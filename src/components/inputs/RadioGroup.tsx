import React from 'react'
import { GestureResponderEvent } from 'react-native'
import { ListItem, View, Left, Right, Radio, Text } from 'native-base'
import { GroupItem } from './GroupItem'

export interface RadioGroupProps<T> {
    items: GroupItem<T>[]
    value?: T
    onChange?: (value: T) => void
}

export const RadioGroup: React.FC<RadioGroupProps<any>> = props => {
    const { items, value, onChange } = props
    const onPress = (value: any) => (event: GestureResponderEvent) => {
        if (onChange) {
            onChange(value)
        }
    }
    return (
        <View>
            {items &&
                items.map((item, index) => {
                    const isSelected = item.value === value
                    return (
                        <ListItem key={index} onPress={onPress(item.value)} selected={isSelected}>
                            <Left>
                                <Text onPress={onPress(item.value)}>{item.label}</Text>
                            </Left>
                            <Right>
                                <Radio onPress={onPress(item.value)} selected={isSelected} />
                            </Right>
                        </ListItem>
                    )
                })}
        </View>
    )
}
