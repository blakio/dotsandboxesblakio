
const getVerticalSidePosition = (index) => {
  const position = {};

  if(index < 7){ position.row = "vrow1" }
  else if (index < 14) { position.row = "vrow2" }
  else if (index < 21) { position.row = "vrow3" }
  else if (index < 28) { position.row = "vrow4" }
  else if (index < 35) { position.row = "vrow5" }
  else if (index < 42) { position.row = "vrow6" }

  const col1 = [0, 7, 14, 21, 28, 35];
  const col2 = [1, 8, 15, 22, 29, 36];
  const col3 = [2, 9, 16, 23, 30, 37];
  const col4 = [3, 10, 17, 24, 31, 38];
  const col5 = [4, 11, 18, 25, 32, 39];
  const col6 = [5, 12, 19, 26, 33, 40];
  const col7 = [6, 13, 20, 27, 34, 41];

  if(col1.includes(index)){ position.col = "vcol1" }
  else if (col2.includes(index)) { position.col = "vcol2" }
  else if (col3.includes(index)) { position.col = "vcol3" }
  else if (col4.includes(index)) { position.col = "vcol4" }
  else if (col5.includes(index)) { position.col = "vcol5" }
  else if (col6.includes(index)) { position.col = "vcol6" }
  else if (col7.includes(index)) { position.col = "vcol7" }

  return position;
}

const getHorizontalSidePosition = (index) => {
  const position = {};

  if(index < 48){ position.row = "hrow1" }
  else if (index < 54) { position.row = "hrow2" }
  else if (index < 60) { position.row = "hrow3" }
  else if (index < 66) { position.row = "hrow4" }
  else if (index < 72) { position.row = "hrow5" }
  else if (index < 78) { position.row = "hrow6" }
  else if (index < 84) { position.row = "hrow7" }

  const col1 = [42, 48, 54, 60, 66, 72, 78];
  const col2 = [43, 49, 55, 61, 67, 73, 79];
  const col3 = [44, 50, 56, 62, 68, 74, 80];
  const col4 = [45, 51, 57, 63, 69, 75, 81];
  const col5 = [46, 52, 58, 64, 70, 76, 82];
  const col6 = [47, 53, 59, 65, 71, 77, 83];

  if(col1.includes(index)){ position.col = "hcol1" }
  else if (col2.includes(index)) { position.col = "hcol2" }
  else if (col3.includes(index)) { position.col = "hcol3" }
  else if (col4.includes(index)) { position.col = "hcol4" }
  else if (col5.includes(index)) { position.col = "hcol5" }
  else if (col6.includes(index)) { position.col = "hcol6" }
  else if (col7.includes(index)) { position.col = "hcol7" }

  return position;
}

const getSelectedStatus = (index, obj) => {
  if(obj[index] === "first") return "firstSelected";
  if(obj[index] === "second") return "secondSelected"
  return "noSelected"
}

const sideAndSquareMapper = {
  _0: [42, 1, 48, 0],
  _1: [43, 2, 49, 1],
  _2: [44, 3, 50, 2],
  _3: [45, 4, 51, 3],
  _4: [46, 5, 52, 4],
  _5: [47, 6, 53, 5],
  _6: [48, 8, 54, 7],
  _7: [49, 9, 55, 8],
  _8: [50, 10, 56, 9],
  _9: [51, 11, 57, 10],
  _10: [52, 12, 58, 11],
  _11: [53, 13, 59, 12],
  _12: [54, 15, 60, 14],
  _13: [55, 16, 61, 15],
  _14: [56, 17, 62, 16],
  _15: [57, 18, 63, 17],
  _16: [58, 19, 64, 18],
  _17: [59, 20, 65, 19],
  _18: [60, 22, 66, 21],
  _19: [61, 23, 67, 22],
  _20: [62, 24, 68, 23],
  _21: [63, 25, 69, 24],
  _22: [64, 26, 70, 25],
  _23: [65, 27, 71, 26],
  _24: [66, 29, 72, 28],
  _25: [67, 30, 73, 29],
  _26: [68, 31, 74, 30],
  _27: [69, 32, 75, 31],
  _28: [70, 33, 76, 32],
  _29: [71, 34, 77, 33],
  _30: [72, 36, 78, 35],
  _31: [73, 37, 79, 36],
  _32: [74, 38, 80, 37],
  _33: [75, 39, 81, 38],
  _34: [76, 40, 82, 39],
  _35: [77, 41, 83, 40],
}

const selected = {
  _0: ["first", false, false, false],
  _1: [false, false, false, false],
  _2: [false, false, false, false],
  _3: [false, false, false, false],
  _4: [false, false, false, false],
  _5: [false, false, false, false],
  _6: [false, false, false, false],
  _7: [false, false, false, false],
  _8: [false, false, false, false],
  _9: [false, false, false, false],
  _10: [false, false, false, false],
  _11: [false, false, false, false],
  _12: [false, false, false, false],
  _13: [false, false, false, false],
  _14: [false, false, false, false],
  _15: [false, "second", false, false],
  _16: [false, false, false, false],
  _17: [false, false, false, false],
  _18: [false, false, false, false],
  _19: [false, false, false, false],
  _20: ["first", "second", "second", "first"],
  _21: [false, false, false, false],
  _22: [false, false, false, false],
  _23: [false, false, false, false],
  _24: [false, false, false, false],
  _25: [false, false, false, "second"],
  _26: [false, false, false, false],
  _27: [false, false, false, false],
  _28: [false, false, false, false],
  _29: [false, false, false, false],
  _30: [false, false, false, false],
  _31: [false, false, false, false],
  _32: [false, false, false, false],
  _33: [false, false, false, false],
  _34: [false, false, false, false],
  _35: [false, false, false, false],
}

const scored = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  10: false,
  11: false,
  12: false,
  13: false,
  14: false,
  15: false,
  16: false,
  17: false,
  18: false,
  19: false,
  20: "second",
  21: false,
  22: false,
  23: false,
  24: false,
  25: false,
  26: false,
  27: false,
  28: false,
  29: false,
  30: false,
  31: false,
  32: false,
  33: false,
  34: false,
  35: false,
}

const getSelectedLines = (selected, mapper) => {
  const selectedBoxes = {};
  for(let key in selected){
    if(selected[key].includes("first")){
      selected[key].forEach((data, index) => {
        if(data === "first"){
          selectedBoxes[mapper[key][index]] = "first";
        }
      })
    }
    if(selected[key].includes("second")){
      selected[key].forEach((data, index) => {
        if(data === "second"){
          selectedBoxes[mapper[key][index]] = "second";
        }
      })
    }
  }
  return selectedBoxes;
}

const getScoreStatus = (index, obj) => {
  if(obj[index] === "first") return "firstScored";
  if(obj[index] === "second") return "secondScored"
  return "noScored"
}

const getBorderNumber = (index, selected) => {
  const selectedLines = [];
  selected[`_${index}`].forEach(data => {
    if(data) selectedLines.push(data)
  })
  return selectedLines.length;
}

export default {
  getVerticalSidePosition,
  getHorizontalSidePosition,
  getSelectedStatus,
  sideAndSquareMapper,
  selected,
  getSelectedLines,
  scored,
  getScoreStatus,
  getBorderNumber
}
