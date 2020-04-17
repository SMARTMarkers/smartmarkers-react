import React from "react";
import { useHistory } from "../../react-router";
import FooterTabNavigator from "../../navigation/FooterTabNavigator";
import {
  Container,
  Header,
  Content,
  Footer,
  Left,
  Button,
  Icon,
  Title,
  Right,
  Body,
} from "native-base";
import { FooterRoutes } from "../../navigation/FooterRoutes";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ ...props }) => {
  const { children } = props;
  const history = useHistory();

  const footerRoutePaths = FooterRoutes.map((route) => route.path);
  const isFooterRoute = footerRoutePaths.includes(history.location.pathname);
  const onPress = () => {
    history.goBack();
  };

  const onPersonPress = () => {
    history.push("/settings");
  };

  return (
    <Container>
      <Header noLeft={isFooterRoute}>
        {!isFooterRoute && (
          <Left>
            <Button transparent onPress={onPress}>
              <Icon name="md-arrow-back" />
            </Button>
          </Left>
        )}
        <Body>
          <Title>Testing app</Title>
        </Body>
        <Right>
          <Button transparent onPress={onPersonPress}>
            <Icon name="person" />
          </Button>
        </Right>
      </Header>
      <Content>{children}</Content>
      {isFooterRoute && (
        <Footer>
          <FooterTabNavigator />
        </Footer>
      )}
    </Container>
  );
};

export default Main;
