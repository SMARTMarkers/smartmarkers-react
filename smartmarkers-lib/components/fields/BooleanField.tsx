import React from "react";
import { View, Text } from "native-base";
import { BaseFieldProps } from "./BaseFieldProps";
import { RadioGroup, ButtonGroup } from "../inputs";
import { getLabel, setFormValue, getFormValue } from "./utils";
import { QuestionnaireItemFields } from "./QuestionnaireItemFields";

export interface BooleanFieldProps extends BaseFieldProps {}

export const BooleanField: React.FC<BooleanFieldProps> = (props) => {
  const { item, id, ...propsToPass } = props;
  const choices = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];
  const onChange = (value: any) => {
    const newFormData = setFormValue(props.formData, item.linkId, value);
    if (props.onChange) {
      props.onChange(newFormData, item.linkId);
    }
  };
  const value = getFormValue(props.formData, item.linkId);
  return (
    <View>
      <Text>{getLabel(item)}</Text>
      {/* <RadioGroup items={choices} onChange={onChange} value={value} /> */}
      <ButtonGroup items={choices} onChange={onChange} value={value} />
      <QuestionnaireItemFields items={item.item} {...propsToPass} />
    </View>
  );
};
