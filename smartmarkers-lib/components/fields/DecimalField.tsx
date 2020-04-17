import React from "react";
import { BaseFieldProps } from "./BaseFieldProps";
import { Content, Input, Item, Text } from "native-base";
import { setFormValue, getLabel } from "./utils";
import { QuestionnaireItemFields } from "./QuestionnaireItemFields";

export interface DecimalFieldProps extends BaseFieldProps {}

export const DecimalField: React.FC<DecimalFieldProps> = (props) => {
  const { item, id, ...propsToPass } = props;

  const onChange = (value: any) => {
    const newFormData = setFormValue(props.formData, item.linkId, value);
    if (props.onChange) {
      props.onChange(newFormData, item.linkId);
    }
  };
  const value = props.formData[item.linkId] ? props.formData[item.linkId] : "";
  return (
    <Content>
      <Text>{getLabel(item)}</Text>
      <Item regular>
        <Input value={value} onChangeText={onChange} />
      </Item>
      <QuestionnaireItemFields items={item.item} {...propsToPass} />
    </Content>
  );
};
