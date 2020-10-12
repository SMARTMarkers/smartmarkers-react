import React from "react";
import { Spinner, ListItem, Body, Right, Text, Icon } from "native-base";
import { FlatList, ListRenderItemInfo } from "react-native";

import { useFhirContext } from "../context";
import { Instrument, InstrumentType } from "../instruments/Instrument";

export interface InstrumentListProps {
  type: InstrumentType;
  filter?: string;
  usePromis?: boolean;
  renderItem?: (
    item: Instrument,
    key: any,
    onItemPress: (item: Instrument) => void
  ) => React.ReactNode;
  onItemPress: (item: Instrument) => void;
  patientId?: string;
  selectedArr?: Array<Instrument>;
}

export const InstrumentList: React.FC<InstrumentListProps> = (props) => {
  const {
    type,
    renderItem,
    filter,
    onItemPress,
    usePromis,
    patientId,
    selectedArr,
  } = props;
  const [isReady, setIsReady] = React.useState(false);
  const [items, setItems] = React.useState<Instrument[] | undefined>([]);
  const { server, proimisServer } = useFhirContext();

  const getServer = () => (usePromis ? proimisServer : server);

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
      const items = await getServer()?.getInstruments(type, filter, patientId);
      setItems(items);
      setIsReady(true);
    };
    loadItems();
  }, [patientId]);

  const renderItemFunc = ({ item, index }: ListRenderItemInfo<Instrument>) => {
    const elements: React.ReactElement = render(
      item,
      index,
      onItemPress
    ) as React.ReactElement;
    return elements || null;
  };

  if (!isReady) {
    return <Spinner />;
  }
  return (
    <FlatList
      data={items || []}
      renderItem={renderItemFunc}
      keyExtractor={(item) => item.id}
      extraData={selectedArr}
    />
  );
};
