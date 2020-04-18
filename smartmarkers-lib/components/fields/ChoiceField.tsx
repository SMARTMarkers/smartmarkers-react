import React from "react";
import { View, Text } from "native-base";
import { BaseFieldProps } from "./BaseFieldProps";
import { QuestionnaireItemFields } from "./QuestionnaireItemFields";
import { QuestionnaireItem } from "../../models";
import { setFormValue, getLabel, getFormValue, extractChoices } from "./utils";
import { RadioGroup, DropDown, ButtonGroup } from "../inputs";

const DROP_DOWN_CODE = "drop-down";
const AUTOCOMPLETE_CODE = "autocomplete";
const EXTERNALLY_DEFINED_URL =
  "http://hl7.org/fhir/StructureDefinition/questionnaire-externallydefined";

export interface ChoiceFieldProps extends BaseFieldProps {}

const renderAutocomplete = (
  item: QuestionnaireItem,
  onChange: (value: any) => void,
  value: any
) => {
  const autocompleteUri = item.extension.find(
    (v) => v.url && v.url === EXTERNALLY_DEFINED_URL
  );

  return <Text>autocomplete {item.linkId}</Text>;
};

const renderChoice = (
  item: QuestionnaireItem,
  onChange: (value: any) => void,
  value: any
) => {
  const choices = extractChoices(item);
  if (item.extension) {
    const dropDown = item.extension.find(
      (v) =>
        v.valueCodeableConcept &&
        v.valueCodeableConcept.coding &&
        v.valueCodeableConcept.coding.find((c) => c.code === DROP_DOWN_CODE)
    );
    if (dropDown) {
      return <DropDown items={choices} onChange={onChange} value={value} />;
    } else {
      const autocomplete = item.extension.find(
        (v) =>
          v.valueCodeableConcept &&
          v.valueCodeableConcept.coding &&
          v.valueCodeableConcept.coding.find(
            (c) => c.code === AUTOCOMPLETE_CODE
          )
      );
      if (autocomplete) {
        return renderAutocomplete(item, onChange, value);
      } else {
        return (
          <ButtonGroup items={choices} onChange={onChange} value={value} />
        );
        // return <RadioGroup items={choices} onChange={onChange} value={value} />;
      }
    }
  } else {
    return <ButtonGroup items={choices} onChange={onChange} value={value} />;
    // return <RadioGroup items={choices} onChange={onChange} value={value} />;
  }
};

export const ChoiceField: React.FC<ChoiceFieldProps> = (props) => {
  const { item, id, ...propsToPass } = props;
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
      {renderChoice(item, onChange, value)}
      <QuestionnaireItemFields items={item.item} {...propsToPass} />
    </View>
  );
};
