import React from "react";
import { Spinner, ListItem, Body, Right, Text, Icon } from "native-base";
import { useFhirContext } from "../context";
import { Instrument, InstrumentType } from "./Instrument";

export interface InstrumentListProps {
  type: InstrumentType;
  filter?: string;
  renderItem?: (
    item: Instrument,
    key: any,
    onItemPress: (item: Instrument) => void
  ) => React.ReactNode;
  onItemPress: (item: Instrument) => void;
}

export const InstrumentList: React.FC<InstrumentListProps> = (props) => {
  const { type, renderItem, filter, onItemPress } = props;
  const [isReady, setIsReady] = React.useState(false);
  const [items, setItems] = React.useState<Instrument[] | undefined>([]);
  const { server } = useFhirContext();

  const defaultRenderItem = (
    item: Instrument,
    key: any,
    onItemPress: (item: Instrument) => void
  ) => (
    <ListItem key={key} onPress={() => onItemPress(item)}>
      <Body>
        <Text>{item.getTitle()}</Text>
        <Text note>{item.getNote()}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-forward" />
      </Right>
    </ListItem>
  );
  const render = renderItem ? renderItem : defaultRenderItem;

  React.useEffect(() => {
    const loadItems = async () => {
      const items = await server?.getInstruments(type, filter);
      setItems(items);
      setIsReady(true);
    };
    loadItems();
  }, []);

  if (!isReady) {
    return <Spinner />;
  }
  return <>{items?.map((item, index) => render(item, index, onItemPress))}</>;
};
