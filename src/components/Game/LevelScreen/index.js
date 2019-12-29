import React, { useState, useEffect } from "react";
import Types from "../../State/Types"

import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  AppState,
  StatusBar,
  Animated
} from "react-native";
import * as Animatable from 'react-native-animatable';

import BackBtn from "../components/BackBtn";

import { images } from "../util/Images";
import { sounds } from "../Sounds";
import { config } from "../util/Settings";
import { util } from "../util/Util";

const LevelScreen = (props) => {

  const { navigate } = props.navigation;
  const startGame = (level) => {
    sounds.introMusic.setCurrentTime(0);
    sounds.introMusic.pause();

    navigate("Loading", { level: `level${level}` })
  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active'){
      sounds.introMusic.setVolume(1);
    } else {
      sounds.introMusic.setVolume(0);
    }
  };

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

  // const nameBoxStlye = (color) => {
  //   return {
  //     color,
  //     fontSize: config.width * 0.14,
  //     opacity: 1,
  //     fontFamily: "Raleway-Black",
  //     textAlign: "center"
  //   }
  // }

  const nameBoxStlye = (color) => {
    return {
      color: "#b57800",
      fontSize: config.width * 0.14,
      opacity: 1,
      fontFamily: "Raleway-Black",
      textAlign: "center"
    }
  }

  const levels = [1, 2, 3, 4, 5, 6, 7, 8];

  return (<View style={styles.fullPage}>
    <Image style={styles.imgStyle} source={images.background} />
    <StatusBar hidden />

    <ScrollView>
      <View style={{
        width: config.width * 0.6,
        flexDirection: "row",
        flexWrap: "wrap",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 100,
        marginBottom: 60
      }}>
        <View style={styles.title}>
          <Animated.Text style={nameBoxStlye(letterColor)}>LEVELS</Animated.Text>
        </View>
        {levels.map((data, index) => {
          return (<TouchableOpacity
            key={index}
            onPress={() => startGame(data)}>
            <View style={styles.levelBlock}>
              <Animatable.Text animation="pulse" iterationCount="infinite" style={{
                color: "#b57800",
                fontSize: 40,
                fontFamily: "Raleway-Black"
              }}>{data}</Animatable.Text>
            </View>
          </TouchableOpacity>)
        })}
      </View>
    </ScrollView>

    <BackBtn {...props} />
  </View>)
}

export default LevelScreen;

LevelScreen.navigationOptions = {
  header: null
};

const styles = {
  fullPage: {
    width: config.width,
    height: config.height,
    justifyContent: "center"
  },
  imgStyle: {
    width: config.width,
    height: config.height,
    position: "absolute",
    paddingTop: 40
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: config.width,
    marginRight: "auto",
    marginLeft: "auto"
  },
  levelBlock: {
    backgroundColor: util.darkPurple,
    height: config.width * 0.25,
    width: config.width * 0.25,
    borderRadius: 4,
    margin: config.width * 0.025,
    justifyContent: "center",
    alignItems: "center"
  }
};
