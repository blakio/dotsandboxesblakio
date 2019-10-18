import React from "react";
import {
  View,
  Image
} from "react-native";

import { images } from "../../util/Images";

const Arrows = (options) => {
  const {
    data
  } = options;

  return (<View
      style={{
        height: "100%",
        width: "100%",
        position: "absolute"
      }}
    >

    <View className="flex"
    style={{
      position: "absolute",
      height: "100%",
      width: "100%",
      top: "-100%"
    }}>
      <Image style={{
        height: "100%",
        width: "60%",
        marginTop: 0,
        marginRight: "auto",
        marginBottom: 0,
        marginLeft: "auto"
      }} source={images.top} />
    </View>

    <View className="flex"
    style={{
      position: "absolute",
      height: "100%",
      width: "100%",
      right: "-100%"
    }}>
      <Image style={{
        height: "60%",
        width: "100%",
        marginTop: "auto",
        marginRight: 0,
        marginBottom: "auto",
        marginLeft: 0
      }} source={images.right} />
    </View>

    <View className="flex"
    style={{
      position: "absolute",
      height: "100%",
      width: "100%",
      bottom: "-100%"
    }}>
      <Image style={{
        height: "100%",
        width: "60%",
        marginTop: 0,
        marginRight: "auto",
        marginBottom: 0,
        marginLeft: "auto"
      }} source={images.bottom} />
    </View>

    <View className="flex"
    style={{
      position: "absolute",
      height: "100%",
      width: "100%",
      left: "-100%"
    }}>
      <Image style={{
        height: "60%",
        width: "100%",
        marginTop: "auto",
        marginRight: 0,
        marginBottom: "auto",
        marginLeft: 0
      }} source={images.left} />
    </View>

  </View>)
}

export default Arrows;
