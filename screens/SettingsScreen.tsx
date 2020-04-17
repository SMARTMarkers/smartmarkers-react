import React from "react";
import {
  Text,
  List,
  ListItem,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Switch,
} from "native-base";

const SettingsScreen: React.FC<any> = () => {
  return (
    <List>
      <ListItem icon>
        <Left>
          <Button style={{ backgroundColor: "#FF9501" }}>
            <Icon active name="airplane" />
          </Button>
        </Left>
        <Body>
          <Text>Airplane Mode</Text>
        </Body>
        <Right>
          <Switch value={false} />
        </Right>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{ backgroundColor: "#007AFF" }}>
            <Icon active name="wifi" />
          </Button>
        </Left>
        <Body>
          <Text>Wi-Fi</Text>
        </Body>
        <Right>
          <Text>GeekyAnts</Text>
          <Icon active name="arrow-forward" />
        </Right>
      </ListItem>
      <ListItem icon>
        <Left>
          <Button style={{ backgroundColor: "#007AFF" }}>
            <Icon active name="bluetooth" />
          </Button>
        </Left>
        <Body>
          <Text>Bluetooth</Text>
        </Body>
        <Right>
          <Text>On</Text>
          <Icon active name="arrow-forward" />
        </Right>
      </ListItem>
    </List>
  );
};

export default SettingsScreen;
