import React from "react";
import {
  View,
  Image
} from "react-native";

const pointer = require("../../../imgs/pointer.png");

const Pointer = (props) => {

  const {
    side,
    bomb
  } = props;

  if(!side && !bomb){
    return <View></View>
  }

  let rotate, bottom, left;
  if(side === "right"){
    rotate = "-90deg";
    bottom = -16;
    left = 10;
  } else if (side === "top" || bomb){
    rotate = "180deg";
    bottom = 60;
    left = -30;
  } else if (side === "box"){
    rotate = "-90deg";
    bottom = -16;
    left = 40;
  }

  return (<View
    removeClippedSubviews={true}
    pointerEvents="none"
    style={{
      position: "absolute",
      bottom,
      left,
      height: 100,
      width: 100,
      justifyContent: "center",
      alignItems: "center"
    }}>
    <Image
      style={{flex: 1, transform: [{ rotate }]}}
      source={pointer}
      resizeMode="contain"
    />
  </View>)
}

export default Pointer;
