import React from "react";
import { Spinner, ListItem, Body, Right, Text, Icon } from "native-base";
import { useFhirContext } from "../context";
import { ServiceRequest } from "./ServiceRequest";

export interface RequestListProps {
  filter?: string;
  renderItem?: (
    item: ServiceRequest,
    key: any,
    onItemPress: (item: ServiceRequest) => void
  ) => React.ReactNode;
  onItemPress: (item: ServiceRequest) => void;
}

export const RequestList: React.FC<RequestListProps> = (props) => {
  const { renderItem, filter, onItemPress } = props;
  const [isReady, setIsReady] = React.useState(false);
  const [items, setItems] = React.useState<ServiceRequest[]>([]);
  const { getPatientRequests } = useFhirContext();

  const defaultRenderItem = (
    item: ServiceRequest,
    key: any,
    onItemPress: (item: ServiceRequest) => void
  ) => (
    <ListItem key={key} onPress={() => onItemPress(item)}>
      <Body>
        <Text>{item.getTitle()}</Text>
        <Text note>
          {item.getNote()} Reports: {item.getReportsCount()}
        </Text>
      </Body>
      <Right>
        <Icon active name="arrow-forward" />
      </Right>
    </ListItem>
  );
  const render = renderItem ? renderItem : defaultRenderItem;

  React.useEffect(() => {
    const loadItems = async () => {
      if (getPatientRequests) {
        const items = await getPatientRequests(filter);
        setItems(items);
      }
      setIsReady(true);
    };
    loadItems();
  }, []);

  if (!isReady) {
    return <Spinner />;
  }
  return <>{items?.map((item, index) => render(item, index, onItemPress))}</>;
};
