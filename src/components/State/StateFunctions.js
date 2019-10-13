const breakRefAndCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

const StateFunctions = {
  changeLevel: (payload, state) => {
    return state;
  },
  setScores: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.scores.yourScore = payload.playerOneScore;
    currentState.scores.computerScore = payload.playerTwoScore;
    return {
      ...state,
      scores: currentState.scores
    };
  },
  setLevel: (payload, state) => {
    const currentState = breakRefAndCopy(state);
    currentState.currentLevel = payload;
    return {
      ...state,
      currentLevel: currentState.currentLevel
    }
  }
}

export default StateFunctions;
