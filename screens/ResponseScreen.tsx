import React from "react";
import { useParams } from "../react-router";
import { View, Text, Spinner } from "native-base";
import { useFhirContext } from "../smartmarkers-lib";
import { Report, ReportFactory } from "../smartmarkers-lib/reports";

interface RouteParams {
  qrId: string;
}

const ResponseScreen: React.FC<any> = (props) => {
  const { fhirClient } = useFhirContext();
  const { qrId } = useParams<RouteParams>();
  const [isReady, setIsReady] = React.useState(false);
  const [item, setItem] = React.useState<Report | undefined>(undefined);

  React.useEffect(() => {
    const loadItems = async () => {
      if (fhirClient) {
        const item = await fhirClient?.request(
          `QuestionnaireResponse/${qrId}/`,
          {
            pageLimit: 0,
            flat: true,
          }
        );

        const factory = new ReportFactory(fhirClient);
        if (item) {
          setItem(factory.createReport(item));
        }
      }

      setIsReady(true);
    };
    loadItems();
  }, []);

  if (!isReady) {
    return <Spinner />;
  }

  return (
    <View>
      <Text>RESPONSE</Text>
      <Text>{JSON.stringify(item)}</Text>
    </View>
  );
};

export default ResponseScreen;
