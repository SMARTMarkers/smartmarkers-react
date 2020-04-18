import React from "react";
import { Icon, Picker, Item } from "native-base";
import { GroupItem } from "./GroupItem";

export interface DropDownProps<T> {
  items: GroupItem<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
}

export const DropDown: React.FC<DropDownProps<any>> = (props) => {
  const { items, value, onChange, placeholder } = props;

  const onValueChange = (value: any) => {
    if (onChange) {
      onChange(value);
    }
  };
  const empty = { label: "Select answer", value: "" };
  const finalItems = [empty, ...items];

  return (
    <Item picker regular>
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={{ width: undefined, minHeight: 50 }}
        placeholder={placeholder}
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
        selectedValue={value}
        onValueChange={onValueChange}
      >
        {finalItems.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    </Item>
  );
};
