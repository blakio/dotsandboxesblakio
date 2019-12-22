import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated
} from "react-native";

import styles from "./styles";
import util from "./util.js"

const Testing = (props) => {

  let isOver = true;

  return (<View style={{justifyContent: "center", alignItems: "center"}}>

    <View
      style={styles.square}
      onMoveShouldSetResponder = {e => true}
      onResponderRelease={e => {
        console.log("hey")
      }}
      onResponderMove={e => {
        console.log(e.nativeEvent)
      }}
    >
    </View>

  </View>)
}

export default Testing;
