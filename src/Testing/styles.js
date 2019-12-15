import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";

const deviceWidth = Dimensions.get('window').width;
const squareContainer = deviceWidth * 0.85;
const squareWidth = squareContainer / 6;
const circleBoxWidth = deviceWidth / 7.00001;
const circleWidth = circleBoxWidth * 0.6;
const circleBorderRadius = circleBoxWidth / 2;

export default StyleSheet.create({
  squaresParent: {
    height: deviceWidth,
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  squaresContainer: {
    height: squareContainer,
    width: squareContainer,
    flexDirection: "row",
    flexWrap: "wrap",
    position: "absolute"
  },
  squares: {
    height: squareWidth,
    width: squareWidth,
    justifyContent: "center",
    alignItems: "center"
  },
  circleContainer: {
    height: deviceWidth,
    width: deviceWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    position: "absolute"
  },
  circleBox: {
    height: circleBoxWidth,
    width: circleBoxWidth,
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    height: circleWidth,
    width: circleWidth,
    backgroundColor: "#ccc",
    borderRadius: circleBorderRadius
  },
  sideContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: squareWidth,
    width: squareWidth * 0.3,
  },
  vSide: {
    height: squareWidth,
    width: squareWidth * 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  hSide: {
    height: squareWidth * 0.3,
    width: squareWidth,
    justifyContent: "center",
    alignItems: "center"
  },
  vrow1: { top: "7.15%" },
  vrow2: { top: "21.32%" },
  vrow3: { top: "35.49%" },
  vrow4: { top: "49.66%" },
  vrow5: { top: "63.83%" },
  vrow6: { top: "78%" },
  vcol1: { left: "5.04%" },
  vcol2: { left: "19.5%" },
  vcol3: { left: "33.7%" },
  vcol4: { left: "47.9%" },
  vcol5: { left: "62.26%" },
  vcol6: { left: "76.55%" },
  vcol7: { left: "90.75%" },
  hrow1: { top: "5.04%" },
  hrow2: { top: "19.5%" },
  hrow3: { top: "33.7%" },
  hrow4: { top: "47.9%" },
  hrow5: { top: "62.26%" },
  hrow6: { top: "76.55%" },
  hrow7: { top: "90.75%" },
  hcol1: { left: "7.15%" },
  hcol2: { left: "21.32%" },
  hcol3: { left: "35.49%" },
  hcol4: { left: "49.66%" },
  hcol5: { left: "63.83%" },
  hcol6: { left: "78%" },
  noSelected: {
    backgroundColor: "transparent",
  },
  firstSelected: {
    backgroundColor: "#FFC656",
  },
  secondSelected: {
    backgroundColor: "#FF3A3A",
  },
  noScored: {
    backgroundColor: "transparent",
  },
  firstScored: {
    backgroundColor: "#D8A949",
  },
  secondScored: {
    backgroundColor: "#CE2F2F",
  },
})
