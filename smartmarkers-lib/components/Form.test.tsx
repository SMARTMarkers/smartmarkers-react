import React from "react";
import { render } from "react-native-testing-library";

import { Form } from "./Form";
import GeneralData from "../../data/general.json";
import { Questionnaire } from "../models";

describe("<Form />", () => {
  it("has form, rootField and submit button", () => {
    const { getByTestId } = render(
      <Form questionnaire={(GeneralData as any) as Questionnaire} />
    );

    const form = getByTestId("nativeBaseForm");
    expect(form).toBeDefined();
    const field = getByTestId("rootQuestionnaireField");
    expect(field).toBeDefined();
    const button = getByTestId("submitButton");
    expect(button).toBeDefined();
  });
});
