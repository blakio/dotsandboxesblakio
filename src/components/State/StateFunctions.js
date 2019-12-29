import { gameBoards } from "../Game/util/GameBoards";
import { boxInfo } from "../Game/util/BoxInfo";
import { sounds } from "../Game/Sounds";
import InitialState from "./InitialState";
import { config } from "../Game/util/Settings";
import { util } from "../Game/util/Util";

const breakRefAndCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

const setFieldToPayload = (payload, state, field) => {
  const currentState = breakRefAndCopy(state);
  currentState[field] = payload;
  return currentState;
}

const StateFunctions = {
  setScores: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.scores.yourScore = payload.playerOneScore;
    currentState.scores.computerScore = payload.playerTwoScore;
    return { ...state, scores: currentState.scores }
  },
  setLevel: (payload, state) => {
    const currentState = setFieldToPayload(payload, state, "currentLevel");
    const board = breakRefAndCopy(gameBoards[currentState.currentLevel]);
    return { ...state, currentLevel: currentState.currentLevel, board  }
  },
  setPlayerTurn: (payload, state) => {
    const currentState = setFieldToPayload(payload, state, "playerTurn");
    return { ...state, playerTurn: currentState.playerTurn }
  },
  setClickedLine: (payload, state) => {

    // set border as clicked
    const { boxName, side, isAdjBox, scoreTurn } = payload;
    const currentState = breakRefAndCopy(state);
    currentState.board[boxName].borders[side] = true;

    if(!isAdjBox){
      currentState.justNowScored = false;
    }

    // adjust the clicked border reference
    const borders = boxInfo.getBorderCounts(currentState.board);

    // set the score player
    if(borders[boxName] === 4){
      // play score sound
      sounds.score.setCurrentTime(0);
      sounds.score.setVolume(0.1);
      sounds.score.play();

      currentState.whoScored[boxName] = scoreTurn;
      // set score
      const player = (scoreTurn === "first") ? "yourScore" : "computerScore";
      const currentScore = currentState.scores[player];
      currentState.scores[player] = currentScore + 1;

      currentState.justNowScored = true;
      currentState.playerTurn = scoreTurn;
    } else {
      if(!isAdjBox && !currentState.justNowScored){
        const newTurnPlayer = (currentState.playerTurn === "first") ? "second" : "first";
        currentState.playerTurn = newTurnPlayer;
      }
    }

    // set who clicked the line
    currentState.whoClickedTheLine[boxName][side] = scoreTurn;

    return {
      ...state,
      board: currentState.board,
      borders,
      whoScored: currentState.whoScored,
      // scores: currentState.scores,
      playerTurn: currentState.playerTurn,
      whoClickedTheLine: currentState.whoClickedTheLine
    }
  },
  setGameBoard: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.board = gameBoards[payload];
    const boardTotalScore = util.getBoardScore(currentState.board);
    return { ...state, board: currentState.board, boardTotalScore }
  },
  setConnectedBoxes: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.connectedBoxes = payload;
    return { ...state, connectedBoxes: currentState.connectedBoxes }
  },
  setInitialFootIndexes: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.footIndexes = config.footSquares[payload];
    return { ...state, footIndexes: currentState.footIndexes }
  },
  setFootIndexes: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.footIndexes = payload;
    return { ...state, footIndexes: currentState.footIndexes }
  },
  setBorders: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.borders = payload;
    return { ...state, borders: currentState.borders }
  },
  setWhoClickedTheLine: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.whoClickedTheLine = payload;
    return { ...state, whoClickedTheLine: currentState.whoClickedTheLine }
  },
  setBoard: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.board = payload;
    return { ...state, board: currentState.board }
  },
  setWhoScored: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.whoScored = payload;
    return { ...state, whoScored: currentState.whoScored }
  },
  setTrainingPress: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.clickHelp = payload;
    return { ...state, clickHelp: currentState.clickHelp }
  }
}

export default StateFunctions;
