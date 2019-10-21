import Types from "./Types"
import StateFunctions from "./StateFunctions"

export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case Types.RESET_STATE:
      return StateFunctions.resetState(payload, state);
    case Types.SET_YOUR_SCORE:
      return StateFunctions.setScores(payload, state);
    case Types.SET_LEVEL:
      return StateFunctions.setLevel(payload, state);
    case Types.SET_PLAYER_TURN:
      return StateFunctions.setPlayerTurn(payload, state);
    case Types.SET_CLICKED_LINE:
      return StateFunctions.setClickedLine(payload, state);
    case Types.SET_GAME_BOARD:
      return StateFunctions.setGameBoard(payload, state);
    case Types.SET_CONNECTED_BOXES:
      return StateFunctions.setConnectedBoxes(payload, state);
    case Types.SET_INITIAL_FOOT_INDEXES:
      return StateFunctions.setInitialFootIndexes(payload, state);
    case Types.SET_FOOT_INDEXES:
      return StateFunctions.setFootIndexes(payload, state);
    case Types.SET_BORDERS:
      return StateFunctions.setBorders(payload, state);
    case Types.SET_WHO_CLICKED_THE_LINE:
      return StateFunctions.setWhoClickedTheLine(payload, state);
    case Types.SET_BOARD:
      return StateFunctions.setBoard(payload, state);
    case Types.SET_WHO_SCORE:
      return StateFunctions.setWhoScored(payload, state);
    default:
      return state;
  }
}
