export default InitialState = {
  scores: {
    yourScore: 0,
    computerScore: 0
  },
  currentLevel: "level1"
}

// const [, setCurrentLevel] = useState("level1");
// const [board, setBoard] = useState(util.breakRefAndCopy(gameBoards[currentLevel]));
// const [playerTurn, setPlayerTurn] = useState("first");
// const [borders, setBorders] = useState(util.breakRefAndCopy(boxInfo.borderCount));
// const [connectedBoxes, setConnectedBoxes] = useState(util.breakRefAndCopy(boxInfo.connectedBoxesObj));
// const [whoScored, setWhoScored] = useState(util.breakRefAndCopy(whoScoredObj));
// const [whoClickedTheLineTracker, setWhoClickedTheLineTracker] = useState(util.breakRefAndCopy(whoClickedTheLine));
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
