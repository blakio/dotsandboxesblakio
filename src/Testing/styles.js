import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";

const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  square: {
    height: 200,
    width: 200,
    top: 200,
    borderRadius: 4,
    backgroundColor: "#582C68"
  }
})
