import React from "react";
import {
  InstrumentType,
  Instrument as InstrumentInterface,
} from "./InstrumentList";
import { View, Text } from "native-base";

export interface InstrumentProps {
  type: InstrumentType;
  instrument: InstrumentInterface;
}

export const Instrument: React.FC<InstrumentProps> = (props) => {
  return (
    <View>
      <Text>{InstrumentType[props.type]}</Text>
    </View>
  );
};
