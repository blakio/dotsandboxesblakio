import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Vibration
} from "react-native";

//state setup
import StateContext from "../../../State/State";

import Pointer from "../Pointer";
import { boxInfo } from "../../util/BoxInfo";
import { images } from "../../util/Images";
import { sounds } from "../../Sounds";
import { config } from "../../util/Settings";
import Stretch from "../Stretch"

import SpriteSheet from "rn-sprite-sheet";

const GameBlock = (props) => {

  const {
    borders,
    board,
    whoScored,
    whoClickedTheLine,
    footIndexes
  } = useContext(StateContext);

  const [computerSprites, setComputerSprites] = useState([]);
  const [showComputerHand, setShowComputerHand] = useState(false);

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
    clickBorder,
    index,
    hasScored,
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
    blinkingEdge,
    navigation,
    trainingBoxesSidesClick,
    side
  } = props;

  const borderColors = boxInfo.getBorderColors(boxName, whoClickedTheLine);

  const scored = whoScored[boxName];

  let stopAnimation;
  let startingColor;
  let endingColor;
  let colorAnimation;

  const scoreColor = (scored === "second") ? "#FF3A3A" : (scored === "first") ? "#FFC656" : false;

  let topBorderColor = (borderColors[0] === "first") ? "#F7AE1D" : (borderColors[0] === "second") ? "#FF6D6D" : "transparent";
  let rightBorderColor = (borderColors[1] === "first") ? "#F7AE1D" : (borderColors[1] === "second") ? "#FF6D6D" : "transparent";
  let bottomBorderColor = (borderColors[2] === "first") ? "#F7AE1D" : (borderColors[2] === "second") ? "#FF6D6D" : "transparent";
  let leftBorderColor = (borderColors[3] === "first") ? "#F7AE1D" : (borderColors[3] === "second") ? "#FF6D6D" : "transparent";

  const computerCurrentMove = computerLastLineClick && computerLastLineClick.boxes.includes(boxName);
  if(computerCurrentMove){
    const lastClickColor = "#FFADAD";
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
    board[boxName].borders, isTopRightCornerBox, isTopLeftCornerBox,
    isTopSideRow, isBottomRightCornerBox, isBottomLeftCornerBox,
    isBottomSideRow, isRightSideRow, isLeftSideRow
  );

  let borderTopWidth = (isTopRightCornerBox || isTopLeftCornerBox || isTopSideRow) ? 12 : 6;
  let borderRightWidth = (isTopRightCornerBox || isBottomRightCornerBox || isRightSideRow) ? 12 : 6;
  let borderBottomWidth = (isBottomRightCornerBox || isBottomLeftCornerBox || isBottomSideRow) ? 12 : 6;
  let borderLeftWidth = (isTopLeftCornerBox || isBottomLeftCornerBox || isLeftSideRow) ? 12 : 6;

  const getDotPosition = (isEdgeBox) => {
    return -18;
  }

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
  }, [cornerHighlights]);

  const gameBlockWidth = (config.width * 0.9) / 6;

  const styles = {
    box: {
      // backgroundColor: footIndexes.includes(index) ? "#270035" : (scoreColor || '#490e5f'),
      // backgroundColor: footIndexes.includes(index) ? "#270035" : (scoreColor || '#43005B'),
      backgroundColor: scoreColor || 'transparent',
      height: gameBlockWidth,
      width: gameBlockWidth,
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
      height: "50%",
      width: "100%",
      position: "absolute",
      top: "-25%"
    },
    right: {
      height: "100%",
      width: "50%",
      position: "absolute",
      right: "-25%"
    },
    bottom: {
      height: "50%",
      width: "100%",
      position: "absolute",
      bottom: "-25%"
    },
    left: {
      height: "100%",
      width: "50%",
      left: "-25%",
      position: "absolute",
      top: 0
    },
    topLeft: {
      position: "absolute",
      top: getDotPosition(isTopRightCornerBox || isTopLeftCornerBox || isTopSideRow),
      left: getDotPosition(isTopLeftCornerBox || isBottomLeftCornerBox || isLeftSideRow),
      height: 24,
      width: 24,
      // backgroundColor: topLeftCornerColor || "#270038",
      backgroundColor: "#d2d2d2d2",
      borderRadius: 200
    },
    topRight: {
      position: "absolute",
      top: getDotPosition(isTopRightCornerBox || isTopLeftCornerBox || isTopSideRow),
      right: getDotPosition(isTopRightCornerBox || isBottomRightCornerBox || isRightSideRow),
      height: 24,
      width: 24,
      // backgroundColor: topRightCornerColor || "#270038",
      backgroundColor: "#d2d2d2d2",
      borderRadius: 200
    },
    bottomLeft: {
      position: "absolute",
      bottom: getDotPosition(isBottomRightCornerBox || isBottomLeftCornerBox || isBottomSideRow),
      left: getDotPosition(isTopLeftCornerBox || isBottomLeftCornerBox || isLeftSideRow),
      height: 24,
      width: 24,
      // backgroundColor: bottomLeftCornerColor || "#270038",
      backgroundColor: "#d2d2d2d2",
      borderRadius: 200
    },
    bottomRight: {
      position: "absolute",
      right: getDotPosition(isTopRightCornerBox || isBottomRightCornerBox || isRightSideRow),
      bottom: getDotPosition(isBottomRightCornerBox || isBottomLeftCornerBox || isBottomSideRow),
      height: 24,
      width: 24,
      // backgroundColor: bottomRightCornerColor || "#270038",
      backgroundColor: "#d2d2d2d2",
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
      opacity: 0.2
    }
  }

  const clickGameBox = () => {
    if(footIndexes.includes(index)){
      props.setDirectionText("uses bomb to remove");
      sounds.wrong.setCurrentTime(0);
      Vibration.vibrate(200);
      return sounds.wrong.play();
    }
    props.setExplosionBoxes(props.index);
  }

  return (<TouchableOpacity onPress={() => clickGameBox()}>
    <Animated.View style={{...styles.box, ...borderStyles}}>

      {/*<Text style={{position: "absolute", fontSize: 20}}>{index}</Text>*/}

      {/*(scored === "first") && <View style={styles.yourScore}>
        <Image
          style={{flex:1, height: null, width: null}}
          source={images.gold}
        />
      </View>*/}

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
        <Stretch>
          <Image
            style={{height: 36, width: 28, top: -4}}
            source={images.foot}
          />
        </Stretch>
      </View>}

    </Animated.View>
    {/*<Pointer
      side={side}/>*/}

    <View
      pointerEvents="none"
      style={{
        height: config.width * 0.84,
        width: config.width * 0.84,
        position: "absolute",
        flexWrap: "wrap",
        flexDirection: "row"
      }}
    >
      {showComputerHand && Array.apply(null, Array(36)).map((el, index) => (<TouchableOpacity
          key={index}
          onPress={() => computerSprites[index].play({
            type: "explode",
            fps: 24,
            loop: false,
            resetAfterFinish: false,
            onFinish: () => {}
          })}
        >
          <View
            style={{
              height: config.width * 0.139,
              width: config.width * 0.139,
              top: -25,
              left: -25
            }}
          >
            <SpriteSheet
              ref={ref => (computerSprites[index] = ref)}
              source={require('./handSelect.png')}
              columns={13}
              rows={1}
              width={200}
              animations={{
                explode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
              }}
            />
          </View>
      </TouchableOpacity>))}
    </View>

  </TouchableOpacity>)

}

export default GameBlock;
