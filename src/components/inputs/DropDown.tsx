import React from "react";
import { Icon, Picker, Item } from "native-base";
import { GroupItem } from "./GroupItem";

export interface DropDownProps<T> {
  items: GroupItem<T>[];
  value?: T;
  error?: string;
  onChange?: (value: T) => void;
  placeholder?: string;
}

export const DropDown: React.FC<DropDownProps<any>> = (props) => {
  const { items, value, onChange, placeholder, error } = props;

  const onValueChange = (newValue: any) => {
    if (onChange) {
      const valueForForm = items.filter((el: any) => el.label === newValue);
      valueForForm.length && onChange(valueForForm[0].value);
    }
  };
  const empty = { label: "Select answer", value: "" };
  const finalItems = [empty, ...items];
  const hasError = !!error;
  return (
    <Item picker regular error={hasError}>
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={{ width: undefined, minHeight: 50 }}
        placeholder={placeholder}
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
        selectedValue={value ? value.display : value}
        onValueChange={onValueChange}
      >
        {finalItems.map((item, index) => (
          <Picker.Item
            key={index}
            label={item.label}
            value={item.value.value}
          />
        ))}
      </Picker>
      {hasError && <Icon name="close-circle" />}
    </Item>
  );
};
