import React, { useEffect, useState } from "react";
import { Item, Text, Button, Left, Right, Icon, View } from "native-base";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

export interface DateTimeProps {
  mode?: "date" | "time" | "datetime";
  value?: Date | string;
  onChange?: (date?: Date) => void;
  error?: string;
  minDate?: Date;
  maxDate?: Date;
  buttonColor?: string;
}

export const DateTime: React.FC<DateTimeProps> = (props) => {
  const [show, setShow] = React.useState(false);
  const { mode, value, onChange, error, minDate, maxDate, buttonColor } = props;

  const [date, setDate] = useState(value);
  useEffect(() => {
    setDate(value);
  }, [value]);

  const onLocalChange = (event, newDate) => {
    setDate(newDate);
  };
  const onApply = () => {
    setShow(false);
    if (onChange) {
      onChange(date as Date);
    }
  };

  const onSelectPress = () => {
    setShow(true);
  };

  const dateValue = value ? new Date(value) : new Date();
  const hasError = !!error;

  if (show)
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <View style={{ width: 270 }}>
          <DateTimePicker
            value={date as Date}
            minimumDate={minDate}
            maximumDate={maxDate}
            locale={"en"}
            timeZoneOffsetInMinutes={0}
            onChange={onLocalChange}
            mode={mode ? mode : "date"}
          />
        </View>
        <Button
          style={buttonColor ? { backgroundColor: buttonColor } : {}}
          onPress={onApply}
        >
          <Text>Apply</Text>
        </Button>
      </View>
    );
  return (
    <Item regular error={hasError}>
      <Left>
        <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
          {value ? new Date(value).toLocaleDateString() : ""}
        </Text>
        {hasError && <Icon name="close-circle" />}
      </Left>
      <Right>
        <Button
          style={buttonColor ? { backgroundColor: buttonColor } : {}}
          onPress={onSelectPress}
        >
          <Text>Select</Text>
        </Button>
      </Right>
    </Item>
  );
};
