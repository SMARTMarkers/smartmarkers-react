import React from "react";
import { Text, Button, Segment } from "native-base";
import { GroupItem } from "./GroupItem";

export interface ButtonGroupProps<T> {
  items: GroupItem<T>[];
  value?: T;
  onChange?: (value: T) => void;
}

export const ButtonGroup: React.FC<ButtonGroupProps<any>> = (props) => {
  const { items, value, onChange } = props;

  const onPress = (value: any) => () => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Segment style={{ backgroundColor: "transparent" }}>
      {items.map((item, index) => (
        <Button
          light
          key={index}
          first={index === 0}
          active={item.value == value}
          last={index === items.length - 1}
          onPress={onPress(item.value)}
        >
          <Text>{item.label}</Text>
        </Button>
      ))}
    </Segment>
  );
};
