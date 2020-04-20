import React, { useState } from "react";
import { Router } from "./react-router";
import Routes from "./navigation/Routes";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  React.useEffect(() => {
    const loadAssets = async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });
      setIsReady(true);
    };
    loadAssets();
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
