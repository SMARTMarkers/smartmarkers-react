import React, { useState, useEffect } from "react";
import { View, Text } from "native-base";
import { BaseFieldProps } from "./BaseFieldProps";
import { QuestionnaireItemFields } from "./QuestionnaireItemFields";
import { IQuestionnaireItem, IQuestionnaire } from "../../models";
import { setFormValue, getLabel, getFormValue, extractChoices } from "./utils";
import { DropDown, ButtonGroup } from "../inputs";
import { Autocomplete } from "../inputs/Autocomplete";
import { QuestionsLayout } from "../QuestionsLayout";

const DROP_DOWN_CODE = "drop-down";
const AUTOCOMPLETE_CODE = "autocomplete";
const EXTERNALLY_DEFINED_URL =
  "http://hl7.org/fhir/StructureDefinition/questionnaire-externallydefined";

enum ChoiceType {
  DropDown,
  Autocomplete,
  Group,
}

const renderAutocomplete = (
  item: IQuestionnaireItem,
  onChange: (value: any) => void,
  value: any
) => {
  const autocompleteUri = item.extension?.find(
    (v) => v.url && v.url === EXTERNALLY_DEFINED_URL
  );
  const fetcUrl = autocompleteUri?.valueUri || "";
  return <Autocomplete fetchUrl={fetcUrl} onChange={onChange} value={value} />;
};

const calculateChoiceType = (item: IQuestionnaireItem): ChoiceType => {
  if (item.extension) {
    const dropDown = item.extension.find(
      (v) =>
        v.valueCodeableConcept &&
        v.valueCodeableConcept.coding &&
        v.valueCodeableConcept.coding.find((c) => c.code === DROP_DOWN_CODE)
    );
    if (dropDown) {
      return ChoiceType.DropDown;
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
        return ChoiceType.Autocomplete;
      } else {
        return ChoiceType.Group;
      }
    }
  } else {
    return ChoiceType.Group;
  }
};

const renderChoice = async (
  type: ChoiceType,
  item: IQuestionnaireItem,
  onChange: (value: any) => void,
  value: any,
  questionnaire: IQuestionnaire,
  quitWithErrorMessage?: (error: string) => void,
  questionsLayout?: QuestionsLayout
) => {
  if (type === ChoiceType.Autocomplete) {
    return renderAutocomplete(item, onChange, value);
  }

  const choices = await extractChoices(
    item,
    questionnaire,
    quitWithErrorMessage
  );

  if (type === ChoiceType.DropDown) {
    return <DropDown items={choices} onChange={onChange} value={value} />;
  }

  return (
    <ButtonGroup
      questionsLayout={questionsLayout}
      items={choices}
      onChange={onChange}
      value={value}
    />
  );
};

export interface ChoiceFieldProps extends BaseFieldProps {}

export const ChoiceField: React.FC<ChoiceFieldProps> = (props) => {
  const {
    item,
    id,
    questionsLayout,
    questionnaire,
    quitWithErrorMessage,
    ...propsToPass
  } = props;
  const [choices, setChoices] = useState(null);
  const choiceType = calculateChoiceType(item);

  const onChange = (value: any) => {
    const { value: oldValue } = getFormValue(props.formData, item.linkId);
    let newValue: any = null;
    if (!!item.repeats) {
      if (oldValue) {
        const filterArr = oldValue.filter((el: any) => {
          return el !== value;
        });
        if (filterArr.length < oldValue.length) {
          newValue = filterArr;
        } else {
          newValue = [...oldValue, value];
        }
      } else {
        newValue = [value];
      }
    } else {
      newValue = value;
    }

    const newFormData = setFormValue(props.formData, item.linkId, newValue);
    if (props.onChange) {
      props.onChange(newFormData, item.linkId);
    }
  };
  const { value } = getFormValue(props.formData, item.linkId);
  const getElements = async () => {
    const elements: any = await renderChoice(
      choiceType,
      item,
      onChange,
      value,
      questionnaire,
      quitWithErrorMessage,
      questionsLayout
    );
    setChoices(elements);
  };
  useEffect(() => {
    getElements();
  }, [
    choiceType,
    item,
    props.onChange,
    value,
    questionnaire,
    quitWithErrorMessage,
    questionsLayout,
  ]);

  return (
    <View>
      <Text>{getLabel(item)}</Text>
      {choices}
      <QuestionnaireItemFields
        quitWithErrorMessage={quitWithErrorMessage}
        questionnaire={questionnaire}
        questionsLayout={questionsLayout}
        items={item.item}
        {...propsToPass}
      />
    </View>
  );
};
