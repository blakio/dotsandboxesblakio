import { gameBoards } from "../Game/util/GameBoards";
import { boxInfo } from "../Game/util/BoxInfo";
import { whoScoredObj } from "../Game/util/WhoScored";
import { whoClickedTheLine } from "../Game/util/WhoClicked";
import { config } from "../Game/util/Settings";

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
  justNowScored: false,
  whoClickedTheLine: breakRefAndCopy(whoClickedTheLine),
  connectedBoxes: breakRefAndCopy(boxInfo.connectedBoxesObj),
  footIndexes: breakRefAndCopy(config.footSquares["level1"])
}
