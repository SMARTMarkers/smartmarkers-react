import React from "react";
import { ListItem, Item, Left, Right, Radio, Text, Button } from "native-base";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

export interface DateTimeProps {
  mode?: "date" | "time" | "datetime";
  value?: Date | string;
  onChange?: (date?: Date) => void;
}

export const DateTime: React.FC<DateTimeProps> = (props) => {
  const [show, setShow] = React.useState(false);
  const { mode, value, onChange } = props;
  const onLocalChange = (event: Event, date?: Date) => {
    setShow(false);
    if (onChange) {
      onChange(date);
    }
  };

  const onSelectPress = () => {
    setShow(true);
  };

  const dateValue = value ? new Date(value) : new Date();
  return (
    <Item>
      <Text>{value ? new Date(value).toLocaleDateString() : ""}</Text>
      <Button onPress={onSelectPress}>
        <Text>Select</Text>
      </Button>
      {show && (
        <DateTimePicker
          value={dateValue}
          minimumDate={new Date(1890, 1, 1)}
          maximumDate={new Date()}
          locale={"en"}
          timeZoneOffsetInMinutes={0}
          onChange={onLocalChange}
          mode={mode ? mode : "date"}
        />
      )}
    </Item>
  );
};
