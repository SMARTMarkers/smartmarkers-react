import React from "react";
import { Questionnaire, QuestionnaireItemType } from "../../models";
import { QuestionnaireItemFields } from "./QuestionnaireItemFields";
import { Content, Text } from "native-base";
import { EnumDictionary } from "../Form";
import { BaseFieldProps } from "./BaseFieldProps";

export interface QuestionnaireFieldProps {
  id?: string;
  questionnaire: Questionnaire;
  fieldsMap: EnumDictionary<QuestionnaireItemType, React.FC<BaseFieldProps>>;
  formData?: any;
  errorData?: any;
  onChange?: (formData: any, linkId: string) => void;
  onSubmit?: Function;
  onFocus?: Function;
  onBlur?: Function;
}

export const QuestionnaireField: React.FC<QuestionnaireFieldProps> = (
  props
) => {
  const { questionnaire } = props;
  const { id, ...propsToPass } = props;
  return (
    <Content testID={id}>
      {questionnaire.item && (
        <QuestionnaireItemFields
          id={props.id}
          items={questionnaire.item}
          {...propsToPass}
        />
      )}
      {!questionnaire.item && <Text>No items to render</Text>}
    </Content>
  );
};
