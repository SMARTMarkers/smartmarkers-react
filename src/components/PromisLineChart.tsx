import { View } from "native-base";
import React, { useEffect, useState } from "react";
import { QuestionnaireResponse, Report } from "../reports";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

interface PromisLineChartProps {
  responses: Report[];
}

export const PromisLineChart: React.FC<PromisLineChartProps> = ({
  responses,
}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!responses && !responses!.length) return;
    const data: any = [];
    responses?.forEach((report: Report) => {
      const questionnaireResponse = report as QuestionnaireResponse;
      if (questionnaireResponse.extension) {
        const scores: any = questionnaireResponse.extension.filter(
          (el: any) =>
            el.url ===
            "http://hl7.org/fhir/StructureDefinition/questionnaire-scores"
        );

        if (scores[0]) {
          const theta = scores[0].extension.filter(
            (el: any) =>
              el.url ===
              "http://hl7.org/fhir/StructureDefinition/questionnaire-scores/theta"
          )[0];
          theta && data.push(theta.valueDecimal * 10 + 50);
        }
      }
    });
    data.length && setChartData(data);
  }, [responses]);

  return (
    <View style={{ marginLeft: 15, marginRight: 15, width: "100%" }}>
      {!!chartData.length && (
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                data: chartData,
              },
            ],
          }}
          width={Dimensions.get("window").width - 30} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};
