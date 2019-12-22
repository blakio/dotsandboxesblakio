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
  StatusBar,
  Vibration
} from "react-native";

import SpriteSheet from "rn-sprite-sheet";
import * as Animatable from 'react-native-animatable';

import GameScoreBoard from "../components/GameScoreBoard";
import GameBlock from "../components/GameBlock";
import GameOver from "../components/GameOver";
import YouWin from "../components/YouWin";
import InformativeScreen from "../components/InformativeScreen";
import Pointer from "../components/Pointer";
import Training from "../Training";
import BackBtn from "../components/BackBtn";
import BombSelector from "../components/BombSelector";
import GameBoard from "../components/GameBoard";

import Testing from "../../../Testing"

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

  const { navigate } = props.navigation;

  const [state, dispatch] = useReducer(Reducer, InitialState);

  const {
    ...appState
  } = state;

  const levelParam = Util.get(appState, ["currentLevel"]);

  const [whoClickedTheLineTracker, setWhoClickedTheLineTracker] = useState(util.breakRefAndCopy(whoClickedTheLine));
  const [computerLastLineClick, setComputerLastLineClick] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [explodingBoxes, setExplodingBoxes] = useState({});
  const [activeBomb, setActiveBomb] = useState("");
  const [youWin, setYouWin] = useState(false);
  const [youLose, setYouLose] = useState(false);
  const [showInformativeScreen, setShowInformativeScreen] = useState(false)
  const [informationType, setInformationType] = useState(null)
  const [currentLevelBombs, setCurrentLevelBombs] = useState([]);
  const [consecutiveTurns, setConsecutiveTurns] = useState(0);
  const [screenText, setScreenText] = useState(screenText || "");
  const [training, setTraining] = useState("");
  const [bombToClick, setBombToClick] = useState(null);
  const [waitTime, setWaitTime] = useState(0);
  const [turns, setTurns] = useState(0);
  const [direction, setDirection] = useState(false);
  const [openTraining, setOpenTraining] = useState(trainRestrictions[levelParam].preText ? true : false);
  const [explosionSprites, setExplosionSprites] = useState([]);
  const [trainingSprites, setTrainingSprites] = useState([]);

  // play the game music
  props.navigation.addListener('willFocus', () => {
    sounds.inGameMusic.setCurrentTime(0);
    sounds.inGameMusic.play();
    sounds.inGameMusic.setNumberOfLoops(-1);
    sounds.inGameMusic.setVolume(0.4);
  });

  // stop the music when navigating away from the game page
  props.navigation.addListener('willBlur', () => {
    sounds.inGameMusic.setCurrentTime(0);
    sounds.inGameMusic.pause();
  })

  // used during debugging mode to see which move the computer will make
  const checkComputerMove = () => {
    const move = computerMove(Util.get(appState, ["borders"]), Util.get(appState, ["connectedBoxes"]), Util.get(appState, ["board"]), Util.get(appState, ["footIndexes"]));
  }

  // set the text that shows on the screen when reaching a consecutive box score per turn
  const showScreenText = (text) => {
    setScreenText(text)
    setTimeout(() => { setScreenText("") }, 1000);
  }



  ///////////////////// life cycle /////////////////////

  useEffect(() => {
    // the game music is turned down when closing the app
    AppState.addEventListener('change', nextAppState => {
      (nextAppState === 'active') ? sounds.inGameMusic.setVolume(0.4) : sounds.inGameMusic.setVolume(0);
    })

    // set the information screen
    const level = parseInt(levelParam.replace("level", ""));
    if(config.informationBoard.includes(level)){
      setShowInformativeScreen(true);
      const type = config.informationText[`${level}`];
      setInformationType(type)
    }

    // set the gameboard
    dispatch({
      type: Types.SET_GAME_BOARD,
      payload: levelParam
    })

    // set foot indexes
    dispatch({
      type: Types.SET_INITIAL_FOOT_INDEXES,
      payload: levelParam
    })
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const restriction = training && training.yourMoves && training.yourMoves[0];
      const bombToClick = (restriction && restriction.type === "explosionClick") ? restriction.bomb : null;
      setBombToClick(bombToClick)
    }, waitTime);

    const restriction = training.yourMoves && training.yourMoves[0];
    if(restriction && restriction.type ==="clickSide"){
      dispatch({
        type: Types.SET_TRAINING_PRESS,
        payload: {
          box: restriction.boxes[0],
          side: restriction.sides[0]
        }
      })
    } else if(restriction && restriction.type ==="boxClick"){
      dispatch({
        type: Types.SET_TRAINING_PRESS,
        payload: {
          box: restriction.clickBox,
          side: "middle"
        }
      })
    } else {
      dispatch({
        type: Types.SET_TRAINING_PRESS,
        payload: {
          box: null,
          side: null
        }
      })
    }
    if(restriction && restriction.boxes && restriction.boxes[0] && (Util.get(appState, ["clickHelp"]).box !== restriction.boxes[0])){
      trainingSprites[restriction.boxes[0]].play({
        type: "training",
        fps: 14,
        loop: true,
        resetAfterFinish: true,
        onFinish: () => {}
      })
    }
    if(restriction && restriction.clickBox && (Util.get(appState, ["clickHelp"]).box !== restriction.clickBox)){
      trainingSprites[restriction.clickBox].play({
        type: "training",
        fps: 14,
        loop: true,
        resetAfterFinish: true,
        onFinish: () => {}
      })
    }
  }, [training])

  useEffect(() => {
    const additionalTimeout = (levelParam === "level1") ? 500 : 0;
    setScores();
    setTimeout(() => {
      // only use logic if it is the computer turn. ex: "second" player
      if(Util.get(appState, ["playerTurn"]) === "second"){
        setConsecutiveTurns(0)

        // make training move
        if(training && training.computerMoves && training.computerMoves.length){
          const restriction = training.computerMoves[0];
          if(restriction.type === "clickSide"){
            clickBorder(restriction.side, restriction.box, "second");
            return removeComputerUsedMoveRestriction();
          }
        }
        // get a move for the computer to make
        const move = computerMove(Util.get(appState, ["borders"]), Util.get(appState, ["connectedBoxes"]), Util.get(appState, ["board"]), Util.get(appState, ["footIndexes"]), showScreenText);

        const yourScore = Util.get(appState, ["scores", "yourScore"]);
        const computerScore = Util.get(appState, ["scores", "computerScore"]);
        // if the computer has no moves and there are not obstacles
        if(!move && !Util.get(appState, ["footIndexes"]).length){
          return (yourScore > computerScore) ? setYouWin(true) : setYouLose(true);
        } else if (!move) {
          return setYouLose(true);
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

        const totalScore = Util.get(appState, ["scores", "yourScore"]) + Util.get(appState, ["scores", "computerScore"]);
        const scoredTotalPoints = totalScore === Util.get(appState, ["boardTotalScore"]);
        const obstacles = Util.get(appState, ["footIndexes"]).length;
        if(scoredTotalPoints && !obstacles){
          const yourScore = Util.get(appState, ["scores", "yourScore"]);
          const computerScore = Util.get(appState, ["scores", "computerScore"]);
          return (yourScore > computerScore) ? setYouWin(true) : setYouLose(true);
        } else if ((obstacles + totalScore) === Util.get(appState, ["boardTotalScore"])) {
          return setYouLose(true);
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
  }, [levelParam]);



  ///////////////////// functions /////////////////////
  const setScores = (obj) => {
    let playerOneScore = 0;
    let playerTwoScore = 0;

    const updatedScores = obj ? obj : appState.whoScored;
    for(let scored in updatedScores){
      if(updatedScores[scored] === "first"){
        playerOneScore++;
      } else if(updatedScores[scored] === "second"){
        playerTwoScore++;
      }
    }

    dispatch({
      type: Types.SET_SCORES,
      payload: { playerOneScore, playerTwoScore }
    })

    const atMaxScore = (playerOneScore + playerTwoScore) === Util.get(appState, ["boardTotalScore"]);
    if(atMaxScore && !youWin && !youLose){
      (playerOneScore > playerTwoScore) ? setYouWin(true) : setYouLose(true);
    }
  }

  const removeUsedMoveRestriction = () => {
    const yourMoves = util.breakRefAndCopy(training.yourMoves);
    const updatedMoves = yourMoves.slice(1, yourMoves.length);
    setTraining({ ...training, yourMoves: updatedMoves });
  }

  const removeComputerUsedMoveRestriction = () => {
    const computerMoves = util.breakRefAndCopy(training.computerMoves);
    const updatedMoves = computerMoves.slice(1, computerMoves.length);
    setTraining({ ...training, computerMoves: updatedMoves });
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
    const newConnectedBoxes = boxInfo.getNewConnectedBoxes(Util.get(appState, ["connectedBoxes"]), index);
    dispatch({
      type: Types.SET_CONNECTED_BOXES,
      payload: newConnectedBoxes
    })
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

    if((boxIndex || boxIndex === 0) && (adjBoxIndex || adjBoxIndex === 0)){
      setComputerLastClickedLine({boxes: [box, adjBox], sides: [boxSide, adjBoxSide]});
    } else if (boxIndex || boxIndex === 0) {
      setComputerLastClickedLine({boxes: [box], sides: [boxSide]});
    } else if (adjBoxIndex || adjBoxIndex === 0) {
      setComputerLastClickedLine({boxes: [adjBox], sides: [adjBoxSide]});
    }
  }

  const setSide = (boxName, side, isAdjBox, player) => {
    dispatch({
      type: Types.SET_CLICKED_LINE,
      payload: { boxName, side, isAdjBox, scoreTurn: player }
    })
  }

  const clickBorder = (side, index, player) => {
    if(Util.get(appState, ["playerTurn"]) !== player) return;

    // play wrong click sound if box has restrictions is not meet
    // or for out of turn clicks
    const hasPassedRestrictions = passedMoveRestrictions(index, side);
    const isYourTurn = player === Util.get(appState, ["playerTurn"])
    if(!hasPassedRestrictions || !isYourTurn){
      sounds.wrong.setCurrentTime(0);
      Vibration.vibrate(200);
      return sounds.wrong.play();
    }

    const isBombSelected = activeBomb.length
    if(isBombSelected) return setExplosionBoxes(index);

    const boxName = boxInfo.getBoxNameByIndex(index);
    const boxObj = boxInfo.getBoxObjByBoxName(Util.get(appState, ["board"]), boxName);
    const { disabled, borders } = boxObj;

    // play wrong click for boxes that are on the screen but not clickable
    if(!boxInfo.isClickable(Util.get(appState, ["board"])[boxName].borders, side)){
      if(!boxObj.disabled){
        sounds.wrong.setCurrentTime(0);
        Vibration.vibrate(200);
        return sounds.wrong.play()
      }
      return;
    }

    const { adjBoxSide, adjacentBoxIndex } = boxInfo.getAdjacentBoxInfo(Util.get(appState, ["board"]), side, index);
    const adjBoxName = boxInfo.getBoxNameByIndex(adjacentBoxIndex);

    if(adjacentBoxIndex){
      const adjBoxObj = boxInfo.getBoxObjByBoxName(Util.get(appState, ["board"]), `box${adjacentBoxIndex}`);
      if(adjBoxObj.disabled && disabled) return;
    }

    // prevent click when clicking on a disabled box and the adj box line isn't clickable
    if(disabled && adjacentBoxIndex){
      const oppositeSide = boxInfo.getOppositeSide(side);
      if(!boxInfo.isClickable(Util.get(appState, ["board"])[`box${adjacentBoxIndex}`].borders, oppositeSide)){
        return;
      }
    }

    // play wrong click sound if box has restrictions is not meet
    if(boxInfo.hasFootRestriction(Util.get(appState, ["footIndexes"]), index, adjacentBoxIndex)){
      sounds.wrong.setCurrentTime(0);
      Vibration.vibrate(200);
      return sounds.wrong.play();
    };

    const isAdjBox = false;
    setSide(boxName, side, isAdjBox, player);

    const updatedConnections = [];
    (!boxInfo.isDisabled(Util.get(appState, ["board"]), boxName)) && updatedConnections.push(index);

    if(adjacentBoxIndex || adjacentBoxIndex === 0){
      const isAdjBox = true;
      setSide(adjBoxName, adjBoxSide, isAdjBox, player);
      (!boxInfo.isDisabled(Util.get(appState, ["board"]), adjBoxName)) && updatedConnections.push(adjacentBoxIndex);
    }

    updatedConnections.length && adjustConnectedBoxes(updatedConnections);

    if((Util.get(appState, ["board"])[boxName] && !boxInfo.isDisabled(Util.get(appState, ["board"]), boxName)) ||
      (Util.get(appState, ["board"])[adjBoxName] && !boxInfo.isDisabled(Util.get(appState, ["board"]), adjBoxName))){
      setLineColor([index, adjacentBoxIndex], [side, adjBoxSide]);
    }

    // play line click sound
    sounds.lineClick.setCurrentTime(0);
    sounds.lineClick.play();

    setTurns(turns + 1);
  }

  const keys = Object.keys(Util.get(appState, ["board"]));

  const setExplosionBoxes = (boxIndex) => {
    const isActiveBombSelected = activeBomb.length;
    const isTurnPlayerMakingTheMove = Util.get(appState, ["playerTurn"]) === "first"
    if(!isActiveBombSelected || !isTurnPlayerMakingTheMove) return;

    setWaitTime(500);
    setDirection(false);

    const hasPassedRestrictions = passedMoveRestrictions(boxIndex, null, activeBomb);
    if(!hasPassedRestrictions){
      sounds.wrong.setCurrentTime(0);
      Vibration.vibrate(200);
      return sounds.wrong.play();
    }

    // play bomb sound
    sounds.explosion.setCurrentTime(0);
    sounds.explosion.play();

    // get bomb name
    const bomb = activeBomb.slice(0, -1);

    // remove bomb from the list
    const remainingBombs = [...currentLevelBombs];
    const bombIndex = remainingBombs.indexOf(bomb);
    remainingBombs.splice(bombIndex, 1);
    setCurrentLevelBombs(remainingBombs);

    // get the pattern for the explosions and play the sprite sheet
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

    const temp1 = {...Util.get(appState, ["whoScored"])}
    const temp2 = {...Util.get(appState, ["board"])}
    const temp3 = {...Util.get(appState, ["whoClickedTheLine"])}
    const temp4 = {...Util.get(appState, ["borders"])}
    const temp5 = {...Util.get(appState, ["connectedBoxes"])}
    const temp6 = [...Util.get(appState, ["footIndexes"])]

    const bombType = explosionSides[bomb][`box${boxIndex}`];
    for(let side in bombType){
      const sideIndex = boxInfo.getSideIndex(side);
      bombType[side].forEach(rowBoxIndex => {
        const box = `box${rowBoxIndex}`;
        temp1[box] = null;
        temp3[box][side] = null;
        temp2[box].borders[side] = null;
        temp5[box][sideIndex] = boxInfo.connectedBoxesObjRef[box][sideIndex];

        let newCount = temp4[box];
        if(newCount > 0){
          newCount = --temp4[box];
        }
        temp4[box] = newCount;

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

    dispatch({ type: Types.SET_WHO_SCORE, payload: temp1 });
    dispatch({ type: Types.SET_BOARD, payload: temp2 });
    dispatch({ type: Types.SET_WHO_CLICKED_THE_LINE, payload: temp3 });
    dispatch({ type: Types.SET_BORDERS, payload: temp4 });
    dispatch({ type: Types.SET_CONNECTED_BOXES, payload: temp5 });
    dispatch({ type: Types.SET_FOOT_INDEXES, payload: temp6 });
    setActiveBomb("");

    setScores(temp1);
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
      Vibration.vibrate(200);
      return sounds.wrong.play();
    }
    if(activeBomb === bomb + index){
      setDirectionText("bomb", false);
      return setActiveBomb("")
    }
    setActiveBomb(`${bomb}${index}`);
    setDirectionText("bomb", bomb);
  }

  const changeLevel = level => navigate("Loading", { level });

  const restartGame = () => changeLevel(levelParam);

  const nextLevel = () => {
    const level = parseInt(levelParam.replace("level", ""))
    const nextLevel = level + 1;
    changeLevel(`level${nextLevel}`);
  }

  const closeInformationScreen = () => setShowInformativeScreen(false);

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

  const explosionStyle = direction => (direction ? { color: "#FF5454" } : {});

  const pointerStyle = {
    top: { top: 0, left: 0, transform: [{ rotate: '0deg'}] },
    right: { top: 18, left: 24, transform: [{ rotate: '-90deg'}] },
    bottom: { top: 28, left: -18, transform: [{ rotate: '0deg'}] },
    left: { top: 0, left: 0, transform: [{ rotate: '-90deg'}] },
    middle: { top: 4, left: -18, transform: [{ rotate: '0deg'}] }
  }

  const getMarginTop = (side, box) => {
    const topSideBoes = [0, 1, 2, 3, 4, 5];
    let marginTop = 0;
    if(topSideBoes.includes(box) && side === "top"){
      marginTop = config.width * 0.9 / 30;
    }
    return marginTop;
  }

  const getMarginRight = (side, box) => {
    const rightSideBoxes = [5, 11, 17, 23, 29, 35];

    let marginRight = 0

    if(side === "top" || side === "bottom"){
      marginRight = config.width * 0.9 / 22;
    }
    if(side === "left"){
      marginRight = config.width * 0.9 / 8.3;
    }
    if(side === "right"){
      marginRight = config.width * 0.9 / 11;
    }

    if(rightSideBoxes.includes(box) && side === "left"){
      marginRight = 0;
    }

    if(rightSideBoxes.includes(box) && side === "right"){
      marginRight = 0;
    }

    return marginRight;
  }

  const getMarginBottom = (side, box) => {
    return 0;
  }

  const getMarginLeft = (side, box) => {
    const leftSideBoxes = [0, 6, 12, 18, 24, 30];
    const rightSideBoxes = [5, 11, 17, 23, 29, 35];

    let marginLeft = 0;
    if(leftSideBoxes.includes(box)){
      marginLeft = config.width * 0.9 / 12.5;
    }
    if(rightSideBoxes.includes(box) && side === "right"){
      marginLeft = config.width * 0.9 / 10.5;
    }
    return marginLeft;
  }

  const getLeft = (side, box) => {
    const rightSideBoxes = [5, 11, 17, 23, 29, 35];
    let left = (side === "top" || side === "bottom") ? 0 : -15;
    if(rightSideBoxes.includes(box) && side === "right"){
      left = -6;
    }
    return left;
  }

  ///////////////////// render /////////////////////
  return (<StateContext.Provider value={{ ...state, dispatch }}>
    <View style={styles.boardStyle}>
      <StatusBar hidden />

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
        opacity: activeBomb.length ? 0.8 : 0
      }}></View>

      <View style={{
        width: config.width * 0.9,
        height: config.width * 0.9,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
        position: "relative"
      }}>

        <View
          style={{
            position: "absolute",
            height: config.width,
            width: config.width,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {boxInfo.edgeBoxes.map((data, index) => {

            const { side, box } = data;
            const height = (side === "top" || side === "bottom") ? (config.width * 0.9 / 22) : (config.width * 0.9 / 8.3);
            const width = (side === "top" || side === "bottom") ? (config.width * 0.9 / 8.3) : (config.width * 0.9 / 22);
            const marginTop = getMarginTop(side, box);
            const marginRight = getMarginRight(side, box);
            const marginBottom = getMarginBottom(side, box);
            const marginLeft = getMarginLeft(side, box);
            const left = getLeft(side, box);

            return (<TouchableOpacity
                key={index}
                onPress={() => {
                  clickBorder(side, box, "first")
                }}
              >
              <View style={{
                height,
                width,
                marginTop,
                marginRight,
                marginBottom,
                marginLeft,
                position: "relative",
                left
              }}></View>
            </TouchableOpacity>)
          })}
        </View>


        {/*<View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          position: "relative"
          // box shadow css
          // borderWidth: 1,
          // borderRadius: 2,
          // borderColor: 'transparent',
          // borderBottomWidth: 0,
          // shadowColor: '#000',
          // shadowOffset: { width: 0, height: 8 },
          // shadowOpacity: 0.4,
          // shadowRadius: 2,
          // elevation: 1,
          // marginLeft: 5,
          // marginRight: 5,
          // marginTop: 10
        }}>
          {keys.map((data, index) => {

            const board = Util.get(appState, ["board"]);

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

            return (<View style={{position: "relative"}} key={index}>


              <GameBlock
                key={index}
                isDisabledBox={isDisabledBox}
                clickBorder={clickBorder}
                index={index}
                hasScored={hasScored}
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
                blinkingEdge={blinkingEdge}
                blinkingBox={blinkingBox}
                side={side}
                navigation={props.navigation}
                trainingBoxesSidesClick={trainingBoxesSidesClick}
                setDirectionText={setDirection}
                currentLevel={levelParam}/>


            </View>)})}
        </View>*/}

        <GameBoard
          footIndexes={Util.get(appState, ["footIndexes"])}
          clickBorder={clickBorder}
          whoClickedTheLine={Util.get(appState, ["whoClickedTheLine"])}
          board={Util.get(appState, ["board"])}
          whoScored={Util.get(appState, ["whoScored"])}
          setDirectionText={setDirection}
          sounds={sounds}
          setExplosionBoxes={setExplosionBoxes}
        />

        <View
          pointerEvents="none"
          style={{
            height: config.width * 0.9,
            width: config.width * 0.9,
            position: "absolute",
            flexWrap: "wrap",
            flexDirection: "row"
          }}
        >
          {Array.apply(null, Array(36)).map((el, index) => {
            const { box, side } = Util.get(appState, ["clickHelp"]);
            const gameBlockWidth = (config.width * 0.9) / 6;

            return (<TouchableOpacity
                key={index}
                onPress={() => trainingSprites[index].play({
                  type: "training",
                  fps: 24,
                  loop: true,
                  resetAfterFinish: false,
                  onFinish: () => {}
                })}
              >
                <View
                    style={{
                      height: gameBlockWidth,
                      width: gameBlockWidth,
                      opacity: ((box === index) && (Util.get(appState, ["playerTurn"]) === "first")) ? 1 : 0,
                      ...pointerStyle[side]
                    }}
                  >
                    <SpriteSheet
                      ref={ref => (trainingSprites[index] = ref)}
                      source={require('./selectHelp.png')}
                      columns={13}
                      rows={1}
                      height={120}
                      animations={{
                        training: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                      }}
                    />
                  </View>
            </TouchableOpacity>)})}
        </View>

        <View
          pointerEvents="none"
          style={{
            height: config.width * 0.9,
            width: config.width * 0.9,
            position: "absolute",
            flexWrap: "wrap",
            flexDirection: "row"
          }}
        >
          {Array.apply(null, Array(36)).map((el, index) => {
            const gameBlockWidth = (config.width * 0.9) / 6;

            return (<TouchableOpacity
                key={index}
                onPress={() => explosionSprites[index].play({
                  type: "explode",
                  fps: 24,
                  loop: false,
                  resetAfterFinish: false,
                  onFinish: () => {}
                })}
              >
                <View
                  style={{
                    height: gameBlockWidth,
                    width: gameBlockWidth,
                    top: -25,
                    left: -25
                  }}
                >
                  <SpriteSheet
                    ref={ref => (explosionSprites[index] = ref)}
                    source={require('./explosion4.png')}
                    columns={11}
                    rows={1}
                    width={100}
                    animations={{
                      explode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    }}
                  />
                </View>
            </TouchableOpacity>)
          })}
        </View>

      </View>

      <View style={{
        backgroundColor: "#270035",
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
          <Animatable.Text animation="pulse" iterationCount="infinite" style={{ ...styles.text, ...explosionStyle(direction) }}>{direction || "make more boxes to win"}</Animatable.Text>
        </TouchableOpacity>

        <GameScoreBoard
          yourScore={Util.get(appState, ["scores", ["yourScore"]])}
          computerScore={Util.get(appState, ["scores", ["computerScore"]])}
          playerTurn={Util.get(appState, ["playerTurn"])}
          navigation={props.navigation}
        />
      </View>

      {youLose && <GameOver restartGame={restartGame} />}

      {youWin &&
        <YouWin
          restartGame={restartGame}
          nextLevel={nextLevel}
          isLastBoard={levelParam === config.finalLevel}
        />}

      <BackBtn {...props} onGameScreen={true} restartGame={restartGame} />

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

PlayGame.navigationOptions = { header: null };

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
    fontFamily: "Raleway",
    textAlign: "center",
    fontSize: config.textWidth,
    textAlign: "center",
    margin: 0
  }
});
