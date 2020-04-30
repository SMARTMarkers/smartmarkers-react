import React from "react";
import { Questionnaire } from "../../models";
import { QuestionnaireItemField } from "../fields";
import { Form as NativeBaseForm, Button, Text } from "native-base";
import { FieldsMap } from "../../FieldsMap";
import { FormData } from "../types";
import { validate } from "../validation";
import { getActiveQuestions } from "../fields/utils";

export interface WizardFormProps {
  questionnaire: Questionnaire;
  formData?: FormData;
  id?: string;
  onChange?: (formData: FormData) => void;
  // onError?: Function;
  onSubmit?: (formData: FormData) => void;
  onFocus?: Function;
  onBlur?: Function;
}

export type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export const WizardForm: React.FC<WizardFormProps> = (props) => {
  const { questionnaire } = props;
  const [formData, setFormData] = React.useState<any>(
    props.formData ? props.formData : {}
  );
  const [step, setStep] = React.useState(0);
  const [errorData, setErrorData] = React.useState<any>({});
  const previousTitle = "Previous";
  const submitTitle = "Submit";
  const nextTitle = "Next";
  const questions = getActiveQuestions(questionnaire.item, formData);
  const isLast = step == questions.length - 1;
  const isFirst = step == 0;

  const onNext = () => {
    setStep(step + 1);
  };

  const onPrev = () => {
    setStep(step - 1);
  };

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
      <QuestionnaireItemField
        id="wizzardQuestionnaireItemField"
        questionnaire={questionnaire}
        item={questions[step]}
        fieldsMap={FieldsMap}
        formData={formData}
        errorData={errorData}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onSubmit={onSubmit}
      />
      {!isFirst && (
        <Button onPress={onPrev}>
          <Text>{previousTitle}</Text>
        </Button>
      )}
      {isLast ? (
        <Button onPress={onSubmitPress}>
          <Text>{submitTitle}</Text>
        </Button>
      ) : (
        <Button onPress={onNext}>
          <Text>{nextTitle}</Text>
        </Button>
      )}
    </NativeBaseForm>
  );
};
