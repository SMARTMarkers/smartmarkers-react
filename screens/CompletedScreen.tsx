import React from "react";
import { useHistory } from "../react-router";
import { List, ListItem, Text, Body } from "native-base";
import { useFhirContext } from "../smartmarkers-lib";
import { RequestList } from "../smartmarkers-lib/requests/RequestList";
import {
  ServiceRequest,
  Status,
} from "../smartmarkers-lib/requests/ServiceRequest";

const CompletedScreen: React.FC<any> = () => {
  const { user } = useFhirContext();
  const history = useHistory();

  const onItemPress = async (item: ServiceRequest) => {
    const q = await item.getInstrument();
    history.push(`history/${item.id}/${q?.id}/true`);
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
        statuses={[Status.Completed]}
      />
    </List>
  );
};

export default CompletedScreen;
