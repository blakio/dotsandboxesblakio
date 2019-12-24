import React from "react";
import {
  StyleSheet,
  Dimensions
} from "react-native";

const deviceWidth = Dimensions.get('window').width;
const squareContainer = deviceWidth * 0.85;
const squareWidth = squareContainer / 6;
const circleBoxWidth = deviceWidth / 7.00001;
const circleWidth = circleBoxWidth * 0.4;
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
    backgroundColor: "#d2d2d2",
    borderRadius: circleBorderRadius,
    justifyContent: "center",
    alignItems: "center"
  },
  sideContainer: {
    position: "absolute",
    top: 0,
    left: 0
  },
  hClickBox: {
    height: squareWidth * 0.6,
    width: squareWidth,
    justifyContent: "center",
    alignItems: "center"
  },
  vClickBox: {
    height: squareWidth,
    width: squareWidth * 0.6,
    justifyContent: "center",
    alignItems: "center"
  },
  vSide: {
    height: squareWidth,
    width: squareWidth * 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  vDoubleHeight: {
    height: squareWidth * 2.2,
    borderRadius: 10
  },
  hSide: {
    height: squareWidth * 0.3,
    width: squareWidth,
    justifyContent: "center",
    alignItems: "center"
  },
  hDoubleHeight: {
    width: squareWidth * 2.2,
    borderRadius: 10
  },
  vrow1: { top: "7.15%" },
  vrow2: { top: "21.32%" },
  vrow3: { top: "35.49%" },
  vrow4: { top: "49.66%" },
  vrow5: { top: "63.83%" },
  vrow6: { top: "78%" },
  vcol1: { left: "3.04%" },
  vcol2: { left: "17.2%" },
  vcol3: { left: "31.8%" },
  vcol4: { left: "45.7%" },
  vcol5: { left: "60.22%" },
  vcol6: { left: "74.55%" },
  vcol7: { left: "88.75%" },
  hrow1: { top: "3.04%" },
  hrow2: { top: "17.5%" },
  hrow3: { top: "31.7%" },
  hrow4: { top: "45.9%" },
  hrow5: { top: "60.26%" },
  hrow6: { top: "74.55%" },
  hrow7: { top: "88.75%" },
  hcol1: { left: "7.15%" },
  hcol2: { left: "21.32%" },
  hcol3: { left: "35.49%" },
  hcol4: { left: "49.66%" },
  hcol5: { left: "63.83%" },
  hcol6: { left: "78%" },
  noSelected: {
    // backgroundColor: "transparent",
  },
  firstSelected: {
    backgroundColor: "#FFC656",
    opacity: 1
  },
  secondSelected: {
    backgroundColor: "#FF3A3A",
    opacity: 1
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
  foot: {
    height: "120%",
    width: "180%",
    top: "4%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  }
})
