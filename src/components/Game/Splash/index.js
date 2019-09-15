import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar
} from "react-native";

import { images } from "../util/Images";
import { config } from "../util/Settings";


const Splash = (props) => {

  props.navigationOptions = { header: null }

  const { navigate } = props.navigation;
  const goHome = () => navigate("HomePage");

  setTimeout(() => {
    goHome();
  }, 1500)

  return (<TouchableOpacity>
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
          fontFamily: "Raleway-Light",
          fontSize: 26,
          textAlign: "center",
          opacity: 0.8,
          margin: 10
        }}
      >blakio</Text>

    </View>
  </TouchableOpacity>)
}

Splash.navigationOptions = {
  header: null
};

export default Splash;
