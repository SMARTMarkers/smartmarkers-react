import React from "react";
import { useParams } from "../react-router";
import { View, Text, Spinner } from "native-base";
import { useFhirContext } from "../smartmarkers-lib";
import { Report, ReportFactory } from "../smartmarkers-lib/reports";

interface RouteParams {
  qrId: string;
}

const ResponseScreen: React.FC<any> = (props) => {
  const { server } = useFhirContext();
  const { qrId } = useParams<RouteParams>();
  const [isReady, setIsReady] = React.useState(false);
  const [item, setItem] = React.useState<Report | undefined>(undefined);

  React.useEffect(() => {
    const loadItems = async () => {
      if (server) {
        const item = (await server.getQuestionnaireResponseById(
          qrId
        )) as Report;
        if (item) {
          setItem(item);
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
      <Text>{item?.getSummary()}</Text>
    </View>
  );
};

export default ResponseScreen;
