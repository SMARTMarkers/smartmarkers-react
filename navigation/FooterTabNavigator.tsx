import React from "react";
import { FooterTab, Button, Icon, Text } from "native-base";
import { useHistory } from "react-router-dom";
import { FooterRoutes } from "./FooterRoutes";

const FooterTabNavigator: React.FC = () => {
  const history = useHistory();
  const currentPath = history.location.pathname;

  let position = FooterRoutes.findIndex(({ path }) => path === currentPath);
  if (currentPath.startsWith("/survey/")) {
    position = 1;
  }
  return (
    <FooterTab>
      {FooterRoutes.map((route, index) => (
        <Button
          key={index}
          active={index == position}
          vertical
          onPress={() => {
            history.push(route.path);
          }}
        >
          <Icon active={index == position} name={route.icon} />
          <Text>{route.name}</Text>
        </Button>
      ))}
    </FooterTab>
  );
};

export default FooterTabNavigator;
