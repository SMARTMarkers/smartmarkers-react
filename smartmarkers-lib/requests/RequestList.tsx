import React from "react";
import { Spinner, ListItem, Body, Right, Text, Icon } from "native-base";
import { useFhirContext } from "../context";
import { ServiceRequest, Status } from "./ServiceRequest";

export interface RequestListProps {
  filter?: string;
  statuses: Status[];
  renderItem?: (
    item: ServiceRequest,
    key: any,
    onItemPress: (item: ServiceRequest) => void,
    isLast: boolean
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
    onItemPress: (item: ServiceRequest) => void,
    isLast: boolean
  ) => (
    <ListItem key={key} onPress={() => onItemPress(item)} last={isLast}>
      <Body>
        <Text>{item.getTitle()}</Text>
        <Text note>
          {item.getNote()} {Status[item.getStatus()]}
        </Text>
      </Body>
      <Right>
        <Icon active name="arrow-forward" />
      </Right>
    </ListItem>
  );
  const render = renderItem ? renderItem : defaultRenderItem;

  const renderStatues = (items: ServiceRequest[], status: string) => (
    <>
      <ListItem itemHeader>
        <Text>{status.toUpperCase()}</Text>
      </ListItem>
      {items.map((item, index) =>
        render(item, index, onItemPress, index == items.length - 1)
      )}
    </>
  );

  React.useEffect(() => {
    const loadItems = async () => {
      if (getPatientRequests) {
        const items = await getPatientRequests(filter);
        //.sort((a, b) => a.getStatus() - b.getStatus())
        setItems(items);
      }
      setIsReady(true);
    };
    loadItems();
  }, []);

  if (!isReady) {
    return <Spinner />;
  }

  const statusesItems: any = {};
  for (let status of props.statuses) {
    statusesItems[Status[status]] = items.filter(
      (value) => value.getStatus() == status
    );
  }

  return (
    <>
      {Object.keys(statusesItems).map(
        (key: string) =>
          statusesItems[key] &&
          statusesItems[key].length > 0 &&
          renderStatues(statusesItems[key], key)
      )}
    </>
  );
};
