import React from "react";

import {
  View,
  Image,
  TouchableHighlight
} from "react-native";

import { images } from "../util/Images";
import { config } from "../util/Settings";

const BackBtn = (props) => {

  // navigate to the home page
  const goHome = () => props.navigation.navigate("HomePage");

  return (<View
    onPress={() => goHome()}
    style={{
      position: "absolute",
      bottom: 0,
      width: config.width,
      height: 70,
      backgroundColor: "rgb(39,0,56)",
      justifyContent: "center",
      alignItems: "center"
    }}>
    <TouchableHighlight onPress={goHome}>
      <Image style={{
        width: config.width * 0.08,
        height:  config.width * 0.08
      }} source={images.home} />
    </TouchableHighlight>
  </View>)
}

export default BackBtn;
