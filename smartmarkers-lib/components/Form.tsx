import React from "react";
import { Questionnaire } from "../models";
import { QuestionnaireField } from "./fields";
import { Form as NativeBaseForm, Button, Text } from "native-base";
import { FieldsMap } from "../FieldsMap";
import { FormData } from "./types";

export interface FormProps {
  questionnaire: Questionnaire;
  formData?: FormData;
  id?: string;
  onChange?: (formData: FormData) => void;
  // onError?: Function;
  onSubmit?: (formData: FormData) => void;
  onFocus?: Function;
  onBlur?: Function;
  children?: React.ReactChild;
}

export type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export const Form: React.FC<FormProps> = (props) => {
  const { children, questionnaire } = props;
  const [formData, setFormData] = React.useState<any>(
    props.formData ? props.formData : {}
  );
  const [errorData, setErrorData] = React.useState<any>({});
  const submitTitle = "Submit";

  const validate = (formData: FormData) => {
    return {};
  };

  const onChange = (formData: FormData, linkId: string) => {
    const errorData = validate(formData);
    setFormData(formData);
    if (props.onChange) {
      props.onChange(formData);
    }
  };
  const onSubmit = (formData: FormData) => {
    if (props.onSubmit) {
      props.onSubmit(formData);
    }
  };
  const onBlur = (...args: any[]) => {
    if (props.onBlur) {
      props.onBlur(...args);
    }
  };

  const onFocus = (...args: any[]) => {
    if (props.onFocus) {
      props.onFocus(...args);
    }
  };

  const onSubmitPress = () => {
    onSubmit(formData);
  };

  return (
    <NativeBaseForm testID="nativeBaseForm">
      <QuestionnaireField
        testID="rootQuestionnaireField"
        fieldsMap={FieldsMap}
        questionnaire={questionnaire}
        formData={formData}
        errorData={errorData}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {children ? (
        children
      ) : (
        <Button testID="submitButton" onPress={onSubmitPress}>
          <Text>{submitTitle}</Text>
        </Button>
      )}
    </NativeBaseForm>
  );
};
