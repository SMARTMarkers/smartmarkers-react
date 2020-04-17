import React from "react";
import { View, Text } from "react-native";
import { BaseFieldProps } from "./BaseFieldProps";

export interface UrlFieldProps extends BaseFieldProps {}

export const UrlField: React.FC<UrlFieldProps> = (props) => {
  const { item } = props;
  return (
    <View>
      <Text>
        UrlField Id={item.id} LinkId={item.linkId}
      </Text>
    </View>
  );
};
