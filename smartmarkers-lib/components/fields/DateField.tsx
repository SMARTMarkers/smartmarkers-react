import React from "react";
import { BaseFieldProps } from "./BaseFieldProps";
import { View, Text } from "native-base";
import { setFormValue, getLabel, getFormValue } from "./utils";
import { QuestionnaireItemFields } from "./QuestionnaireItemFields";
import { DateTime } from "../inputs/DateTime";

export interface DateFieldProps extends BaseFieldProps {}

export const DateField: React.FC<DateFieldProps> = (props) => {
  const { item, id, ...propsToPass } = props;

  const onChange = (value: any) => {
    const newFormData = setFormValue(props.formData, item.linkId, value);
    if (props.onChange) {
      props.onChange(newFormData, item.linkId);
    }
  };
  const { value } = getFormValue(props.formData, item.linkId);
  return (
    <View>
      <Text>{getLabel(item)}</Text>
      <DateTime mode="date" value={value} onChange={onChange} />
      <QuestionnaireItemFields items={item.item} {...propsToPass} />
    </View>
  );
};
