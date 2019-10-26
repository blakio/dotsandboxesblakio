import React from "react";
import {
  View,
  Text,
  Image,
  StatusBar
} from "react-native";

import { StackActions, NavigationActions } from 'react-navigation';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'HomePage' })],
});

import { images } from "../util/Images";
import { config } from "../util/Settings";


const Splash = (props) => {

  props.navigationOptions = { header: null }

  const { navigate } = props.navigation;
  const goHome = () => props.navigation.dispatch(resetAction);

  setTimeout(() => {
    goHome();
  }, 1500)

  return (<View>
    <StatusBar hidden />

    <View style={{
      height: config.height,
      width: config.width,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#212121"
    }}>

      <Image style={{
        height: 200,
        width: 200
      }} source={images.io} />

      <Text
        style={{
          color: "#fff",
          fontFamily: "Raleway-Medium",
          fontSize: config.textWidth,
          textAlign: "center",
          opacity: 0.8,
          margin: 10
        }}
      >blakio</Text>

    </View>
  </View>)
}

Splash.navigationOptions = {
  header: null
};

export default Splash;
