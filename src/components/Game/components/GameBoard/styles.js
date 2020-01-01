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

// const vrow1 = deviceWidth * 0.0715;
// const vrow2 = deviceWidth * 0.2132;
// const vrow3 = deviceWidth * 0.3549;
// const vrow4 = deviceWidth * 0.4966;
// const vrow5 = deviceWidth * 0.6383;
// const vrow6 = deviceWidth * 0.78;
// const vcol1 = deviceWidth * 0.0304;
// const vcol2 = deviceWidth * 0.172;
// const vcol3 = deviceWidth * 0.318;
// const vcol4 = deviceWidth * 0.457;
// const vcol5 = deviceWidth * 0.6022;
// const vcol6 = deviceWidth * 0.7455;
// const vcol7 = deviceWidth * 0.8875;
// const hrow1 = deviceWidth * 0.0304;
// const hrow2 = deviceWidth * 0.175;
// const hrow3 = deviceWidth * 0.317;
// const hrow4 = deviceWidth * 0.459;
// const hrow5 = deviceWidth * 0.6026;
// const hrow6 = deviceWidth * 0.7455;
// const hrow7 = deviceWidth * 0.8875;
// const hcol1 = deviceWidth * 0.0715;
// const hcol2 = deviceWidth * 0.2132;
// const hcol3 = deviceWidth * 0.3549;
// const hcol4 = deviceWidth * 0.4966;
// const hcol5 = deviceWidth * 0.6383;
// const hcol6 = deviceWidth * 0.78

// vrow1: 26.812499999999996
// vrow2: 79.95
// vrow3: 133.0875
// vrow4: 186.225
// vrow5: 239.36249999999998
// vrow6: 292.5

// vcol1: 11.4
// vcol2: 64.5
// vcol3: 119.25
// vcol4: 171.375
// vcol5: 225.825
// vcol6: 279.5625
// vcol7: 332.8125

// hrow1: 11.4
// hrow2: 65.625
// hrow3: 118.875
// hrow4: 172.125
// hrow5: 225.97500000000002
// hrow6: 279.5625
// hrow7: 332.8125

// hcol1: 26.812499999999996
// hcol2: 79.95
// hcol3: 133.0875
// hcol4: 186.225
// hcol5: 239.36249999999998
// hcol6: 292.5

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
    // backgroundColor: "#B7B7B7",
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
