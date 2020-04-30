import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireItemType,
} from "../models";
import { FormData } from "./types";
import { checkEnableRules } from "./fields/utils";

export const validate = (formData: FormData, questionnaire: Questionnaire) => {
  const result = iterateQuestions(
    formData,
    questionnaire.item ? questionnaire.item : []
  );
  return result;
};

const iterateQuestions = (formData: FormData, items: QuestionnaireItem[]) => {
  let result: any = {};
  items.forEach((questionnaireItem) => {
    if (checkEnableRules(questionnaireItem.enableWhen, formData)) {
      const error = validateItem(formData, questionnaireItem);
      if (error) {
        result[questionnaireItem.linkId] = error;
      }
      if (questionnaireItem.item) {
        const subResults = iterateQuestions(formData, questionnaireItem.item);
        result = { ...result, ...subResults };
      }
    }
  });
  return result;
};

const validateItem = (formData: FormData, item: QuestionnaireItem) => {
  if (item.required && !formData[item.linkId]) {
    return "Field requred";
  }

  return "";
};
