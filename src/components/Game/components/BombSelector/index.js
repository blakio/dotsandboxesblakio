import React from "react";

//state setup
import StateContext from "../../../State/State";
import Reducer from "../../../State/Reducer";
import InitialState from "../../../State/InitialState";
import Types from "../../../State/Types";
import Stretch from "../Stretch";

import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  Vibration
} from "react-native";

import Pointer from "../Pointer";

import { config } from "../../util/Settings";
import { images } from "../../util/Images";
import { util } from "../../util/Util";
import { sounds } from "../../Sounds";

const BombSelector = (props) => {

  const {
    currentLevelBombs,
    selectBomb,
    activeBomb,
    bombToClick
  } = props;

  const selectedBomb = (color) => {
    return {
      backgroundColor: color,
      borderRadius: 50
    }
  }

  const emptySpots = new Array(5 - currentLevelBombs.length);
  emptySpots.fill("")

  return (<View style={styles.bombSection} >

    {currentLevelBombs.map((data, index) => {
      let image;
      let style;
      if(data === "cheetah"){
        image = images.cheetahImg;
        style = styles.generalBombStlyes;
      } else if (data === "panther") {
        image = images.pantherImg
        style = styles.generalBombStlyes;
      } else if (data === "makeda") {
        image = images.makedaImg;
        style = styles.makedaBombStyle;
      }

      const isActiveBomb = (activeBomb === data + index);

      const getStyle = () => (activeBomb && !isActiveBomb) ? { opacity: 0.2 } : {};

      return (<TouchableOpacity key={index} onPress={() => selectBomb(data, index)}>
        <Stretch>
          <Animated.View
            style={getStyle()}
            removeClippedSubviews={true}>
            <Image
              style={style}
              source={image}
            />

            {(bombToClick === data) && <Pointer bomb={true}/>}
          </Animated.View>
        </Stretch>
      </TouchableOpacity>)
    })}

    {emptySpots.map((spot, index) => {
      return (<TouchableOpacity key={index} onPress={() => {
        sounds.wrong.setCurrentTime(0);
        Vibration.vibrate(200);
        sounds.wrong.play();
      }}>
        <Animated.View style={styles.empty}>
        </Animated.View>
      </TouchableOpacity>)
    })}

  </View>)
}

const styles = {
  empty: {
    height: 40,
    width: 40,
    margin: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 100
  },
  bombSection: {
    width: config.width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 4,
    position: "relative"
  },
  generalBombStlyes: {
    height: 40,
    width: 40,
    margin: 10
  },
  makedaBombStyle: {
    height: 40,
    width: 55,
    margin: 10
  }
}

export default BombSelector;
