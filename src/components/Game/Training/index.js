import React, { useState } from "react"
import {
  View,
  Text,
  TouchableHighlight,
  Animated,
  StyleSheet,
  Image
} from "react-native";

import { config } from "../util/Settings";

const Training = ({text, openTraining}) => {

  const [index, setIndex] = useState(0);
  const [screenText, setScreenText] = useState(text[index]);
  const [removeScreen, setRemoveScreen] = useState(false)

  const nextPage = () => {
    if(text[index + 1]){
      setScreenText(text[index + 1])
      setIndex(index + 1)
    } else {
      openTraining(false)
    }
  }

  const otherStlyes = removeScreen ? {
    display: "none"
  } : {};

  return (<TouchableHighlight
    style={{...styles.background, ...otherStlyes}}
    onPress={() => nextPage()}>
      <Text style={styles.text}>{text[index]}</Text>
  </TouchableHighlight>)
}

const styles = {
  background: {
    backgroundColor: "rgb(39, 0, 53)",
    height: config.height,
    width: config.width,
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    width: "80%",
    color: "#fff",
    fontFamily: "Raleway-Light",
    fontSize: config.textWidth,
    textAlign: "center",
    opacity: 0.8,
    margin: 10
  }
}

export default Training;
