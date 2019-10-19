import React, { useState, useEffect, useReducer, useContext } from "react";

//state setup
import StateContext from "../../State/State";
import Reducer from "../../State/Reducer";
import InitialState from "../../State/InitialState";
import Types from "../../State/Types"

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet,
  AppState,
  StatusBar
} from "react-native";

import SpriteSheet from "rn-sprite-sheet";

import GameScoreBoard from "../components/GameScoreBoard";
import GameBlock from "../components/GameBlock";
import GameOver from "../components/GameOver";
import YouWin from "../components/YouWin";
import InformativeScreen from "../components/InformativeScreen";
import Pointer from "../components/Pointer";
import Training from "../Training";
import BackBtn from "../components/BackBtn";
import BombSelector from "../components/BombSelector"
import LevelScreen from "../LevelScreen"

import Util from "../Util";

import { gameBoards } from "../util/GameBoards";
import { boxInfo } from "../util/BoxInfo";
import { computerMove } from "../util/ComputerLogic";
import { whoClickedTheLine } from "../util/WhoClicked";
import { whoScoredObj } from "../util/WhoScored";
import { explosions, explosionSides } from "../util/ExplosionPattern";
import { config } from "../util/Settings";
import { images } from "../util/Images";
import { util } from "../util/Util";
import { connectedCorners } from "../util/ConnectedCorners";
import { trainRestrictions } from "../util/Training";
import { sounds } from "../Sounds";

