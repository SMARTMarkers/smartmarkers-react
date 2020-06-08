import React from "react";
import { useHistory } from "../react-router";
import {
  List,
  ListItem,
  Text,
  Body,
  View,
  Right,
  Icon,
  Toast,
} from "native-base";
import { useFhirContext } from "../smartmarkers-lib";
import { RequestList } from "../smartmarkers-lib/requests/RequestList";
import { ServiceRequest } from "../smartmarkers-lib/requests/ServiceRequest";
import {
  Instrument,
  InstrumentList,
  InstrumentType,
} from "../smartmarkers-lib/instruments";
import { Modal } from "../smartmarkers-lib/components/tools/Modal";

const DashboardScreen: React.FC<any> = () => {
  const { user, createServiceRequest } = useFhirContext();
  const history = useHistory();

  const onItemPress = async (item: ServiceRequest) => {
    const instrument = await item.getInstrument();
    //console.log({ instrument });
    if (instrument) {
      history.push(
        `${instrument.resourceType.toLowerCase()}/${item.id}/${instrument.id}`
      );
    }
  };

  const onInstrumentPress = async (item: Instrument<any>) => {
    const req = await createServiceRequest<any>(item);
    console.log({ req });
    /*Toast.show({
      text: `${item.getTitle()} requested ${req.id} to ${
        req.subject.reference
      }`,
      buttonText: "OK",
    });*/
  };

  return (
    <List>
      <ListItem noIndent>
        <Body>
          <Text>Hello, {user?.name}</Text>
          <Text note>You have a 3 surveys they will expire today</Text>
        </Body>
      </ListItem>
      <RequestList onItemPress={onItemPress} filter={"status=active"} />
      {/* <InstrumentList
        onItemPress={onInstrumentPress}
        type={InstrumentType.Questionnaire}
      /> */}
    </List>
  );
};

export default DashboardScreen;
