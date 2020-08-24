import React from 'react';
import { View, Text } from "native-base";
import { QuestionnaireResponseItem, QuestionnaireResponseItemAnswer } from '../smartmarkers-lib';
import { QuestionnaireResponse } from '../smartmarkers-lib/reports';

interface Props {
  response: QuestionnaireResponse;
}

const renderAnswer = (answer: QuestionnaireResponseItemAnswer) => {
  if (!answer) return null;
  let answerValue = null;
  if (answer.valueBoolean !== undefined) answerValue = answer.valueBoolean ? 'yes' : 'no';
  if (answer.valueDecimal) answerValue = answer.valueDecimal;
  if (answer.valueInteger) answerValue = answer.valueInteger;
  if (answer.valueDate) answerValue = answer.valueDate; // TODO: moment
  if (answer.valueDateTime) answerValue = answer.valueDateTime; // TODO: moment
  if (answer.valueTime) answerValue = answer.valueTime; // TODO: moment
  if (answer.valueString) answerValue = answer.valueString;
  if (answer.valueUri) answerValue = answer.valueUri;
  if (answer.valueQuantity)
    answerValue = `${answer.valueQuantity.comparator} ${answer.valueQuantity.value} ${answer.valueQuantity.unit}`;
  if (answer.valueCoding) answerValue = answer.valueCoding.display;
  let answerItems = null;
  if (answer.item) answerItems = answer.item.map((item: QuestionnaireResponseItem) => renderItem(item));
  return (
    <View>
      <Text>{answerValue}</Text>
      <View>{answerItems}</View>
    </View>
  );
};

const renderAnswerArr = (answersArr?: Array<QuestionnaireResponseItemAnswer>) => {
  if (!answersArr) return null;
  return answersArr.map((answer: QuestionnaireResponseItemAnswer) => renderAnswer(answer));
};

const renderItem = (item: QuestionnaireResponseItem) => {
  const text = item.text || '';
  const answerArr = renderAnswerArr(item.answer);
  return (
    <View key={item.linkId}>
      {!!text && <Text>{text}</Text>}
      {!!answerArr && <Text>{answerArr}</Text>}
      {item.item && item.item.map((item: QuestionnaireResponseItem) => renderItem(item))}
    </View>
  )
};

const QuestionnaireResponseViewer: React.FC<Props> = ({ response }) => {
  if (!response.item) return null;

  const res = response.item.map((item: QuestionnaireResponseItem) => {
    return renderItem(item);
  });

  return (
    <View>
      {res}
    </View>
  )
};

export default QuestionnaireResponseViewer;