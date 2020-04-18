import React from "react";
import { Item, Text, Button, Left, Right } from "native-base";
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
    <Item regular>
      <Left>
        <Text>{value ? new Date(value).toLocaleDateString() : ""}</Text>
      </Left>
      <Right>
        <Button onPress={onSelectPress}>
          <Text>Select</Text>
        </Button>
      </Right>
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
