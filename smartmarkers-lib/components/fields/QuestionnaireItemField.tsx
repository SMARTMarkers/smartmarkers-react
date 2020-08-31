import React from "react";
import { BaseFieldProps } from "./BaseFieldProps";
import { QuestionnaireItem, QuestionnaireItemType } from "../../models";
import { UnsupportedField } from "./UnsupportedField";
import { checkEnableRules } from "./utils";
import { EnumDictionary, QuestionsLayout } from "../Form";

export interface QuestionnaireItemFieldProps extends BaseFieldProps { }

const getFieldComponent = (
  itemType: QuestionnaireItemType,
  fieldsMap: EnumDictionary<QuestionnaireItemType, React.FC<BaseFieldProps>>
): React.FC<BaseFieldProps> => {
  const FieldComponent = fieldsMap[itemType];
  if (!FieldComponent) {
    return UnsupportedField;
  }
  return FieldComponent;
};

const renderQuestionItem = (
  item: QuestionnaireItem,
  parentProps: BaseFieldProps
) => {
  if (!checkEnableRules(item.enableWhen, parentProps.formData)) {
    return null;
  }

  const FieldComponent = getFieldComponent(item.type, parentProps.fieldsMap);
  return <FieldComponent {...parentProps} />;
};

export const QuestionnaireItemField: React.FC<QuestionnaireItemFieldProps> = (
  props
) => {
  const { item } = props;
  return renderQuestionItem(item, props);
};
