import React from "react";
import { Spinner, ListItem, Body, Right, Text, Icon } from "native-base";
import { useFhirContext } from "../context";
import { Task, TaskScheduleStatus } from "../models/internal";

export interface RequestListProps {
  filter?: string;
  statuses: TaskScheduleStatus[];
  renderItem?: (
    item: Task,
    key: any,
    onItemPress: (item: Task) => void,
    isLast: boolean
  ) => React.ReactNode;
  onItemPress: (item: Task) => void;
  patientId?: string;
}

export const RequestList: React.FC<RequestListProps> = (props) => {
  const { renderItem, filter, onItemPress, patientId } = props;
  const [isReady, setIsReady] = React.useState(false);
  const [items, setItems] = React.useState<Task[]>([]);
  const { server } = useFhirContext();

  const defaultRenderItem = (
    item: Task,
    key: any,
    onItemPress: (item: Task) => void,
    isLast: boolean
  ) => (
    <ListItem key={key} onPress={() => onItemPress(item)} last={isLast}>
      <Body>
        <Text>{item.getTitle()}</Text>
        <Text note>
          {item.getNote()}{" "}
          {item.schedule ? TaskScheduleStatus[item.schedule?.status] : ""}
        </Text>
      </Body>
      <Right>
        <Icon active name="arrow-forward" />
      </Right>
    </ListItem>
  );
  const render = renderItem ? renderItem : defaultRenderItem;

  const renderStatues = (items: Task[], status: string, index: number) => (
    <>
      <ListItem key={index} itemHeader>
        <Text>{status.toUpperCase()}</Text>
      </ListItem>
      {items.map((item, index) =>
        render(item, index, onItemPress, index == items.length - 1)
      )}
    </>
  );

  React.useEffect(() => {
    setIsReady(false);
    const loadItems = async () => {
      if (server) {
        const tasks = (await server.getPatientTasksByRequests(
          filter,
          patientId
        )) as Task[];
        setItems(tasks);
      }
      setIsReady(true);
    };
    loadItems();
  }, [patientId, filter]);

  if (!isReady) {
    return <Spinner />;
  }

  const statusesItems: any = {};
  for (let status of props.statuses) {
    statusesItems[TaskScheduleStatus[status]] = items.filter(
      (value) => value.schedule?.status == status
    );
  }

  return (
    <>
      {Object.keys(statusesItems).map(
        (key: string, index) =>
          statusesItems[key] &&
          statusesItems[key].length > 0 &&
          renderStatues(statusesItems[key], key, index)
      )}
    </>
  );
};
