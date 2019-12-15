import React, { useContext } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet
} from "react-native";

import StateContext from "../../../State/State";

import { config } from "../../util/Settings";

const GameScoreBoard = (props) => {

  const {
    ...state
  } = useContext(StateContext);

  const { playerTurn, navigation } = props;

  const opacityStyles =  {
    yourScoreBoard: playerTurn => {
      return {
        height: "100%",
        width: "50%",
        position: "absolute",
        top: 0,
        left: 0
      }
    },
    computerScoreBoard: playerTurn => {
      return {
        height: "100%",
        width: "50%",
        position: "absolute",
        top: 0,
        right: 0
      }
    }
  }

  return (<View style={styles.scoreBoardStyle}>

    <Animated.View style={opacityStyles.yourScoreBoard(playerTurn)}  removeClippedSubviews={true}/>
    <Animated.View style={opacityStyles.computerScoreBoard(playerTurn)}  removeClippedSubviews={true}/>

    <View style={styles.scoreBoxStyle}>
      <Text style={styles.yourScoreStyle}>{state.scores && state.scores.yourScore}</Text>
      <Text style={styles.scoreTextStyle}>YOU</Text>
    </View>

    <View style={styles.scoreBoxStyle}>
      <Text style={styles.text}>{ (playerTurn === "first") ? "your turn" : "cpu turn" }</Text>
    </View>

    <View style={styles.scoreBoxStyle}>
      <Text style={styles.computerScoreStyle}>{state.scores && state.scores.computerScore}</Text>
      <Text style={styles.scoreTextStyle}>CPU</Text>
    </View>

  </View>)

}

export default GameScoreBoard;

const styles = StyleSheet.create({
  scoreBoardStyle: {
    width: config.width,
    height: 60,
    flexDirection: "row"
  },
  scoreBoxStyle: {
    height: "100%",
    width: "33.33%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  scoreTextStyle: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 16,
    fontFamily: "Raleway-ExtraBold",
    margin: 0,
    position: "relative",
    top: -4
  },
  yourScoreStyle: {
    color: "#D68E00",
    fontSize: 40,
    fontFamily: "Raleway-ExtraBold",
    margin: 0
  },
  computerScoreStyle: {
    color: "#BF0000",
    fontSize: 40,
    fontFamily: "Raleway-ExtraBold",
    margin: 0
  },
  text: {
    color: "#fff",
    fontFamily: "Raleway",
    fontSize: config.textWidth,
    textAlign: "center"
  }
});
