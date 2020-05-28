import React from "react";
import { Spinner, List, ListItem, Body, Right, Text, Icon } from "native-base";
import { useFhirContext } from "../context";
import { Resource } from "../models";

export enum InstrumentType {
  ValueSet,
  Questionnaire,
  ServiceRequest, // Not Instrument
}

export enum RequestType {
  ServiseRequest,
}

export enum ReportType {
  QuestionnaireResponse,
  Observation,
}

export interface InstrumentListProps {
  type: InstrumentType;
  filter?: string;
  renderItem?: (item: Instrument, key: any) => React.ReactNode;
}

export interface Instrument extends Resource {
  id?: string;
  code?: { text: string };
  extension?: { valueReference?: { reference: string } }[];
  modifierExtension?: { valueReference?: { reference: string } }[];
}

export const InstrumentList: React.FC<InstrumentListProps> = (props) => {
  const { type, renderItem, filter } = props;
  const typeStr = InstrumentType[type];
  const [isReady, setIsReady] = React.useState(false);
  const [items, setItems] = React.useState<Instrument[] | undefined>([]);
  const { fhirClient } = useFhirContext();

  const defaultRenderItem = (item: Instrument, key: any) => (
    <ListItem key={key}>
      <Body>
        <Text>
          {item?.id} {item?.code?.text}
        </Text>
        <Text note>
          {item.resourceType}{" "}
          {item.modifierExtension
            ? item.modifierExtension[0].valueReference?.reference
            : ""}
          {item.extension ? item.extension[0].valueReference?.reference : ""}
        </Text>
      </Body>
      <Right>
        <Icon active name="arrow-forward" />
      </Right>
    </ListItem>
  );
  const render = renderItem ? renderItem : defaultRenderItem;

  React.useEffect(() => {
    const loadInstruments = async () => {
      const instruments = await fhirClient?.patient.request(
        filter ? `${typeStr}?${filter}` : typeStr,
        {
          pageLimit: 0,
          flat: true,
        }
      );
      setItems(instruments as Instrument[]);
      setIsReady(true);
    };
    loadInstruments();
  }, []);

  if (!isReady) {
    return <Spinner />;
  }
  return <>{items?.map((item, index) => render(item, index))}</>;
};
