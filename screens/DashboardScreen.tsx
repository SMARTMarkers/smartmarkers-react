import React from "react";
import {
  List,
  ListItem,
  Text,
  Body,
  Right,
  Icon,
  Card,
  CardItem,
} from "native-base";

const DashboardScreen: React.FC<any> = () => {
  const items = [
    { title: "SCI-FI V1.2 Fine", subTitle: "EXPIRE TODAY" },
    { title: "SCI-FI V1.2 Fine", subTitle: "EXPIRE TODAY" },
    { title: "SCI-FI V1.2 Fine", subTitle: "EXPIRE TODAY" },
    { title: "SCI-FI V1.2 Fine", subTitle: "EXPIRE TODAY" },
    { title: "SCI-FI V1.2 Fine", subTitle: "EXPIRE TODAY" },
    { title: "SCI-FI V1.2 Fine", subTitle: "EXPIRE TODAY" },
    { title: "SCI-FI V1.2 Fine", subTitle: "EXPIRE TODAY" },
    { title: "SCI-FI V1.2 Fine", subTitle: "EXPIRE TODAY" },
    { title: "SCI-FI V1.2 Fine", subTitle: "EXPIRE TODAY" },
    { title: "SCI-FI V1.2 Fine", subTitle: "EXPIRE TODAY" },
    { title: "SCI-FI V1.2 Fine", subTitle: "EXPIRE TODAY" },
  ];
  return (
    <List>
      <ListItem noIndent>
        <Body>
          <Text>Hello, Paul</Text>
          <Text note>You have a 3 surveys they will expire today</Text>
        </Body>
      </ListItem>
      {items.map((item, index) => (
        <ListItem key={index} noIndent>
          <Body>
            <Text>{item.title}</Text>
            <Text note>{item.subTitle}</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      ))}
    </List>
  );
};

export default DashboardScreen;
