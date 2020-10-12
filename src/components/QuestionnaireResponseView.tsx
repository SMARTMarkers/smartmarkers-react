import React, { useMemo, useCallback } from "react";
import { Text, ListItem, Body, List } from "native-base";
import {
  IQuestionnaireResponseItem,
  IQuestionnaireResponseItemAnswer,
} from "..";
import { QuestionnaireResponse } from "../reports";
import { ScrollView } from "react-native";

export interface QuestionnaireResponseViewProps {
  response: QuestionnaireResponse;
  formatDate?: (date: string) => string;
  formatDateTime?: (date: string) => string;
  formatTime?: (date: string) => string;
}

export interface QuestionWithAnswer {
  question: string;
  answer: string;
}

const defaultFormatDate = (date: string) => new Date(date).toISOString();

export const QuestionnaireResponseView: React.FC<QuestionnaireResponseViewProps> = ({
  response,
  formatDate = defaultFormatDate,
  formatDateTime = defaultFormatDate,
  formatTime = defaultFormatDate,
}) => {
  const parseAnswer = useCallback(
    (
      answer: IQuestionnaireResponseItemAnswer,
      question: string,
      listOfElements: QuestionWithAnswer[]
    ) => {
      if (!answer) return;
      let answerValue: any;
      if (answer.valueBoolean !== undefined)
        answerValue = answer.valueBoolean ? "yes" : "no";
      else if (answer.valueDecimal)
        answerValue = answer.valueDecimal.toString();
      else if (answer.valueInteger)
        answerValue = answer.valueInteger.toString();
      else if (answer.valueDate) answerValue = formatDate(answer.valueDate);
      else if (answer.valueDateTime)
        answerValue = formatDateTime(answer.valueDateTime);
      else if (answer.valueTime) answerValue = formatTime(answer.valueTime);
      else if (answer.valueString) answerValue = answer.valueString;
      else if (answer.valueUri) answerValue = answer.valueUri;
      else if (answer.valueQuantity)
        answerValue = `${answer.valueQuantity.comparator} ${answer.valueQuantity.value} ${answer.valueQuantity.unit}`;
      else if (answer.valueCoding) answerValue = answer.valueCoding.display;
      else if (answer.valueAttachment) answerValue = answer.valueAttachment.url;
      else if (answer.valueReference)
        answerValue = answer.valueReference.display;

      if (question && answerValue)
        listOfElements.push({
          question,
          answer: answerValue,
        });

      if (answer.item)
        answer.item.forEach((item: IQuestionnaireResponseItem) =>
          parseItem(item, listOfElements)
        );
    },
    []
  );

  const parseItem = useCallback(
    (
      item: IQuestionnaireResponseItem,
      listOfElements: QuestionWithAnswer[]
    ) => {
      const question = `- ${item.text}` || "";

      item.answer?.forEach((answer: IQuestionnaireResponseItemAnswer) =>
        parseAnswer(answer, question, listOfElements)
      );
      item.item?.forEach((item: IQuestionnaireResponseItem) => {
        parseItem(item, listOfElements);
      });
    },
    []
  );

  const getList = useCallback((response: QuestionnaireResponse) => {
    const listOfElements: QuestionWithAnswer[] = [];

    response.item?.forEach((item: IQuestionnaireResponseItem) => {
      parseItem(item, listOfElements);
    });

    return listOfElements;
  }, []);

  const getGroups = () => {
    const groupedAnswers: any = {};
    list.forEach((el: QuestionWithAnswer) => {
      const group = groupedAnswers[el.question];
      if (group) {
        groupedAnswers[el.question] = [...group, el.answer];
      } else {
        groupedAnswers[el.question] = [el.answer];
      }
    });
    return groupedAnswers;
  };

  const list = useMemo(() => getList(response), [response]);

  if (!response.item) return null;

  const groups = getGroups();

  return (
    <List>
      <ListItem header>
        <Body>
          <Text>QUESTIONS &amp; ANSWERS</Text>
        </Body>
      </ListItem>
      <ScrollView>
        {Object.keys(groups).map((key: string) => (
          <ListItem key={key}>
            <Body>
              {groups[key].map((answer: string) => (
                <Text key={answer}>{answer}</Text>
              ))}
              <Text note>{key}</Text>
            </Body>
          </ListItem>
        ))}
      </ScrollView>
    </List>
  );
};

export default QuestionnaireResponseView;
