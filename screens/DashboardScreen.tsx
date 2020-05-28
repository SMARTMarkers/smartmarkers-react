import React from "react";
import { List, ListItem, Text, Body, Right, Icon } from "native-base";
import { useFhirContext } from "../smartmarkers-lib";
import {
  InstrumentList,
  InstrumentType,
} from "../smartmarkers-lib/instruments/InstrumentList";

const DashboardScreen: React.FC<any> = () => {
  const { user } = useFhirContext();

  return (
    <List>
      <ListItem noIndent>
        <Body>
          <Text>Hello, {user?.name}</Text>
          <Text note>You have a 3 surveys they will expire today</Text>
        </Body>
      </ListItem>
      {/*<InstrumentList type={InstrumentType.Questionnaire} />
      <InstrumentList
        type={InstrumentType.ServiceRequest}
        filter={"status=active"}
      /> */}
      <InstrumentList
        type={InstrumentType.ServiceRequest}
        filter={"status=active"}
      />
    </List>
  );
};

export default DashboardScreen;
