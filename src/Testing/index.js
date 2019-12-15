import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated
} from "react-native";

import styles from "./styles";
import util from "./util.js"

const Testing = () => {

  const vBoxes = new Array(42).fill("");
  const hBoxes = new Array(84).fill("");
  const selectedLines = util.getSelectedLines(util.selected, util.sideAndSquareMapper);

  return (<View style={{justifyContent: "center", alignItems: "center"}}>

    <View style={styles.squaresParent}>

      <View style={styles.squaresContainer}>
        {new Array(36).fill("").map((data, index) => {
          const bgColor = util.getScoreStatus(index, util.scored);
          return (<TouchableOpacity key={index}>
            <View style={{
              ...styles.squares,
              ...styles[bgColor]
            }}>
              <Text>{util.getBorderNumber(index, util.selected)}</Text>
            </View>
          </TouchableOpacity>)
        })}
      </View>

      {hBoxes.map((data, index) => {
        if(index < 42) return null;
        const positionClass = util.getHorizontalSidePosition(index);
        const bgColor = util.getSelectedStatus(index, selectedLines);
        return (<View style={{
          ...styles.sideContainer,
          ...styles[positionClass.row],
          ...styles[positionClass.col]
        }} key={index}>
          <TouchableOpacity>
            <View style={{
              ...styles.hSide,
              ...styles[bgColor]
            }}>
            </View>
          </TouchableOpacity>
        </View>)
      })}

      {vBoxes.map((data, index) => {
        const positionClass = util.getVerticalSidePosition(index);
        const bgColor = util.getSelectedStatus(index, selectedLines);
        return (<View style={{
          ...styles.sideContainer,
          ...styles[positionClass.row],
          ...styles[positionClass.col]
        }} key={index}>
          <TouchableOpacity>
            <View style={{
              ...styles.vSide,
              ...styles[bgColor]
            }}>
            </View>
          </TouchableOpacity>
        </View>)
      })}

      <View style={styles.circleContainer} pointerEvents="none">
        {new Array(49).fill("").map((data, index) => {
          return (<View style={styles.circleBox} key={index}>
            <View style={styles.circle}></View>
          </View>)
        })}
      </View>

    </View>

  </View>)
}

export default Testing;
