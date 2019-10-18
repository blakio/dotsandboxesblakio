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
    return { ...state, currentLevel: currentState.currentLevel, pastLevelScreen: true }
  },
  setPlayerTurn: (payload, state) => {
    const currentState = setFieldToPayload(payload, state, "playerTurn");
    return { ...state, playerTurn: currentState.playerTurn }
  }
}

export default StateFunctions;
