import React from "react";

import {
  View,
  Animated
} from "react-native";

const Stretch = (props) => {

  let stretchX = new Animated.Value(1.05);
  let stretchY = new Animated.Value(1);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(stretchX, {
          toValue: 1,
          duration: 500
        }),
        Animated.timing(stretchX, {
          toValue: 1.05,
          duration: 500
        })
      ]),
      {
        iterations: 1000
      }
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(stretchY, {
          toValue: 1.05,
          duration: 500
        }),
        Animated.timing(stretchY, {
          toValue: 1,
          duration: 500
        })
      ]),
      {
        iterations: 40
      }
    ).start();
  }

  startAnimation();

  return (<Animated.View
      style={{
        transform: [
          { scaleY: stretchX },
          { scaleX: stretchY }
        ]
      }}
    >
    {props.children}
  </Animated.View>)
  }

  export default Stretch;
  
