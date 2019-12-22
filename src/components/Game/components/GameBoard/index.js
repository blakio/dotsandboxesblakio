import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Vibration,
  Dimensions
} from "react-native";

import styles from "./styles";
import util from "./util.js"
import { images } from "../../util/Images";
import Stretch from "../Stretch"

const GameBoard = (props) => {

  const disabledBoxes = util.getDisabledBoxes(props.board);

  const vBoxes = new Array(42).fill("");
  const hBoxes = new Array(84).fill("");
  const selectedLines = util.getSelectedLines(util.getSelected(props.whoClickedTheLine), util.sideAndSquareMapper);

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
      borderWidth: 1,
      borderRadius: 2,
      borderColor: 'transparent',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      elevation: 1,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10
    }}
  >

    <View style={styles.squaresParent}>

      <View style={styles.squaresContainer}>
        {new Array(36).fill("").map((data, index) => {
          const bgColor = util.getScoreStatus(index, util.getWhoScored(props.whoScored));
          return (<TouchableOpacity
            key={index}
            onPress={() => clickGameBox(index)}
            >
            <View style={{
              ...styles.squares,
              ...styles[bgColor]
            }}>
              {props.footIndexes.includes(index) && <View style={styles.foot}>
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
          // additionalStlyes.backgroundColor = "#bbb";
          additionalStlyes.opacity = 0.2;
        }

        return (<View style={{
          ...styles.sideContainer,
          ...styles[positionClass.row],
          ...styles[positionClass.col]
        }} key={index}>
          <TouchableOpacity onPress={() => {
            if(!isDisabled){
              const clickInfo = util.clickSide[index];
              const click = util.getClick(clickInfo, disabledBoxes);
              props.clickBorder(click.side, util.getBoxIndex(click.box), "first");
            }
          }}>
            <View style={{
              ...additionalStlyes,
              ...styles.hSide,
              ...styles[bgColor],
              backgroundColor: "rgba(0, 0, 0, 0.2)"
            }}>
              {/*<Text>{index}</Text>*/}
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
          // additionalStlyes.backgroundColor = "#bbb";
          additionalStlyes.opacity = 0.2;
        }

        return (<View style={{
          ...styles.sideContainer,
          ...styles[positionClass.row],
          ...styles[positionClass.col]
        }} key={index}>
          <TouchableOpacity onPress={() => {
            if(!isDisabled){
              const clickInfo = util.clickSide[index];
              const click = util.getClick(clickInfo, disabledBoxes);
              props.clickBorder(click.side, util.getBoxIndex(click.box), "first");
            }
          }}>
            <View style={{
              ...additionalStlyes,
              ...styles.vSide,
              ...styles[bgColor],
              backgroundColor: "rgba(0, 0, 0, 0.2)"
            }}>
              {/*<Text>{index}</Text>*/}
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
      style={{
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
        position: "absolute"
      }}
      onStartShouldSetResponder={e => true}
      onResponderMove={e => {
        const locationX = e.nativeEvent.locationX;
        const locationY = e.nativeEvent.locationY;
        const lineClickPositions = util.lineClickPositions;
        const boxClickPositions = util.boxClickPositions;
        const click = util.getClickFromPostion(locationX, locationY, lineClickPositions, boxClickPositions);
        console.log(click)
      }}
    ></View>

  </View>)
}

export default GameBoard;
