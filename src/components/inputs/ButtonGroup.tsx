import React from "react";
import { Text, Button, Segment, Icon, View } from "native-base";
import { GroupItem } from "./GroupItem";
import { QuestionsLayout } from "../QuestionsLayout";

export interface ButtonGroupProps<T> {
  items: GroupItem<T>[];
  value?: T;
  error?: string;
  onChange?: (value: T) => void;
  questionsLayout?: QuestionsLayout;
}

export const ButtonGroup: React.FC<ButtonGroupProps<any>> = (props) => {
  const {
    items,
    value,
    onChange,
    error,
    questionsLayout = QuestionsLayout.Vertical,
  } = props;
  const hasError = !!error;
  const onPress = (value: any) => () => {
    if (onChange) {
      onChange(value);
    }
  };

  const segmentStyle: any = {
    backgroundColor: "transparent",
  };

  const buttonStyle: any = {};

  if (questionsLayout === QuestionsLayout.Vertical) {
    segmentStyle.flexDirection = "column";
    segmentStyle.height = "auto";
    segmentStyle.alignItems = "center";
    segmentStyle.alignSelf = "center";
    // segmentStyle.width = "max-content";
    buttonStyle.marginBottom = 5;
    // buttonStyle.width = "100%";
    buttonStyle.alignSelf = "stretch";
    buttonStyle.height = "auto";
    buttonStyle.display = "flex";
    buttonStyle.justifyContent = "center";
  }

  return (
    <View style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Segment style={segmentStyle}>
        {items.map((item, index) => {
          let active = false;
          if (value && !!value.length) {
            active = value.includes(item.value);
          } else {
            if (item.value && value && item.value.display === value.display) {
              active = item.value.display === value.display;
            } else {
              active = item.value == value;
            }
          }
          return (
            <Button
              light
              key={index}
              first={index === 0}
              active={active}
              last={index === items.length - 1}
              onPress={onPress(item.value)}
              style={buttonStyle}
            >
              <Text>{item.label}</Text>
            </Button>
          );
        })}
        {hasError && <Icon name="close-circle" />}
      </Segment>
    </View>
  );
};
