import React from "react";
import {
  View,
  Image,
  Animated
} from "react-native";

const pointer = require("../../../../imgs/pointer.png");

const Pointer = (props) => {

  const {
    side,
    bomb
  } = props;

  if(!side && !bomb){
    return <View></View>
  }

  const opacity = new Animated.Value(0);
  const animateOpacity = () => {
    Animated.timing(
      opacity,
      { toValue: 1, duration: 500, delay: 500 }
    ).start();
  }
  animateOpacity();

  let rotate, bottom, left;
  if(side === "right"){
    rotate = "-90deg";
    bottom = -6;
    left = -18;
  } else if (side === "top" || bomb){
    rotate = "180deg";
    bottom = 40;
    left = -40;
  } else if (side === "box"){
    rotate = "-90deg";
    bottom = -6;
    left = 10;
  }

  return (<Animated.View
    removeClippedSubviews={true}
    pointerEvents="none"
    style={{
      position: "absolute",
      bottom,
      left,
      height: 120,
      width: 120,
      justifyContent: "center",
      alignItems: "center",
      opacity
    }}>
    <Image
      style={{flex: 1, transform: [{ rotate }]}}
      source={pointer}
      resizeMode="contain"
    />
  </Animated.View>)
}

export default Pointer;
