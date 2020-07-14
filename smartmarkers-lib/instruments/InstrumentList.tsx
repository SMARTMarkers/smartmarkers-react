import React from "react";
import { Spinner, ListItem, Body, Right, Text, Icon } from "native-base";
import { useFhirContext } from "../context";
import { Instrument, InstrumentType } from "./Instrument";
import { Report } from "../reports";

export interface InstrumentListProps<T extends Report> {
  type: InstrumentType;
  filter?: string;
  renderItem?: (
    item: Instrument<T>,
    key: any,
    onItemPress: (item: Instrument<T>) => void
  ) => React.ReactNode;
  onItemPress: (item: Instrument<T>) => void;
}

export const InstrumentList: React.FC<InstrumentListProps<any>> = (props) => {
  const { type, renderItem, filter, onItemPress } = props;
  const [isReady, setIsReady] = React.useState(false);
  const [items, setItems] = React.useState<Instrument<any>[] | undefined>([]);
  const { getInstruments } = useFhirContext();

  const defaultRenderItem = (
    item: Instrument<any>,
    key: any,
    onItemPress: (item: Instrument<any>) => void
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
      const items = await getInstruments<any>(type, filter);
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
