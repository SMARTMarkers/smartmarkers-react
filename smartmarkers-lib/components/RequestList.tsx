import React from "react";
import { Spinner, ListItem, Body, Right, Text, Icon } from "native-base";
import { useFhirContext } from "../context";
import { ServiceRequest } from "../requests/ServiceRequest";
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
}

export const RequestList: React.FC<RequestListProps> = (props) => {
  const { renderItem, filter, onItemPress } = props;
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

  const renderStatues = (items: Task[], status: string) => (
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
    const createTaskParams = async (request: ServiceRequest) => {
      const instrument = await request.getInstrument();
      const reports = await instrument?.getReports(request.id);
      return new Task({ request, instrument, reports });
    };
    const loadItems = async () => {
      if (server) {
        const items = await server.getPatientRequests(filter);
        const tasks = await Promise.all(
          items.map((item) => createTaskParams(item))
        );
        setItems(tasks);
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
    statusesItems[TaskScheduleStatus[status]] = items.filter(
      (value) => value.schedule?.status == status
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
