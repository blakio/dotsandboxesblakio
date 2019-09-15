import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Animated
} from "react-native";

import Pointer from "../Pointer";
import { boxInfo } from "../util/BoxInfo";
import { images } from "../util/Images";
import { sounds } from "../Sounds";

const GameBlock = (props) => {

  let opacity = new Animated.Value(0);
  useEffect(() => {
    if(props.explodingBoxes[props.index]){
      Animated.timing(
        opacity,
        {
          toValue: 1,
          duration: 100,
        }
      ).start(() => {
        Animated.timing(
          opacity,
          {
            toValue: 0,
            duration: 400,
          }
        ).start();
      });
    }
  }, [props.explodingBoxes]);

  let fadeIn = new Animated.Value(0.5);
  useEffect(() => {
    setTimeout(() => {
      Animated.timing(
        fadeIn,
        {
          toValue: 1,
          duration: 1000,
        }
      ).start();
    }, 1000)
  }, []);

  const {
    isDisabledBox,
    borders,
    clickBorder,
    index,
    hasScored,
    scored,
    borderColors,
    computerLastLineClick,
    boxName,
    isTopRightCornerBox,
    isTopLeftCornerBox,
    isBottomRightCornerBox,
    isBottomLeftCornerBox,
    isTopSideRow,
    isRightSideRow,
    isBottomSideRow,
    isLeftSideRow,
    footIndexes,
    aimBoxes,
    blinkingEdge,
    blinkingBox,
    navigation,
    trainingBoxesSidesClick,
    side,
    currentLevel
  } = props;

  let stopAnimation;
  let startingColor;
  let endingColor;
  let colorAnimation;
  let letterColor;

  if(blinkingBox){
    stopAnimation = false;
    startingColor = 0;
    endingColor = 1;
    colorAnimation = new Animated.Value(startingColor);
    letterColor = colorAnimation.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ '#49115e', '#F9A600' ]
    });
    const animateScoreBoard = (obj) => {
      Animated.timing(
        colorAnimation,
        { toValue: endingColor, duration: 500, delay: 500 }
      ).start();
    }
    animateScoreBoard();
  }

  const scoreColor = (scored === "second") && "#2b0938";
  let topBorderColor = (borderColors[0] === "first") ? "#b57800" : (borderColors[0] === "second") ? "#980000" : "transparent";
  let rightBorderColor = (borderColors[1] === "first") ? "#b57800" : (borderColors[1] === "second") ? "#980000" : "transparent";
  let bottomBorderColor = (borderColors[2] === "first") ? "#b57800" : (borderColors[2] === "second") ? "#980000" : "transparent";
  let leftBorderColor = (borderColors[3] === "first") ? "#b57800" : (borderColors[3] === "second") ? "#980000" : "transparent";

  const computerCurrentMove = computerLastLineClick && computerLastLineClick.boxes.includes(boxName);
  if(computerCurrentMove){
    const lastClickColor = "#FF6D6D";
    const indexOfBox = computerLastLineClick.boxes.indexOf(boxName);
    if(computerLastLineClick.sides[indexOfBox] === "top"){
      topBorderColor = lastClickColor;
    } else if (computerLastLineClick.sides[indexOfBox] === "right") {
      rightBorderColor = lastClickColor;
    } else if (computerLastLineClick.sides[indexOfBox] === "bottom") {
      bottomBorderColor = lastClickColor;
    } else if (computerLastLineClick.sides[indexOfBox] === "left") {
      leftBorderColor = lastClickColor;
    }
  }

  const borderStyles = boxInfo.getBorderStyles(
    borders, isTopRightCornerBox, isTopLeftCornerBox,
    isTopSideRow, isBottomRightCornerBox, isBottomLeftCornerBox,
    isBottomSideRow, isRightSideRow, isLeftSideRow
  );

  let borderTopWidth = (isTopRightCornerBox || isTopLeftCornerBox || isTopSideRow) ? 2 : 1;
  let borderRightWidth = (isTopRightCornerBox || isBottomRightCornerBox || isRightSideRow) ? 2 : 1;
  let borderBottomWidth = (isBottomRightCornerBox || isBottomLeftCornerBox || isBottomSideRow) ? 2 : 1;
  let borderLeftWidth = (isTopLeftCornerBox || isBottomLeftCornerBox || isLeftSideRow) ? 2 : 1;

  let cornerHighlights = trainingBoxesSidesClick[boxName] || [];

  const [topLeftCornerColor, setTopLeftCornerColor] = useState(false);
  const [topRightCornerColor, setTopRightCornerColor] = useState(false);
  const [bottomLeftCornerColor, setBottomLeftCornerColor] = useState(false);
  const [bottomRightCornerColor, setBottomRightCornerColor] = useState(false);

  useEffect(() => {
    setTopLeftCornerColor(cornerHighlights.includes("topLeft") ? "#b57800" : "#270038");
    setTopRightCornerColor(cornerHighlights.includes("topRight") ? "#b57800" : "#270038");
    setBottomLeftCornerColor(cornerHighlights.includes("bottomLeft") ? "#b57800" : "#270038");
    setBottomRightCornerColor(cornerHighlights.includes("bottomRight") ? "#b57800" : "#270038");
  }, [cornerHighlights, currentLevel])

  const styles = {
    box: {
      backgroundColor: blinkingBox ? letterColor :
       footIndexes.includes(index) ? "#270035" : (scoreColor || '#490e5f'),
      height: 53,
      width: 53,
      position: "relative",
      opacity: isDisabledBox ? 0 : 1,
      borderTopWidth: borderTopWidth,
      borderRightWidth: borderRightWidth,
      borderBottomWidth: borderBottomWidth,
      borderLeftWidth: borderLeftWidth,
      borderTopColor: topBorderColor,
      borderRightColor: rightBorderColor,
      borderBottomColor: bottomBorderColor,
      borderLeftColor: leftBorderColor
    },
    top: {
      height: "45%",
      width: "100%",
      position: "absolute",
      top: "-18%"
    },
    right: {
      height: "100%",
      width: "45%",
      position: "absolute",
      right: "-18%"
    },
    bottom: {
      height: "45%",
      width: "100%",
      position: "absolute",
      bottom: "-18%"
    },
    left: {
      height: "100%",
      width: "45%",
      left: "-18%",
      position: "absolute",
      top: 0
    },
    topLeft: {
      position: "absolute",
      top: -6,
      left: -6,
      height: 10,
      width: 10,
      backgroundColor: topLeftCornerColor || "#270038",
      borderRadius: 200
    },
    topRight: {
      position: "absolute",
      top: -6,
      right: -6,
      height: 10,
      width: 10,
      backgroundColor: topRightCornerColor || "#270038",
      borderRadius: 200
    },
    bottomLeft: {
      position: "absolute",
      bottom: -6,
      left: -6,
      height: 10,
      width: 10,
      backgroundColor: bottomLeftCornerColor || "#270038",
      borderRadius: 200
    },
    bottomRight: {
      position: "absolute",
      right: -6,
      bottom: -6,
      height: 10,
      width: 10,
      backgroundColor: bottomRightCornerColor || "#270038",
      borderRadius: 200
    },
    yourScore: {
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0
    },
    foot: {
      height: "130%",
      width: "100%",
      top: "-10%",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center"
    },
    aim: {
      height: "130%",
      width: "100%",
      top: "-10%",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      opacity: 0.4
    }
  }

  const clickGameBox = () => {
    if(footIndexes.includes(index)){
      sounds.wrong.setCurrentTime(0);
      return sounds.wrong.play();
    }
    props.setExplosionBoxes(props.index);
  }

  return (<TouchableOpacity onPress={() => clickGameBox()}>
    <Animated.View style={{...styles.box, ...borderStyles}}>

      {(scored === "first") && <View style={styles.yourScore}>
        <Image
          style={{flex:1, height: null, width: null}}
          source={images.gold}
        />
      </View>}

      <Animated.View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#980000",
          opacity: opacity}}>
      </ Animated.View>

      <View style={styles.topLeft} />
      <View style={styles.topRight} />
      <View style={styles.bottomLeft} />
      <View style={styles.bottomRight} />

      <TouchableOpacity style={styles.top} onPress={() => clickBorder("top", index, "first")}>
        <View />
      </TouchableOpacity>

      <TouchableOpacity style={styles.right} onPress={() => clickBorder("right", index, "first")}>
        <View />
      </TouchableOpacity>

      <TouchableOpacity style={styles.bottom} onPress={() => clickBorder("bottom", index, "first")}>
        <View />
      </TouchableOpacity>

      <TouchableOpacity style={styles.left} onPress={() => clickBorder("left", index, "first")}>
        <View />
      </TouchableOpacity>

      {footIndexes.includes(index) && <View style={styles.foot}>
        <Image
          style={{height: 42, width: 32, top: -4}}
          source={images.foot}
        />
      </View>}

      {(aimBoxes.includes(boxName)) && <Animated.View style={styles.aim}>
        <Image
          style={{flex:1, height: 50, width: 50, position: "absolute"}}
          source={images.aim}
        />
      </Animated.View>}

    </Animated.View>
    <Pointer
      side={side}/>
  </TouchableOpacity>)

}

export default GameBlock;
