import React from "react";
import { useHistory, useParams } from "../react-router";
import { List, ListItem, Text } from "native-base";
import { Patient } from "../smartmarkers-lib";
import { PatientList } from "../smartmarkers-lib/components/PatientList";

interface RouteParams {
  instrumentId: string;
}

const ChoosePatientScreen: React.FC<any> = () => {
  const { instrumentId } = useParams<RouteParams>();
  const history = useHistory();

  const onItemPress = async (item: Patient) => {
    history.push(`/create-service-request/${instrumentId}/${item.id}/`);
  };

  return (
    <List>
      <ListItem itemHeader>
        <Text>PATIENTS</Text>
      </ListItem>
      <PatientList onItemPress={onItemPress} filter={"active=true"} />
    </List>
  );
};

export default ChoosePatientScreen;
