import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Vibration,
  Dimensions,
  PanResponder
} from "react-native";

import styles from "./styles";
import util from "./util.js"
import { images } from "../../util/Images";
import Stretch from "../Stretch"

const GameBoard = (props) => {

  const [topLeft, setTopLeft] = useState([]);
  const [topRight, setTopRight] = useState([]);
  const [bottomLeft, setBottomLeft] = useState([]);

  const getClickResponders = () => {
    let panResponder;
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: (e, gestureState) => handleSelection(e),
      onPanResponderGrant: (e, gestureState) => handleSelection(e, true),
      onPanResponderRelease: (e, gestureState) => {
        if(click && click.index){
          if(click.type === "line"){
            const disabledMapper = util.disabledLineConditions[click.index];
            const isDisabled = util.getDisabledStatus(disabledMapper, disabledBoxes);
            if(!isDisabled){
              const clickInfo = util.clickSide[click.index];
              const thisclick = util.getClick(clickInfo, disabledBoxes);
              props.clickBorder(thisclick.side, util.getBoxIndex(thisclick.box), "first");
            }
          } else if (click.type === "box") {
            clickGameBox(click.index)
          }
        }
        // reset variables
        setClick(false)
      }
    });
    return panResponder.panHandlers;
  }

  const [click, setClick] = useState({
    index: false
  });

  const disabledBoxes = util.getDisabledBoxes(props.board);

  const vBoxes = new Array(42).fill("");
  const hBoxes = new Array(84).fill("");
  const selectedLines = util.getSelectedLines(util.getSelected(props.whoClickedTheLine), util.sideAndSquareMapper);

  const handleSelection = (e, init) => {
    const locationX = e.nativeEvent.locationX;
    const locationY = e.nativeEvent.locationY;
    const lineClickPositions = util.lineClickPositions;
    const boxClickPositions = util.boxClickPositions;

    // if(init){
    //   if(topLeft.length < 10){
    //     setTopLeft([...topLeft, [locationX, locationY]]);
    //   } else if(topRight.length < 10){
    //     setTopRight([...topRight, [locationX, locationY]]);
    //   } else if(bottomLeft.length < 10){
    //     setBottomLeft([...bottomLeft, [locationX, locationY]]);
    //   } else {
    //     const topLeftAve = util.getAveFromPoints(topLeft)
    //     const topRightAve = util.getAveFromPoints(topRight)
    //     const bottomLeftAve = util.getAveFromPoints(bottomLeft)
    //     const coordinates = util.getEdgeCoordinates(topLeftAve, topRightAve, bottomLeftAve);
    //     const positions = util.getPositions(coordinates)
    //     console.log(positions)
    //   }
    // }


    // const clickHelper = util.getClickFromPostion(locationX, locationY, lineClickPositions, boxClickPositions);
    //
    // if(clickHelper.type === "box" && !props.activeBomb.length){
    //

    if(props.activeBomb && props.activeBomb.length){

      // the click event wont activeate if a bomb is active because the pointerEvents will be set to none

      // debugger
      // const clickHelper = util.getClickFromPostion(locationX, locationY, lineClickPositions, boxClickPositions);
      // if(clickHelper){
      //   clickHelper.type = "box";
      //   setClick(clickHelper);
      // } else if(click !== "false") {
      //   setClick(false)
      // }
    } else {
      const closesLine = util.getClosesLine(locationX, locationY, util.centerOfLine);

      if(closesLine){
        const disabledMapper = util.disabledLineConditions[closesLine];
        const isDisabled = util.getDisabledStatus(disabledMapper, disabledBoxes);

        if((click.index !== closesLine) && !isDisabled){
          setClick({
            index: closesLine,
            type: "line"
          })
        }
      } else if(click.index !== closesLine) {
        setClick({
          index: closesLine,
          type: "line"
        })
      }
    }

    //
    // } else {
    //
    //   if(clickHelper){
    //     if(props.activeBomb && clickHelper.type === "box"){
    //       setClick(clickHelper);
    //     } else if((click.index !== clickHelper.index && clickHelper.type === "line") && !props.activeBomb){
    //       const disabledMapper = util.disabledLineConditions[clickHelper.index];
    //       const isDisabled = util.getDisabledStatus(disabledMapper, disabledBoxes);
    //       if(!isDisabled){
    //         setClick(clickHelper)
    //       } else if(click !== "false") {
    //         setClick(false)
    //       }
    //     }
    //   } else if(click !== "false") {
    //     setClick(false)
    //   }
    //
    // }
  }

  const clickGameBox = (index) => {
    if(props.footIndexes.includes(index)){
      props.setDirectionText("uses bomb to remove");
      props.sounds.wrong.setCurrentTime(0);
      Vibration.vibrate(200);
      return props.sounds.wrong.play();
    }
    props.setExplosionBoxes(index);
  }

  return (<View style={{
      justifyContent: "center",
      alignItems: "center",

      // borderColor: 'transparent',
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 8 },
      // shadowOpacity: 0.4
    }}
  >

    <View style={styles.squaresParent}>

      <View style={styles.squaresContainer}>
        {new Array(36).fill("").map((data, index) => {
          const bgColor = util.getScoreStatus(index, util.getWhoScored(props.whoScored));
          const hasFoot = props.footIndexes.includes(index);
          const additionalStlyes = {};
          if(hasFoot){
            additionalStlyes.backgroundColor = "#300042";
          }
          return (<TouchableOpacity
            key={index}
            onPress={() => clickGameBox(index)}
            >
            <View style={{
              ...styles.squares,
              ...styles[bgColor],
              ...additionalStlyes
            }}>
              {hasFoot && <View style={styles.foot}>
                <Stretch>
                  <Image
                    style={{height: 36, width: 28, top: -4}}
                    source={images.foot}
                  />
                </Stretch>
              </View>}
              {/*<Text>{util.getBorderNumber(index, util.selected)}</Text>*/}
              {/*<Text>{index}</Text>*/}
            </View>
          </TouchableOpacity>)
        })}
      </View>

      {hBoxes.map((data, index) => {
        if(index < 42) return null;
        const positionClass = util.getHorizontalSidePosition(index);
        const bgColor = util.getSelectedStatus(index, selectedLines);
        const disabledMapper = util.disabledLineConditions[index];
        const isDisabled = util.getDisabledStatus(disabledMapper, disabledBoxes);

        const additionalStlyes = {};
        if(!isDisabled){
          additionalStlyes.backgroundColor = "#C6C6C6";
          additionalStlyes.opacity = 0.1;
        }

        const hoverStlyes = (click.type === "line" && click.index === index && !props.activeBomb) ? {
          ...styles.hDoubleHeight,
          backgroundColor: "#FFC656",
          opacity: 1,
          borderWidth: 1,
          borderColor: "#BC9340"
        } : {};

        return (<View style={{
          ...styles.sideContainer,
          ...styles[positionClass.row],
          ...styles[positionClass.col]
        }} key={index}>
          <TouchableOpacity onPress={() => {
            if(!isDisabled){
              const clickInfo = util.clickSide[index];
              const clickBox = util.getClick(clickInfo, disabledBoxes);
              props.clickBorder(clickBox.side, util.getBoxIndex(clickBox.box), "first");
            }
          }}>
            <View style={styles.hClickBox}>
              <View style={{
                ...additionalStlyes,
                ...styles.hSide,
                ...styles[bgColor],
                ...hoverStlyes
              }}>
                {/*<Text>{index}</Text>*/}
              </View>
            </View>
          </TouchableOpacity>
        </View>)
      })}

      {vBoxes.map((data, index) => {
        const positionClass = util.getVerticalSidePosition(index);
        const bgColor = util.getSelectedStatus(index, selectedLines);
        const disabledMapper = util.disabledLineConditions[index];
        const isDisabled = util.getDisabledStatus(disabledMapper, disabledBoxes);

        const additionalStlyes = {};
        if(!isDisabled){
          additionalStlyes.backgroundColor = "#C6C6C6";
          additionalStlyes.opacity = 0.1;
        }

        const hoverStlyes = (click.type === "line" && click.index === index && !props.activeBomb) ? {
          ...styles.vDoubleHeight,
          backgroundColor: "#FFC656",
          opacity: 1,
          borderWidth: 1,
          borderColor: "#BC9340"
        } : {};

        return (<View style={{
          ...styles.sideContainer,
          ...styles[positionClass.row],
          ...styles[positionClass.col]
        }} key={index}>
          <TouchableOpacity onPress={() => {
            if(!isDisabled){
              const clickInfo = util.clickSide[index];
              const clickBox = util.getClick(clickInfo, disabledBoxes);
              props.clickBorder(clickBox.side, util.getBoxIndex(clickBox.box), "first");
            }
          }}>
            <View style={styles.vClickBox}>
              <View style={{
                ...additionalStlyes,
                ...styles.vSide,
                ...styles[bgColor],
                ...hoverStlyes
              }}>
                {/*<Text>{index}</Text>*/}
              </View>
            </View>
          </TouchableOpacity>
        </View>)
      })}

      <View style={styles.circleContainer} pointerEvents="none">
        {new Array(49).fill("").map((data, index) => {
          const disabledMapper = util.disabledDotConditions[index];
          const isDisabled = util.getDisabledStatus(disabledMapper, disabledBoxes);
          return (<View style={styles.circleBox} key={index}>
            <View style={{
              ...styles.circle,
              opacity: isDisabled ? 0 : 1
            }}>
              {/*<Text>{index}</Text>*/}
            </View>
          </View>)
        })}
      </View>

    </View>

    <View
      pointerEvents={props.activeBomb && props.activeBomb.length ? "none" : "auto"}
      style={{
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
        position: "absolute"
      }}
      {...getClickResponders()}
      // this make the empty view clickable
      collapsable={false}
    >
      {/*Object.keys(util.centerOfLine).map((data, index) => <View
          key={index}
          style={{
            position: "absolute",
            backgroundColor: "red",
            borderRadius: 10,
            height: 4,
            width: 4,
            top: util.centerOfLine[data][1],
            left: util.centerOfLine[data][0],
            padding: 0,
            margin: 0
          }}
        >
      </View>)*/}
    </View>

  </View>)
}

export default GameBoard;
