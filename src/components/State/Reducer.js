import Types from "./Types"
import StateFunctions from "./StateFunctions"

export default (state, action) => {
  const { payload, type } = action;

  console.table(payload, type)

  switch (type) {
    case Types.SET_YOUR_SCORE:
      return StateFunctions.setScores(payload, state);
    case Types.SET_LEVEL:
      return StateFunctions.setLevel(payload, state);
    case Types.SET_PLAYER_TURN:
      return StateFunctions.setPlayerTurn(payload, state);
    default:
      return state;
  }
}
