import React from "react";
import { Questionnaire } from "../instruments/Questionnaire";
import { QuestionnaireField } from "./fields";
import { Form as NativeBaseForm, Button, Text } from "native-base";
import { FieldsMap } from "../FieldsMap";
import { FormData } from "./types";
import { WizardForm } from "./wizard/WizardForm";
import { validate } from "./validation";
import { IQuestionnaireResponse } from "../models/QuestionnaireResponse";
import { getResponse } from "./fields/utils";
import { QuestionsLayout } from "./QuestionsLayout";

export enum FormMode {
  Form,
  Wizard,
  Adaptive,
}

export interface FormProps {
  questionnaire: Questionnaire;
  formData?: FormData;
  id?: string;
  mode?: FormMode;
  onChange?: (formData: FormData) => void;
  // onError?: Function;
  onSubmit?: (formData: FormData, response: IQuestionnaireResponse) => void;
  onFocus?: Function;
  onBlur?: Function;
  questionsLayout?: QuestionsLayout;
  quitWithErrorMessage: (error: string) => void;
  onCancel?: () => void;
}

export type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export const Form: React.FC<FormProps> = (props) => {
  const { questionnaire, quitWithErrorMessage, onCancel } = props;
  const formMode = questionnaire.isAdaptive()
    ? FormMode.Adaptive
    : props.mode
    ? props.mode
    : FormMode.Form;
  const isFormMode = formMode === FormMode.Form;
  const [formData, setFormData] = React.useState<any>(
    props.formData ? props.formData : {}
  );
  const [errorData, setErrorData] = React.useState<any>(
    validate(formData, questionnaire)
  );
  const submitTitle = "Submit";

  const onChange = (formData: FormData, linkId: string) => {
    const errorData = validate(formData, questionnaire);
    setErrorData(errorData);
    setFormData(formData);
    if (props.onChange) {
      props.onChange(formData);
    }
  };
  const onSubmit = (formData: FormData) => {
    if (props.onSubmit) {
      props.onSubmit(formData, getResponse(questionnaire, formData));
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

  const hasNoError =
    Object.keys(errorData).length === 0 && errorData.constructor === Object;
  return (
    <NativeBaseForm testID="nativeBaseForm">
      {isFormMode && (
        <QuestionnaireField
          testID="rootQuestionnaireField"
          fieldsMap={FieldsMap}
          questionnaire={questionnaire}
          formData={formData}
          errorData={errorData}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          quitWithErrorMessage={quitWithErrorMessage}
        />
      )}
      {isFormMode && (
        <Button
          testID="submitButton"
          onPress={onSubmitPress}
          disabled={!hasNoError}
        >
          <Text>{submitTitle}</Text>
        </Button>
      )}
      {!isFormMode && (
        <WizardForm
          questionnaire={props.questionnaire}
          mode={formMode}
          formData={props.formData}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          onSubmit={props.onSubmit}
          quitWithErrorMessage={quitWithErrorMessage}
          onCancel={onCancel}
        />
      )}
    </NativeBaseForm>
  );
};
