import React from "react";
import { useParams, useHistory } from "../react-router";

import { Form, FormMode, FormData, useFhirContext } from "../smartmarkers-lib";
import { View, Spinner } from "native-base";
import { QuestionnaireResponse } from "../smartmarkers-lib/models/QuestionnaireResponse";
import { InstrumentType, Questionnaire } from "../smartmarkers-lib/instruments";

interface RouteParams {
  rid: string;
  id: string;
}

const QuestionnaireScreen: React.FC<any> = (props) => {
  const { rid, id } = useParams<RouteParams>();
  const history = useHistory();
  const { getInstrument, createReport } = useFhirContext();
  const [isReady, setIsReady] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [response, setResponse] = React.useState<
    QuestionnaireResponse | undefined
  >(undefined);

  const [item, setItem] = React.useState<Questionnaire | undefined>(undefined);

  const onSubmit = async (
    formData: FormData,
    response: QuestionnaireResponse
  ) => {
    console.log({ formData, response });
    setIsSubmitting(true);
    response.basedOn = [
      {
        reference: `ServiceRequest/${rid}`,
      },
    ];
    setResponse(response);

    const res = await createReport(response);
    console.log({ res });
    history.push(`/dashboard`);
  };

  React.useEffect(() => {
    if (!isReady) {
      const loadItem = async () => {
        const item = await getInstrument<QuestionnaireResponse>(
          InstrumentType.Questionnaire,
          id
        );
        setItem(item as Questionnaire);
        setIsReady(true);
      };
      loadItem();
    }
  }, []);

  if (!isReady || isSubmitting) {
    return <Spinner />;
  }

  return (
    <View>
      {item && (
        <Form questionnaire={item} mode={FormMode.Wizard} onSubmit={onSubmit} />
      )}
    </View>
  );
};

export default QuestionnaireScreen;
