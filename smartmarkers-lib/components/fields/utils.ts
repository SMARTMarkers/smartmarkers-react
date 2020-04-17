import {
  QuestionnaireItemRule,
  QuestionnaireItemOperator,
  QuestionnaireItem,
} from "../../models";

const compareValues = (
  operator: QuestionnaireItemOperator,
  value: any,
  expectedValue: any
) => {
  console.log({ operator, value, expectedValue });
  if (value === undefined) return false;
  switch (operator) {
    case QuestionnaireItemOperator.Equals:
      return value === expectedValue;
    case QuestionnaireItemOperator.GreaterOrEquals:
      return value >= expectedValue;
    case QuestionnaireItemOperator.GreaterThan:
      return value > expectedValue;
    case QuestionnaireItemOperator.LessOrEquals:
      return value <= expectedValue;
    case QuestionnaireItemOperator.LessThan:
      return value < expectedValue;
    case QuestionnaireItemOperator.NotEquals:
      return value != expectedValue;
    case QuestionnaireItemOperator.Exists:
      return value in expectedValue; // Todo: verify this comparison
    default:
      return false;
  }
};

const getExpectedRuleValue = (rule: QuestionnaireItemRule) => {
  if (rule.answerCoding) {
    return rule.answerCoding.code;
  } else if (rule.hasOwnProperty("answerBoolean")) {
    return rule.answerBoolean;
  } else if (rule.answerDecimal) {
    return rule.answerDecimal;
  } else if (rule.answerInteger) {
    return rule.answerInteger;
  } else if (rule.answerQuantity) {
    return rule.answerQuantity;
  } else if (rule.answerString) {
    return rule.answerString;
  }
  console.warn({ rule });
};

const checkRule = (rule: QuestionnaireItemRule, formData: any) => {
  console.log({ formData, question: rule.question });
  const value = getFormValue(formData, rule.question);
  const expectedValue = getExpectedRuleValue(rule);
  return compareValues(rule.operator, value, expectedValue);
};

export const checkEnableRules = (
  rules: QuestionnaireItemRule[] | undefined,
  formData: any
): boolean => {
  let enabled = true;

  if (rules && rules.length > 0) {
    enabled = false;
    for (const rule of rules) {
      enabled = checkRule(rule, formData);
      console.log({ enabled, rule, formData });
      if (enabled) break;
    }
  }

  return enabled;
};

export const getFormValue = (formData: any, linkId: string) => {
  if (!formData) return undefined;
  return formData[`${linkId}`];
};

export const setFormValue = (formData: any, linkId: string, newValue: any) => {
  if (formData) return { ...formData, [`${linkId}`]: newValue };
  return { [`${linkId}`]: newValue };
};

export const getLabel = (item: QuestionnaireItem) => {
  if (item.text) return item.text;
  if (item.code && item.code.length > 0) {
    let label = "";
    item.code.forEach((code) => {
      if (code.display) {
        if (label) label += ", ";
        label += code.display;
      } else if (code.code) {
        if (label) label += ", ";
        label += code.code;
      }
    });
    if (label) return label;
  }

  if (item.linkId) return item.linkId;
};
