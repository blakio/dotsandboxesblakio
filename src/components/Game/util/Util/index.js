export const util = {
  breakRefAndCopy: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },

  getBoardScore: (board) => {
    let totalScore = 0;
    for(let box in board){
      if(!board[box].disabled){
        totalScore++;
      }
    }
    return totalScore;
  },

  getCornersFromSide: (side) => {
    if(side === "top"){
      return ["topLeft", "topRight"]
    } else if (side === "right") {
      return ["topRight", "bottomRight"]
    } else if (side === "bottom") {
      return ["bottomLeft", "bottomRight"]
    } else if (side === "left") {
      return ["topLeft", "bottomLeft"]
    }
  },

  darkPurple: "rgb(39,0,56)",
  darkPurple50: "rgba(39,0,56, 0.8)"
}
