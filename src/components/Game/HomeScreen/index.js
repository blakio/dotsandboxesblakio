import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
  AppState,
  StatusBar
} from "react-native";
import * as Animatable from 'react-native-animatable';

import { images } from "../util/Images";
import { sounds } from "../Sounds";
import { config } from "../util/Settings";

import Icon from 'react-native-vector-icons/FontAwesome'

// const nameBoxStlye = (color = "#fff", fontSize = 20, opacity = 1) => {
//   return {
//     color,
//     fontSize,
//     opacity,
//     fontFamily: "Raleway-Black"
//   }
// }

const nameBoxStlye = (color = "#fff", fontSize = 20, opacity = 1) => {
  return {
    color: "#b57800",
    fontSize,
    opacity,
    fontFamily: "Raleway-Black"
  }
}

const HomeScreen = (props) => {

  const [appState] = useState(AppState.currentState)

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

  const playGameMusic = () => {
    sounds.introMusic.setCurrentTime(0);
    sounds.introMusic.play();
    sounds.introMusic.setVolume(0.05);
    sounds.introMusic.setNumberOfLoops(-1);
  }

  const {
    startGame, motivationPage, storePage, navigation
  } = props;


  navigation.addListener('willFocus', () => {
    startAnimation();
    sounds.introMusic.getCurrentTime((seconds) => {
      if(seconds === 0){
        playGameMusic();
      }
    });
  });

  navigation.addListener('willBlur', () => {
    colorAnimation.stopAnimation();
  })

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

  return (<View style={styles.fullPage}>
    <StatusBar hidden />
    <View style={styles.menuArea}>
      <View style={styles.textSectionStlye}>

        <TouchableOpacity onPress={motivationPage}>
          <View style={styles.circleSmallButton}>
            <Icon name="star" size={30} color="#b57800" />
          </View>
          {/*<Animatable.Text animation="bounceInLeft" style={styles.textBoxStlye}>motivation</Animatable.Text>*/}
        </TouchableOpacity>

        <TouchableOpacity onPress={startGame}>
          <View style={styles.circleBigButton}>
            <Icon name="play" size={45} color="#b57800" />
          </View>
          {/*<Animatable.Text animation="bounceInUp" style={styles.textBoxStlye}>play</Animatable.Text>*/}
        </TouchableOpacity>

        <TouchableOpacity onPress={storePage}>
          <View style={styles.circleSmallButton}>
            <Icon name="shopping-cart" size={30} color="#b57800" />
          </View>
          {/*<Animatable.Text animation="bounceInRight" style={styles.textBoxStlye}>store</Animatable.Text>*/}
        </TouchableOpacity>

      </View>
    </View>

    <View style={styles.title}>
      <Animated.Text style={nameBoxStlye(letterColor, config.width * 0.3)}>D</Animated.Text>
      <Image style={styles.titleImg} source={images.rhino} />
      <Animated.Text style={nameBoxStlye(letterColor, config.width * 0.3)}>T</Animated.Text>
      <Animated.Text style={nameBoxStlye(letterColor, config.width * 0.3)}>S</Animated.Text>
    </View>
  </View>)
}

export default HomeScreen;

const styles = StyleSheet.create({
  fullPage: {
    width: config.width,
    height: config.height
  },
  menuArea: {
    width: config.width,
    height: (config.height * 0.8),
    height: (config.height * 0.6),
    position: "absolute",
    left: 0,
    bottom: 0
  },
  imgStyle: {
    width: config.width,
    height: config.height,
    position: "absolute",
    paddingTop: 40
  },
  circleBigButton: {
    backgroundColor: "#270038",
    height: config.width * 0.4,
    width: config.width * 0.4,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    top: 40,
    borderWidth: 10,
    borderColor: "#3A1749"
  },
  circleSmallButton: {
    backgroundColor: "#270038",
    height: config.width * 0.2,
    width: config.width * 0.2,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
    borderColor: "#3A1749"
  },
  textSectionStlye: {
    // backgroundColor: "#270038",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  textBoxStlye: {
    color: "#b57800",
    // color: "#fff",
    fontSize: 50,
    fontSize: 40,
    opacity: 1,
    fontFamily: "Raleway-Black",
    // fontFamily: "Raleway-Light",
    letterSpacing: 14,
    lineHeight: 60
  },
  title: {
    position: "absolute",
    top: "12%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: config.width
  },
  titleImg: {
    height: 100,
    width: 100,
    position: "relative",
    top: 12
  }
});
