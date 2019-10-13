import Types from "./Types"
import StateFunctions from "./StateFunctions"

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case Types.CHANGE_LEVEL:
      return StateFunctions.changeLevel(payload, state);
    case Types.SET_YOUR_SCORE:
      return StateFunctions.setScores(payload, state);
    case Types.SET_LEVEL:
      return StateFunctions.setLevel(payload, state);
    default:
      return state;
  }
}
