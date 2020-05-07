import React from "react";
import { useParams } from "../react-router";
import { ExampleType, ExampleMap } from "../example";

import { Form, FormData } from "../smartmarkers-lib";
import { QuestionnaireResponse } from "../smartmarkers-lib/models/QuestionnaireResponse";

interface RouteParams {
  example: string;
}

const SurveyScreen: React.FC<any> = (props) => {
  const { example } = useParams<RouteParams>();
  // const index = Object.values<string>(ExampleType).indexOf(example);
  // const name = index > -1 ? Object.keys(ExampleType)[index] : "Unknown";
  const questionnaireData = ExampleMap[example as ExampleType];
  const onSubmit = (formData: FormData, response: QuestionnaireResponse) => {
    console.log({ formData, response });
    alert(JSON.stringify(response));
  };
  return <Form questionnaire={questionnaireData} onSubmit={onSubmit} />;
};

export default SurveyScreen;
