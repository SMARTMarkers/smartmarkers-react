import React from "react";
import { BaseFieldProps } from "./BaseFieldProps";
import { QuestionnaireItemFields } from "./QuestionnaireItemFields";
import { QuestionnaireItem } from "../../models";

import { Content, Text } from "native-base";
import { setFormValue, getLabel, getFormValue } from "./utils";
import { RadioGroupItem, RadioGroup } from "../inputs";

export interface ChoiceFieldProps extends BaseFieldProps {}

const renderDropDown = (item: QuestionnaireItem, props: BaseFieldProps) => {};

const renderAutocomplete = (
  item: QuestionnaireItem,
  props: BaseFieldProps
) => {};

const renderRadioGroup = (item: QuestionnaireItem, props: BaseFieldProps) => {
  let choices: RadioGroupItem<any>[] = [
    {
      label: "Yes",
      value: "Y",
    },
    {
      label: "No",
      value: "N",
    },
    {
      label: "Don't know",
      value: "asked-unknown",
    },
  ];

  if (item.answerOption) {
    choices = item.answerOption.map((option) => {
      if (option.valueCoding) {
        return {
          value: option.valueCoding.code,
          label: option.valueCoding.display,
        } as RadioGroupItem<any>;
      } else {
        return { value: "NoOptions", label: "NoOptions" };
      }
    });
  }

  const onChange = (value: any) => {
    const newFormData = setFormValue(props.formData, item.linkId, value);
    if (props.onChange) {
      props.onChange(newFormData, item.linkId);
    }
  };
  const value = getFormValue(props.formData, item.linkId);
  return <RadioGroup items={choices} onChange={onChange} value={value} />;
};

const renderChoice = (item: QuestionnaireItem, props: BaseFieldProps) => {
  if (item.extension) {
    const dropDown = item.extension.find(
      (v) =>
        v.valueCodeableConcept &&
        v.valueCodeableConcept.coding &&
        v.valueCodeableConcept.coding.find((c) => c.code === "drop-down")
    );
    if (dropDown) {
      return renderDropDown(item, props);
    } else {
      const autocomplete = item.extension.find(
        (v) =>
          v.valueCodeableConcept &&
          v.valueCodeableConcept.coding &&
          v.valueCodeableConcept.coding.find((c) => c.code === "autocomplete")
      );
      if (autocomplete) {
        return renderAutocomplete(item, props);
      } else {
        return renderRadioGroup(item, props);
      }
    }
  } else {
    return renderRadioGroup(item, props);
  }
};

export const ChoiceField: React.FC<ChoiceFieldProps> = (props) => {
  const { item, id, ...propsToPass } = props;
  return (
    <Content style={{ flex: 1 }}>
      <Text>{getLabel(item)}</Text>
      {renderChoice(item, props)}
      <QuestionnaireItemFields items={item.item} {...propsToPass} />
    </Content>
  );
};
