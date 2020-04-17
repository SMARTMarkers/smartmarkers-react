import React from "react";
import { View, Text } from "react-native";
import { BaseFieldProps } from "./BaseFieldProps";

export interface DisplayFieldProps extends BaseFieldProps {}

export const DisplayField: React.FC<DisplayFieldProps> = (props) => {
  const { item } = props;
  return (
    <View>
      <Text>
        DisplayField Id={item.id} LinkId={item.linkId}
      </Text>
    </View>
  );
};
