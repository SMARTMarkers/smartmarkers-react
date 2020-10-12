import React from "react";
import { IQuestionnaire } from "../../models";
import { Questionnaire } from "../../instruments/Questionnaire";
import { PromisQuestionnaire } from "../../instruments/PromisQuestionnaire";
import { QuestionnaireItemField } from "../fields";
import { Form as NativeBaseForm, Button, Text, Spinner } from "native-base";
import { FieldsMap } from "../../FieldsMap";
import { FormData } from "../types";
import { validate } from "../validation";
import {
  getActiveQuestions,
  getResponse,
  getAdaptiveResponse,
} from "../fields/utils";
import {
  IQuestionnaireResponse,
  QuestionnaireResponseStatus,
} from "../../models/QuestionnaireResponse";
import { FormMode } from "../Form";
import { IQuestionnaireItem } from "../../models";
import { QuestionsLayout } from "../QuestionsLayout";

export interface WizardFormProps {
  questionnaire: Questionnaire;
  mode: FormMode;
  formData?: FormData;
  id?: string;
  onChange?: (formData: FormData) => void;
  // onError?: Function;
  onSubmit?: (formData: FormData, reponse: IQuestionnaireResponse) => void;
  onFocus?: Function;
  onBlur?: Function;
  questionsLayout?: QuestionsLayout;
  quitWithErrorMessage: (error: string) => void;
}

export type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export const WizardForm: React.FC<WizardFormProps> = (props) => {
  const { questionnaire, mode, quitWithErrorMessage } = props;
  const isAdaptive = mode == FormMode.Adaptive;
  const [formData, setFormData] = React.useState<any>(
    props.formData ? props.formData : {}
  );
  const [step, setStep] = React.useState(0);
  const [errorData, setErrorData] = React.useState<any>({});
  const previousTitle = "Previous";
  const submitTitle = "Submit";
  const nextTitle = "Next";
  const [questions, setQuestions] = React.useState<IQuestionnaireItem[]>(
    isAdaptive ? [] : getActiveQuestions(questionnaire.item, formData)
  );
  const isLast = step == questions.length - 1;
  const isFirst = step == 0;
  const [isReady, setIsReady] = React.useState(isAdaptive ? false : true);
  const [questionnaireResponse, setQuestionnaireResponse] = React.useState<
    IQuestionnaireResponse
  >();

  React.useEffect(() => {
    if (isAdaptive) {
      const loadFirst = async () => {
        const response = await (questionnaire as PromisQuestionnaire).getFirstNextStep();
        if (response && response.contained) {
          const q = response.contained[0] as IQuestionnaire;
          setQuestionnaireResponse(response);
          setQuestions(getActiveQuestions(q.item, formData));
        }
        setIsReady(true);
      };
      loadFirst();
    }
  }, []);

  const onNext = async () => {
    if (isAdaptive) {
      if (questionnaireResponse) {
        setIsReady(false);

        const results = getAdaptiveResponse(questionnaireResponse, formData);

        const response = await (questionnaire as PromisQuestionnaire).getNextStep(
          results
        );

        if (response && response.contained) {
          if (response.status == QuestionnaireResponseStatus.Completed) {
            if (props.onSubmit) {
              props.onSubmit(formData, response);
            }
          } else {
            const q = response.contained[0] as IQuestionnaire;
            setQuestionnaireResponse(response);
            setQuestions(getActiveQuestions(q.item, formData));
          }
        }

        setIsReady(true);
      }
    } else {
      setStep(step + 1);
    }
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

  if (!isReady) {
    return <Spinner />;
  }

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
        questionsLayout={props.questionsLayout}
        quitWithErrorMessage={quitWithErrorMessage}
      />
      {!isFirst && !isAdaptive && (
        <Button onPress={onPrev}>
          <Text>{previousTitle}</Text>
        </Button>
      )}
      {isLast && !isAdaptive ? (
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
