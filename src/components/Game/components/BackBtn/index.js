import React from "react";

import {
  View,
  Text,
  Image,
  TouchableHighlight
} from "react-native";

import { images } from "../../util/Images";
import { config } from "../../util/Settings";

const BackBtn = (props) => {

  const { onGameScreen, restartGame } = props;

  // navigate to the home page
  const goHome = () => props.navigation.navigate("HomePage");
  const levelScreen = () => props.navigation.navigate("LevelScreen");

  const textStlye = {
    color: "#fff",
    fontFamily: "Raleway-Black",
    fontSize: config.textWidth,
    textAlign: "center",
    opacity: 0.6,
    margin: 10
  }

  return (<View
    onPress={() => goHome()}
    style={{
      position: "absolute",
      bottom: 0,
      width: config.width,
      height: 50,
      backgroundColor: "rgb(39,0,56)",
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row"
    }}>
    {onGameScreen && <TouchableHighlight onPress={restartGame}>
      <Image style={{
        width: config.textWidth,
        height:  config.textWidth,
        opacity: 0.6
      }} source={images.restart} />
    </TouchableHighlight>}
    <TouchableHighlight onPress={goHome}>
      <Image style={{
        width: 30,
        height:  30
      }} source={images.home} />
    </TouchableHighlight>
    {onGameScreen && <TouchableHighlight onPress={levelScreen}>
      <Text style={textStlye}>LV</Text>
    </TouchableHighlight>}
  </View>)
}

export default BackBtn;
