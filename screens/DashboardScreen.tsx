import React, { useReducer } from "react";
import { useHistory } from "../react-router";
import { List, ListItem, Text, Body } from "native-base";
import { useFhirContext } from "../smartmarkers-lib";
import { RequestList } from "../smartmarkers-lib/requests/RequestList";
import {
  ServiceRequest,
  Status,
} from "../smartmarkers-lib/requests/ServiceRequest";

const DashboardScreen: React.FC<any> = () => {
  const { user } = useFhirContext();
  const history = useHistory();

  const onItemPress = async (item: ServiceRequest) => {
    const q = await item.getInstrument();
    history.push(`history/${item.id}/${q?.id}/false`);
  };

  return (
    <List>
      <ListItem noIndent>
        <Body>
          <Text>Hello, {user?.name}</Text>
        </Body>
      </ListItem>
      <RequestList
        onItemPress={onItemPress}
        filter={"status=active"}
        statuses={[Status.Due, Status.Overdue, Status.Upcoming]}
      />
    </List>
  );
};

export default DashboardScreen;
