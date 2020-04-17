import React from "react";
import { GestureResponderEvent } from "react-native";
import { ListItem, Content, Left, Right, Radio, Text } from "native-base";

export interface RadioGroupItem<T> {
  label: string;
  value: T;
}

export interface RadioGroupProps<T> {
  items: RadioGroupItem<T>[];
  value?: T;
  onChange?: (value: T) => void;
}

export const RadioGroup: React.FC<RadioGroupProps<any>> = (props) => {
  const { items, value, onChange } = props;
  const onPress = (value: any) => (event: GestureResponderEvent) => {
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <Content>
      {items &&
        items.map((item, index) => {
          const isSelected = item.value === value;
          return (
            <ListItem
              key={index}
              onPress={onPress(item.value)}
              selected={isSelected}
            >
              <Left>
                <Text onPress={onPress(item.value)}>{item.label}</Text>
              </Left>
              <Right>
                <Radio onPress={onPress(item.value)} selected={isSelected} />
              </Right>
            </ListItem>
          );
        })}
    </Content>
  );
};
