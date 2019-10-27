const breakRefAndCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

export default {
  get: (state, values) => {
    if(values.length === 1){
      return breakRefAndCopy(state[values[0]])
    } else if (values.length === 2) {
      return breakRefAndCopy(state[values[0]][values[1]])
    } else if (values.length === 3) {
      return breakRefAndCopy(state[values[0]][values[1]][values[2]])
    } else if (values.length === 4) {
      return breakRefAndCopy(state[values[0]][values[1]][values[2]][values[3]])
    } else if (values.length === 5) {
      return breakRefAndCopy(state[values[0]][values[1]][values[2]][values[3]][values[4]])
    } else if (values.length === 6) {
      return breakRefAndCopy(state[values[0]][values[1]][values[2]][values[3]][values[4]][values[5]])
    }
  },
  breakRefAndCopy: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  }
}
