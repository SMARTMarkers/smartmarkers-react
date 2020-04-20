import React from "react";
import {
  QuestionnaireItem,
  Questionnaire,
  QuestionnaireItemType,
} from "../../models";
import { QuestionnaireItemField } from "./QuestionnaireItemField";
import { View } from "native-base";
import { EnumDictionary } from "../Form";
import { BaseFieldProps } from "./BaseFieldProps";

export interface QuestionnaireItemFieldsProps {
  id?: string;
  testID?: string;
  questionnaire: Questionnaire;
  items: QuestionnaireItem[];
  fieldsMap: EnumDictionary<QuestionnaireItemType, React.FC<BaseFieldProps>>;
  formData?: any;
  errorData?: any;
  onChange?: (formData: any, linkId: string) => void;
  onSubmit?: Function;
  onFocus?: Function;
  onBlur?: Function;
}

export const QuestionnaireItemFields: React.FC<QuestionnaireItemFieldsProps> = (
  props
) => {
  const { id, testID, items, ...propsToPass } = props;
  return (
    <View testID={testID} style={{ flex: 1 }}>
      {items &&
        items.length > 0 &&
        items.map((q, index) => {
          return (
            <QuestionnaireItemField
              key={index}
              id={q.linkId}
              item={q}
              {...propsToPass}
            />
          );
        })}
    </View>
  );
};