const PlayGame = (props) => {

  const levelParam = props.navigation.getParam("level");

  const [state, dispatch] = useReducer(Reducer, InitialState);

  const {
    ...appState
  } = state;

  // const [borders, setBorders] = useState(util.breakRefAndCopy(boxInfo.borderCount));
  const [connectedBoxes, setConnectedBoxes] = useState(util.breakRefAndCopy(boxInfo.connectedBoxesObj));
  const [whoScored, setWhoScored] = useState(util.breakRefAndCopy(whoScoredObj));
  const [whoClickedTheLineTracker, setWhoClickedTheLineTracker] = useState(util.breakRefAndCopy(whoClickedTheLine));
  const [computerLastLineClick, setComputerLastLineClick] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [explodingBoxes, setExplodingBoxes] = useState({});
  const [activeBomb, setActiveBomb] = useState("");
  const [footIndexes, setFootIndexes] = useState(config.footSquares[levelParam]);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [youWin, setYouWin] = useState(false);
  const [boardTotalScore, setBoardTotalScore] = useState(util.getBoardScore(gameBoards[levelParam]))
  const [showInformativeScreen, setShowInformativeScreen] = useState(false)
  const [informationType, setInformationType] = useState(null)
  const [viewPointer, setViewPointer] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [currentLevelBombs, setCurrentLevelBombs] = useState([]);
  const [consecutiveTurns, setConsecutiveTurns] = useState(0);
  const [screenText, setScreenText] = useState(screenText || "");
  const [training, setTraining] = useState("");
  const [bombToClick, setBombToClick] = useState(null);
  const [waitTime, setWaitTime] = useState(0);
  const [turnText, setTurnText] = useState("your turn");
  const [turns, setTurns] = useState(0);
  const [aimBoxes, setAimBoxes] = useState([]);
  const [circleFlash, setCircleFlash] = useState({});
  const [direction, setDirection] = useState(false);
  const [computerTurn, setComputerTurn] = useState(false);
  const [openTraining, setOpenTraining] = useState(trainRestrictions[levelParam].preText ? true : false);
  const [explosionSprites, setExplosionSprites] = useState([]);

  // the game music is turned down when closing the app
  useEffect(() => {
    AppState.addEventListener('change', nextAppState => {
      (nextAppState === 'active') ? sounds.inGameMusic.setVolume(0.4) : sounds.inGameMusic.setVolume(0);
    })
  }, []);

  // play the game music
  const playGameMusic = () => {
    sounds.inGameMusic.setCurrentTime(0);
    sounds.inGameMusic.play();
    sounds.inGameMusic.setNumberOfLoops(-1);
    sounds.inGameMusic.setVolume(0.4);
  }
  props.navigation.addListener('willFocus', () => { playGameMusic() });

  // stop the music when navigating away from the game page
  props.navigation.addListener('willBlur', () => {
    sounds.inGameMusic.setCurrentTime(0);
    sounds.inGameMusic.pause();
  })

  // used during debugging mode to see which move the computer will make
  const checkComputerMove = () => {
    const move = computerMove(Util.get(appState, ["borders"]), connectedBoxes, gameBoards[levelParam], footIndexes);
  }

  // set the text that shows on the screen when reaching a consectutive boxes per turn
  const showScreenText = (text) => {
    setScreenText(text)
    setTimeout(() => { setScreenText("") }, 1000);
  }



  ///////////////////// life cycle /////////////////////

  useEffect(() => {
    setTimeout(() => {
      const restriction = training && training.yourMoves && training.yourMoves[0];
      setAimBoxes(restriction.aimBoxes || []);
      if(restriction && restriction.type === "explosionClick"){
        setBombToClick(restriction.bomb);
      } else {
        setBombToClick(null);
      }
    }, waitTime);
  }, [training])

  useEffect(() => {
    const additionalTimeout = (levelParam === "level1") ? 500 : 0;
    setTimeout(() => {
      // only use logic if it is the computer turn. ex: "second" player
      if(Util.get(appState, ["playerTurn"]) === "second"){
        setComputerTurn(true);
        setConsecutiveTurns(0)

        if(training && training.computerMoves && training.computerMoves.length){
          const restriction = training.computerMoves[0];
          if(restriction.type === "clickSide"){
            clickBorder(restriction.side, restriction.box, "second");
            return removeComputerUsedMoveRestriction();
          }
        }

        // get a move for the computer to make
        const move = computerMove(Util.get(appState, ["borders"]), connectedBoxes, gameBoards[levelParam], footIndexes, showScreenText);
        // if the move is empty the computer has no moves
        if(!move && !footIndexes.length){
          setYouWin(Util.get(appState, ["scores", ["yourScore"]]) > Util.get(appState, ["scores", ["computerScore"]]));
          return setGameIsOver(true);
        } else if (!move) {
          setYouWin(false)
          return setGameIsOver(true);
        }
        // if the move is not empty make a computer mover
        clickBorder(move.side, move.index, "second");
      } else {

        if(Util.get(appState, ["scores", ["yourScore"]]) > 0){
          setConsecutiveTurns(consecutiveTurns + 1);
          if(consecutiveTurns === 4){
            showScreenText("I SEE YOU");
            sounds.iseeu.play();
          } else if (consecutiveTurns === 7) {
            showScreenText("OKAY")
            sounds.okay.play();
          }
        }

        const totalScore = Util.get(appState, ["scores", ["yourScore"]]) + Util.get(appState, ["scores", ["computerScore"]]);
        const aboutToScoreLastPoint = boardTotalScore - 1
        if(totalScore === aboutToScoreLastPoint && !footIndexes.length){
          setYouWin(Util.get(appState, ["scores", ["yourScore"]]) > Util.get(appState, ["scores", ["computerScore"]]));
          return setGameIsOver(true);
        }
      }
    }, 500)
  }, [turns]); // this is only used if borders or connectedBoxes change

  useEffect(() => {
    setTimeout(() => {
      const setDefaultBombs = async () => {
        setCurrentLevelBombs(config.levelDefaultBombs[levelParam])
      }
      setDefaultBombs();
      setTraining(util.breakRefAndCopy(trainRestrictions[levelParam]));
    }, waitTime)
  }, [levelParam])



  ///////////////////// functions /////////////////////
  const removeUsedMoveRestriction = () => {
    const yourMoves = util.breakRefAndCopy(training.yourMoves);
    const updatedMoves = yourMoves.slice(1, yourMoves.length);
    setTraining({
      ...training,
      yourMoves: updatedMoves
    });
  }

  const removeComputerUsedMoveRestriction = () => {
    const computerMoves = util.breakRefAndCopy(training.computerMoves);
    const updatedMoves = computerMoves.slice(1, computerMoves.length);
    setTraining({
      ...training,
      computerMoves: updatedMoves
    });
  }

  const passedMoveRestrictions = ( clickBox = null, side = null, bomb = null ) => {
    if(Util.get(appState, ["playerTurn"]) !== "first") return true;

    let passedRestrictions = true;
    if(training && training.yourMoves.length){

      const restriction = training.yourMoves[0];

      if(restriction.type === "explosionClick"){
        if(bomb && (bomb === restriction.bomb)){
          passedRestrictions = true;
          removeUsedMoveRestriction();
        } else {
          passedRestrictions = false;
        }
      } else if(restriction.type === "boxClick"){
        if(clickBox && (clickBox === restriction.clickBox) && !side){
          passedRestrictions = true;
          removeUsedMoveRestriction();
        } else {
          passedRestrictions = false;
        }
      } else if (restriction.type === "clickSide"){
        if(clickBox && side && restriction.boxes.includes(clickBox)){
          const index = restriction.boxes.indexOf(clickBox);
          if(side === restriction.sides[index]){
            passedRestrictions = true;
            removeUsedMoveRestriction();
          } else {
            passedRestrictions = false;
          }
        } else {
          passedRestrictions = false;
        }
      } else if (restriction.text) {
        removeUsedMoveRestriction();
      }

    }

    return passedRestrictions;
  }

  const adjustConnectedBoxes = (index) => {
    const temp = boxInfo.getNewConnectedBoxes(connectedBoxes, index);
    setConnectedBoxes({ ...temp });
  }

  const setComputerLastClickedLine = (state) => {
    (Util.get(appState, ["playerTurn"]) === "second") ? setComputerLastLineClick(state) : setComputerLastLineClick(false);
  }

  const setLineColor = (indexes, sides) => {
    const boxIndex = indexes[0];
    const box = boxInfo.getBoxNameByIndex(boxIndex);
    const boxSide = sides[0];

    const adjBoxIndex = indexes[1];
    const adjBox = boxInfo.getBoxNameByIndex(adjBoxIndex);
    const adjBoxSide = sides[1];

    const linesClickedObj = {};

    const temp = {...whoClickedTheLineTracker};
    if((boxIndex || boxIndex === 0) && (adjBoxIndex || adjBoxIndex === 0)){
      temp[box][boxSide] = Util.get(appState, ["playerTurn"]);
      temp[adjBox][adjBoxSide] = Util.get(appState, ["playerTurn"]);
      setComputerLastClickedLine({boxes: [box, adjBox], sides: [boxSide, adjBoxSide]});
    } else if (boxIndex || boxIndex === 0) {
      temp[box][boxSide] = Util.get(appState, ["playerTurn"]);
      setComputerLastClickedLine({boxes: [box], sides: [boxSide]});
    } else if (adjBoxIndex || adjBoxIndex === 0) {
      temp[adjBox][adjBoxSide] = Util.get(appState, ["playerTurn"]);
      setComputerLastClickedLine({boxes: [adjBox], sides: [adjBoxSide]});
    }
    setWhoClickedTheLineTracker({
      ...temp
    })
  }

  const setSide = (boxName, side, adjBox, player) => {
    dispatch({
      type: Types.SET_CLICKED_LINE,
      payload: { boxName, side, adjBox, scoreTurn: player }
    })
    if(!adjBox) setTurns(turns + 1);
  }

  const clickBorder = (side, index, player) => {
    if(Util.get(appState, ["playerTurn"]) !== player) return;

    if(!passedMoveRestrictions(index, side)){
      sounds.wrong.setCurrentTime(0);
      return sounds.wrong.play();
    }

    if(player !== Util.get(appState, ["playerTurn"])){
      sounds.wrong.setCurrentTime(0);
      return sounds.wrong.play()
    }

    if(activeBomb.length){
      return setExplosionBoxes(index);
    }

    const trainingBoxesSidesClick = {};
    if(Util.get(appState, ["playerTurn"]) === "first"){
      const corner = util.getCornersFromSide(side);
      const boxCornerData = connectedCorners[index];
      corner.map(data => {
        if(trainingBoxesSidesClick[`box${index}`]){
          trainingBoxesSidesClick[`box${index}`].push(data);
        } else {
          trainingBoxesSidesClick[`box${index}`] = [data];
        }
        boxCornerData[data].map(d => {
          if(trainingBoxesSidesClick[`box${d.box}`]){
            trainingBoxesSidesClick[`box${d.box}`].push(d.corner);
          } else {
            trainingBoxesSidesClick[`box${d.box}`] = [d.corner];
          }
        })
      })
    }
    setCircleFlash(trainingBoxesSidesClick);

    const boxName = boxInfo.getBoxNameByIndex(index);
    const boxObj = boxInfo.getBoxObjByBoxName(gameBoards[levelParam], boxName);
    const { disabled, borders } = boxObj;
    if(!boxInfo.isClickable(Util.get(appState, ["borders"]), side)){
      if(!disabled){
        sounds.wrong.setCurrentTime(0);
        return sounds.wrong.play()
      }
      return;
    }

    const { adjBoxSide, adjacentBoxIndex } = boxInfo.getAdjacentBoxInfo(gameBoards[levelParam], side, index);
    const adjBoxName = boxInfo.getBoxNameByIndex(adjacentBoxIndex);

    if(boxInfo.hasFootRestriction(footIndexes, index, adjacentBoxIndex)){
      sounds.wrong.setCurrentTime(0);
      return sounds.wrong.play();
    };

    setSide(boxName, side, null, player);

    const updatedConnections = [];
    (!boxInfo.isDisabled(gameBoards[levelParam], boxName)) && updatedConnections.push(index);

    if(adjacentBoxIndex || adjacentBoxIndex === 0){
      setSide(adjBoxName, adjBoxSide, "adjBox", player);
      (!boxInfo.isDisabled(gameBoards[levelParam], adjBoxName)) && updatedConnections.push(adjacentBoxIndex);
    }

    updatedConnections.length && adjustConnectedBoxes(updatedConnections);

    const hasScored = boxInfo.hasScored(gameBoards[levelParam], index, adjacentBoxIndex);
    if((gameBoards[levelParam][boxName] && !boxInfo.isDisabled(gameBoards[levelParam], boxName)) ||
      (gameBoards[levelParam][adjBoxName] && !boxInfo.isDisabled(gameBoards[levelParam], adjBoxName))){
      setLineColor([index, adjacentBoxIndex], [side, adjBoxSide]);
    }
  }

  const keys = Object.keys(gameBoards[levelParam]);

  const setExplosionBoxes = (boxIndex) => {
    if(!activeBomb.length || (Util.get(appState, ["playerTurn"]) !== "first")) return;

    setWaitTime(500);

    setDirection(false);

    if(!passedMoveRestrictions(boxIndex, null, activeBomb)){
      sounds.wrong.setCurrentTime(0);
      return sounds.wrong.play();
    }

    sounds.explosion.setCurrentTime(0);
    sounds.explosion.play();

    const bomb = activeBomb.slice(0, -1);

    const temp7 = [...currentLevelBombs];
    const bombIndex = temp7.indexOf(bomb);
    temp7.splice(bombIndex, 1);
    setCurrentLevelBombs(temp7);

    const temp = boxInfo.getLightPattern(explosions, bomb, boxIndex);

    for(let index in temp){
      explosionSprites[index].play({
        type: "explode",
        fps: 14,
        loop: false,
        resetAfterFinish: true,
        onFinish: () => {}
      })
    }

    const temp3 = {...whoClickedTheLineTracker}
    const temp4 = {...Util.get(appState, ["borders"])}
    const temp5 = {...connectedBoxes}
    const temp6 = [...footIndexes]

    const bombType = explosionSides[bomb][`box${boxIndex}`];
    for(let side in bombType){
      const sideIndex = boxInfo.getSideIndex(side);
      bombType[side].forEach(rowBoxIndex => {
        temp3[`box${rowBoxIndex}`][side] = null;
        temp5[`box${rowBoxIndex}`][sideIndex] = boxInfo.connectedBoxesObjRef[`box${rowBoxIndex}`][sideIndex];
        whoScored[`box${rowBoxIndex}`] = null;

        let newCount = temp4[`box${rowBoxIndex}`];
        if(newCount > 0){
          newCount = temp4[`box${rowBoxIndex}`]--;
        }
        temp4[`box${rowBoxIndex}`] = newCount;

        const boxName = boxInfo.getBoxNameByIndex(rowBoxIndex);
        if(computerLastLineClick.boxes && computerLastLineClick.boxes.includes(boxName)){
          const boxIndexInLastClicked = computerLastLineClick.boxes.indexOf(boxName);
          if(computerLastLineClick.sides[boxIndexInLastClicked] === side){
            const temp = {...computerLastLineClick};
            temp.boxes.splice(boxIndexInLastClicked, 1);
            temp.sides.splice(boxIndexInLastClicked, 1);
            setComputerLastLineClick(temp);
          }
        }

        const indexInFootArray = temp6.indexOf(rowBoxIndex)
        const isFootBox = indexInFootArray > -1;
        if(isFootBox){
          temp6.splice(indexInFootArray, 1)
        }
      });
    }

    // setBorders(temp4);
    setConnectedBoxes(temp5);
    setFootIndexes(temp6);
    setActiveBomb("");
  }

  const setDirectionText = (type, bomb) => {
    if(type === "bomb"){
      if(!bomb){
        setDirection(false);
      } else if (bomb === "panther") {
        setDirection("explodes up and down");
      } else if (bomb === "cheetah") {
        setDirection("explodes left and right");
      } else if (bomb === "makeda") {
        setDirection("explodes in a cross");
      }
    }
  }

  const selectBomb = (bomb, index) => {
    if(!passedMoveRestrictions(null, null, bomb)){
      sounds.wrong.setCurrentTime(0);
      return sounds.wrong.play();
    }
    if(activeBomb === bomb + index){
      setDirectionText("bomb", false);
      return setActiveBomb("")
    }
    setActiveBomb(`${bomb}${index}`);
    setDirectionText("bomb", bomb);
  }

  const changeLevel = (level, levelText) => {
    dispatch({ type: Types.RESET_STATE });
    dispatch({ type: Types.SET_LEVEL, payload: level });

    // setDirection(false);
    // setScreenText("")
    // if((levelText !== "x" || !levelText)){
    //   setComputerTurn(false)
    //   dispatch({ type: Types.SET_PLAYER_TURN, payload: "first" });
    //   // setBorders(util.breakRefAndCopy(boxInfo.borderCount));
    //   setConnectedBoxes(util.breakRefAndCopy(boxInfo.connectedBoxesObj));
    //   setWhoScored(util.breakRefAndCopy(whoScoredObj));
    //   setWhoClickedTheLineTracker(util.breakRefAndCopy(whoClickedTheLine));
    //   setComputerLastLineClick(false);
    //   dispatch({ type: Types.SET_YOUR_SCORE, payload: { playerOneScore: 0, playerTwoScore: 0 } });
    //   setGameOver(false);
    //   setExplodingBoxes({});
    //   setActiveBomb("");
    //   setFootIndexes(util.breakRefAndCopy(config.footSquares[level]));
    //   setGameIsOver(false);
    //   setYouWin(false);
    //   setBoardTotalScore(util.getBoardScore(gameBoards[level]));
    //   setOpenTraining(trainRestrictions[level].preText ? true : false);
    //   if(config.informationBoard.includes(levelText)){
    //     setShowInformativeScreen(true);
    //     const type = config.informationText[`${levelText}`];
    //     setInformationType(type)
    //   }
    // }
  }

  const restartGame = () => {
    changeLevel(levelParam, parseInt(level.replace("level", "")));
  }

  const nextLevel = () => {
    const level = parseInt(levelParam.replace("level", ""))
    const nextLevel = level + 1;
    changeLevel(`level${nextLevel}`, nextLevel);
    setGameIsOver(false);
  }

  const closeInformationScreen = () => {
    setShowInformativeScreen(false);
  }

  let colorAnimation = new Animated.Value(0);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnimation, {
          toValue: 1,
          duration: 1000
        }),
        Animated.timing(colorAnimation, {
          toValue: 0,
          duration: 1000
        })
      ]),
      {
        iterations: 4
      }
    ).start();
  }

  startAnimation();

  const letterColor = colorAnimation.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ '#b57800', 'transparent' ]
  });

  props.navigation.addListener('willBlur', () => {
    colorAnimation.stopAnimation();
  })

  const trainingBoxesSidesClick = {};
  if(training !== "" && Util.get(appState, ["playerTurn"]) === "first"){
    const {yourMoves} = training;
    if(yourMoves[0].type === "clickSide"){
      const boxNumber = yourMoves[0].boxes[0];
      const side = yourMoves[0].sides[0];
      const corner = util.getCornersFromSide(side);
      const boxCornerData = connectedCorners[boxNumber];
      corner.map(data => {
        if(trainingBoxesSidesClick[`box${boxNumber}`]){
          trainingBoxesSidesClick[`box${boxNumber}`].push(data);
        } else {
          trainingBoxesSidesClick[`box${boxNumber}`] = [data];
        }
        boxCornerData[data].map(d => {
          if(trainingBoxesSidesClick[`box${d.box}`]){
            trainingBoxesSidesClick[`box${d.box}`].push(d.corner);
          } else {
            trainingBoxesSidesClick[`box${d.box}`] = [d.corner];
          }
        })
      })
    }
  }

  // if(!state.pastLevelScreen){
  //   return <LevelScreen {...props} dispatch={dispatch} />
  // }

  ///////////////////// render /////////////////////
  return (<StateContext.Provider value={{ ...state, dispatch }}>
    <View style={styles.boardStyle}>
      <StatusBar hidden />

      <Image style={styles.imgStyle} source={images.background} />

      <View style={{
        position: "absolute",
        top: 100,
        zIndex: 100,
        width: config.width,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.8
      }} pointerEvents="none">
        <Text style={{
          color: "#b57800",
          fontSize: 120,
          fontFamily: "Raleway-ExtraBold",
          textAlign: "center"
        }}>{screenText}</Text>
      </View>

      <View style={{
        height: config.height,
        width: config.width,
        backgroundColor: util.darkPurple,
        position: "absolute",
        top: 0,
        left: 0,
        opacity: activeBomb.length ? 0.6 : 0
      }}></View>

      <View style={{
        width: config.width,
        height: config.width,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        marginBottom: config.height * 0.03,
        position: "relative"
      }}>
        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          padding: config.width * 0.07
        }}>
          {keys.map((data, index) => {

            const board = gameBoards[levelParam];

            const {
              disabled,
              borders
            } = board[data];
            const {
              isTopRightCornerBox,
              isTopLeftCornerBox,
              isBottomRightCornerBox,
              isBottomLeftCornerBox,
              isTopSideRow,
              isRightSideRow,
              isBottomSideRow,
              isLeftSideRow
            } = boxInfo.getSidesInfo(board, index);
            const box = boxInfo.getBoxNameByIndex(index)
            const isDisabledBox = disabled || false;

            const hasScored = board[box].borders.top && board[box].borders.right && board[box].borders.bottom && board[box].borders.left;
            const borderColors = boxInfo.getBorderColors(box, whoClickedTheLineTracker);

            const restriction = training && training.yourMoves && training.yourMoves[0];

            let blinkingEdge = false;
            let blinkingBox = false;

            if (restriction && restriction.type === "clickSide" && Util.get(appState, ["playerTurn"]) === "first"){
              const restrictionIndex = restriction.boxes.indexOf(index);
              blinkingEdge = (restrictionIndex !== -1) && restriction.sides[restrictionIndex];
            }

            if(restriction && (restriction.type === "boxClick") && (Util.get(appState, ["playerTurn"]) === "first") && (index === restriction.clickBox)){
              blinkingBox = true;
            }

            let side = false;
            if(blinkingEdge === "top"){
              side = "top";
            } else if (blinkingEdge === "left") {
              side = "right";
            } else if (blinkingBox) {
              side = "box";
            }

            return (<GameBlock
              key={index}
              isDisabledBox={isDisabledBox}
              clickBorder={clickBorder}
              index={index}
              hasScored={hasScored}
              borderColors={borderColors}
              computerLastLineClick={computerLastLineClick}
              boxName={box}
              isTopRightCornerBox={isTopRightCornerBox}
              isTopLeftCornerBox={isTopLeftCornerBox}
              isBottomRightCornerBox={isBottomRightCornerBox}
              isBottomLeftCornerBox={isBottomLeftCornerBox}
              isTopSideRow={isTopSideRow}
              isRightSideRow={isRightSideRow}
              isBottomSideRow={isBottomSideRow}
              isLeftSideRow={isLeftSideRow}
              explodingBoxes={explodingBoxes}
              setExplosionBoxes={setExplosionBoxes}
              footIndexes={footIndexes}
              blinkingEdge={blinkingEdge}
              blinkingBox={blinkingBox}
              side={side}
              navigation={props.navigation}
              trainingBoxesSidesClick={trainingBoxesSidesClick}
              aimBoxes={aimBoxes}
              circleFlash={circleFlash}
              setDirectionText={setDirection}
              currentLevel={levelParam}/>)})}
        </View>
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
          {Array.apply(null, Array(36)).map((el, index) => (<TouchableOpacity
              key={index}
              onPress={() => explosionSprites[index].play({
                type: "explode",
                fps: 14,
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
                  ref={ref => (explosionSprites[index] = ref)}
                  source={require('./explosionSprite.png')}
                  columns={11}
                  rows={1}
                  width={100}
                  animations={{
                    explode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                  }}
                />
              </View>
          </TouchableOpacity>))}
        </View>
      </View>

      <View style={{
        backgroundColor: "rgb(39,0,56)",
        position: "absolute",
        bottom: 0,
        paddingTop: 20,
        paddingBottom: 50
      }}>

        <BombSelector
          currentLevelBombs={currentLevelBombs}
          selectBomb={selectBomb}
          activeBomb={activeBomb}
          bombToClick={bombToClick}
        />

        <TouchableOpacity
          onPress={config.isDebuggingMode ? () => { checkComputerMove() } : null}>
          <Text style={styles.text}>{direction || "make more boxes to win"}</Text>
        </TouchableOpacity>

        <GameScoreBoard
          yourScore={Util.get(appState, ["scores", ["yourScore"]])}
          computerScore={Util.get(appState, ["scores", ["computerScore"]])}
          playerTurn={Util.get(appState, ["playerTurn"])}
          navigation={props.navigation}
        />
      </View>

      {gameIsOver && !youWin &&
        <GameOver
          restartGame={restartGame}
        />}

      {gameIsOver && youWin &&
        <YouWin
          restartGame={restartGame}
          nextLevel={nextLevel}
          isLastBoard={levelParam === config.finalLevel}
        />}

      <BackBtn {...props} />

      { openTraining && trainRestrictions[levelParam].preText &&
        <Training
          text={trainRestrictions[levelParam].preText}
          openTraining={setOpenTraining}/>}

      {showInformativeScreen && <InformativeScreen
          facts={informationType}
          close={closeInformationScreen}
        />}

    </View>
  </StateContext.Provider>)

}

PlayGame.navigationOptions = {
  header: null
};

export default PlayGame;

const styles = StyleSheet.create({
  boardStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: config.height,
    width: config.width
  },
  imgStyle: {
    width: config.width,
    height: config.height,
    position: "absolute",
    top: 0,
    left: 0
  },
  text: {
    color: "#fff",
    fontFamily: "Raleway-Light",
    textAlign: "center",
    fontSize: config.width * 0.068,
    textAlign: "center",
    opacity: 0.8,
    margin: 0
  }
});
