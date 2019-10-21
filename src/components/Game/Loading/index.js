import React from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  StatusBar
} from "react-native";

import { images } from "../util/Images";
import { config } from "../util/Settings";
import { gameBoards } from "../util/GameBoards";

import InitialState from "../../State/InitialState";

const Loading = (props) => {

  const { navigate } = props.navigation;
  const levelParam = props.navigation.getParam("level");
  setTimeout(() => {
    navigate("Game", { level: levelParam })
  }, 4000);

  InitialState.currentLevel = levelParam;
  InitialState.footIndexes = config.footSquares[levelParam];
  InitialState.board = gameBoards[levelParam];

  let colorAnimation = new Animated.Value(0);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnimation, {
          toValue: 1,
          duration: 4000
        }),
        Animated.timing(colorAnimation, {
          toValue: 0,
          duration: 4000
        })
      ]),
      {
        iterations: 4
      }
    ).start();
  }

  startAnimation();

  const letterColor = colorAnimation.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ '#270035', '#b57800' ]
  });

  props.navigation.addListener('willBlur', () => {
    colorAnimation.stopAnimation();
  })

  const nameBoxStlye = (color) => {
    return {
      color,
      fontSize: config.width * 0.14,
      opacity: 1,
      fontFamily: "Raleway-Black",
      textAlign: "center"
    }
  }

  return (<View style={styles.motivationPage}>
    <StatusBar hidden />

    <Image style={styles.imgStyle} source={images.background} />

    <View style={styles.title}>
      <Animated.Text style={nameBoxStlye(letterColor)}>SUPPORT</Animated.Text>
    </View>

    <View style={styles.textSection}>
      <Text style={styles.text}> Support a Black Business while we load </Text>
    </View>

    <View style={styles.textSection}>
      <Text style={styles.text}> loading... </Text>
    </View>

  </View>)
}

Loading.navigationOptions = {
  header: null
};

export default Loading;

const styles = StyleSheet.create({
  motivationPage: {
    width: config.width,
    height: config.height
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: config.height * 0.15,
    width: config.width
  },
  textSection: {
    width: config.width * 0.9,
    left: config.width * 0.05
  },
  text: {
    color: "#fff",
    fontFamily: "Raleway-Light",
    fontSize: config.width * 0.068,
    textAlign: "center",
    opacity: 0.8,
    margin: 10
  },
  imgStyle: {
    width: config.width,
    height: config.height,
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 40
  }
});
