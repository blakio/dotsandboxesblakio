import { gameBoards } from "../Game/util/GameBoards";
import { boxInfo } from "../Game/util/BoxInfo";
import { whoScoredObj } from "../Game/util/WhoScored";

const breakRefAndCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

export default InitialState = {
  scores: {
    yourScore: 0,
    computerScore: 0
  },
  currentLevel: "level1",
  playerTurn: "first",
  board: breakRefAndCopy(gameBoards["level1"]),
  borders: breakRefAndCopy(boxInfo.borderCount),
  whoScored: breakRefAndCopy(whoScoredObj),
  justNowScored: false
}

// const [computerLastLineClick, setComputerLastLineClick] = useState(false);
// const [yourScore, setYourScore] = useState(0);
// const [computerScore, setComputerScore] = useState(0);
// const [gameOver, setGameOver] = useState(false);
// const [explodingBoxes, setExplodingBoxes] = useState({});
// const [activeBomb, setActiveBomb] = useState("");
// const [footIndexes, setFootIndexes] = useState(config.footSquares[currentLevel]);
// const [gameIsOver, setGameIsOver] = useState(false);
// const [youWin, setYouWin] = useState(false);
// const [boardTotalScore, setBoardTotalScore] = useState(util.getBoardScore(gameBoards[currentLevel]))
// const [showInformativeScreen, setShowInformativeScreen] = useState(false)
// const [informationType, setInformationType] = useState(null)
// const [viewPointer, setViewPointer] = useState(false);
// const [showBoard, setShowBoard] = useState(false);
// const [currentLevelBombs, setCurrentLevelBombs] = useState([]);
// const [consecutiveTurns, setConsecutiveTurns] = useState(0);
// const [screenText, setScreenText] = useState(screenText || "");
// const [helpText, setHelpText] = useState("");
// const [training, setTraining] = useState("");
// const [bombToClick, setBombToClick] = useState(null);
// const [waitTime, setWaitTime] = useState(0);
// const [turnText, setTurnText] = useState("your turn");
// const [turns, setTurns] = useState(0);
// const [aimBoxes, setAimBoxes] = useState([]);
// const [circleFlash, setCircleFlash] = useState({});
// const [direction, setDirection] = useState(false);
// const [computerTurn, setComputerTurn] = useState(false);
// const [openTraining, setOpenTraining] = useState(trainRestrictions[currentLevel].preText ? true : false);
