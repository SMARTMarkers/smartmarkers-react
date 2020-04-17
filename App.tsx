import React from "react";
import { Router } from "./react-router";
import Routes from "./navigation/Routes";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

interface AppState {
  isReady: boolean;
}

export default class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}
