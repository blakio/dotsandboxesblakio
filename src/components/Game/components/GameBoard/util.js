
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
  _0:  [42, 1, 48, 0],
  _1:  [43, 2, 49, 1],
  _2:  [44, 3, 50, 2],
  _3:  [45, 4, 51, 3],
  _4:  [46, 5, 52, 4],
  _5:  [47, 6, 53, 5],
  _6:  [48, 8, 54, 7],
  _7:  [49, 9, 55, 8],
  _8:  [50, 10, 56, 9],
  _9:  [51, 11, 57, 10],
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
  _0:  [false, false, false, false],
  _1:  [false, false, false, false],
  _2:  [false, false, false, false],
  _3:  [false, false, false, false],
  _4:  [false, false, false, false],
  _5:  [false, false, false, false],
  _6:  [false, false, false, false],
  _7:  [false, false, false, false],
  _8:  [false, false, false, false],
  _9:  [false, false, false, false],
  _10: [false, false, false, false],
  _11: [false, false, false, false],
  _12: [false, false, false, false],
  _13: [false, false, false, false],
  _14: [false, false, false, false],
  _15: [false, false, false, false],
  _16: [false, false, false, false],
  _17: [false, false, false, false],
  _18: [false, false, false, false],
  _19: [false, false, false, false],
  _20: [false, false, false, false],
  _21: [false, false, false, false],
  _22: [false, false, false, false],
  _23: [false, false, false, false],
  _24: [false, false, false, false],
  _25: [false, false, false, false],
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
  0:  false,
  1:  false,
  2:  false,
  3:  false,
  4:  false,
  5:  false,
  6:  false,
  7:  false,
  8:  false,
  9:  false,
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
  20: false,
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

const disabledBoxes = {
  0:  false,
  1:  false,
  2:  false,
  3:  false,
  4:  false,
  5:  false,
  6:  false,
  7:  false,
  8:  false,
  9:  false,
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
  20: false,
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

const clickSide = {
  0: { boxes: ["box0"] , relativeSides: ["left"] },
  1: { boxes: ["box0", "box1"] , relativeSides: ["right", "left"] },
  2: { boxes: ["box1", "box2"] , relativeSides: ["right", "left"] },
  3: { boxes: ["box2", "box3"] , relativeSides: ["right", "left"] },
  4: { boxes: ["box3", "box4"] , relativeSides: ["right", "left"] },
  5: { boxes: ["box4", "box5"] , relativeSides: ["right", "left"] },
  6: { boxes: ["box5"] , relativeSides: ["right"] },

  7: { boxes: ["box6"] , relativeSides: ["left"] },
  8: { boxes: ["box6", "box7"] , relativeSides: ["right", "left"] },
  9: { boxes: ["box7", "box8"] , relativeSides: ["right", "left"] },
  10: { boxes: ["box8", "box9"] , relativeSides: ["right", "left"] },
  11: { boxes: ["box9", "box10"] , relativeSides: ["right", "left"] },
  12: { boxes: ["box10", "box11"] , relativeSides: ["right", "left"] },
  13: { boxes: ["box11"] , relativeSides: ["right"] },

  14: { boxes: ["box12"] , relativeSides: ["left"] },
  15: { boxes: ["box12", "box13"] , relativeSides: ["right", "left"] },
  16: { boxes: ["box13", "box14"] , relativeSides: ["right", "left"] },
  17: { boxes: ["box14", "box15"] , relativeSides: ["right", "left"] },
  18: { boxes: ["box15", "box16"] , relativeSides: ["right", "left"] },
  19: { boxes: ["box16", "box17"] , relativeSides: ["right", "left"] },
  20: { boxes: ["box17"] , relativeSides: ["right"] },

  21: { boxes: ["box18"] , relativeSides: ["left"] },
  22: { boxes: ["box18", "box19"] , relativeSides: ["right", "left"] },
  23: { boxes: ["box19", "box20"] , relativeSides: ["right", "left"] },
  24: { boxes: ["box20", "box21"] , relativeSides: ["right", "left"] },
  25: { boxes: ["box21", "box22"] , relativeSides: ["right", "left"] },
  26: { boxes: ["box22", "box23"] , relativeSides: ["right", "left"] },
  27: { boxes: ["box23"] , relativeSides: ["right"] },

  28: { boxes: ["box24"] , relativeSides: ["left"] },
  29: { boxes: ["box24", "box25"] , relativeSides: ["right", "left"] },
  30: { boxes: ["box25", "box26"] , relativeSides: ["right", "left"] },
  31: { boxes: ["box26", "box27"] , relativeSides: ["right", "left"] },
  32: { boxes: ["box27", "box28"] , relativeSides: ["right", "left"] },
  33: { boxes: ["box28", "box29"] , relativeSides: ["right", "left"] },
  34: { boxes: ["box29"] , relativeSides: ["right"] },

  35: { boxes: ["box30"] , relativeSides: ["left"] },
  36: { boxes: ["box30", "box31"] , relativeSides: ["right", "left"] },
  37: { boxes: ["box31", "box32"] , relativeSides: ["right", "left"] },
  38: { boxes: ["box32", "box33"] , relativeSides: ["right", "left"] },
  39: { boxes: ["box33", "box34"] , relativeSides: ["right", "left"] },
  40: { boxes: ["box34", "box35"] , relativeSides: ["right", "left"] },
  41: { boxes: ["box35"] , relativeSides: ["right"] },

  42: { boxes: ["box0"] , relativeSides: ["top"] },
  43: { boxes: ["box1"] , relativeSides: ["top"] },
  44: { boxes: ["box2"] , relativeSides: ["top"] },
  45: { boxes: ["box3"] , relativeSides: ["top"] },
  46: { boxes: ["box4"] , relativeSides: ["top"] },
  47: { boxes: ["box5"] , relativeSides: ["top"] },

  48: { boxes: ["box6", "box0"] , relativeSides: ["top", "bottom"] },
  49: { boxes: ["box7", "box1"] , relativeSides: ["top", "bottom"] },
  50: { boxes: ["box8", "box2"] , relativeSides: ["top", "bottom"] },
  51: { boxes: ["box9", "box3"] , relativeSides: ["top", "bottom"] },
  52: { boxes: ["box10", "box4"] , relativeSides: ["top", "bottom"] },
  53: { boxes: ["box11", "box5"] , relativeSides: ["top", "bottom"] },
  54: { boxes: ["box12", "box6"] , relativeSides: ["top", "bottom"] },
  55: { boxes: ["box13", "box7"] , relativeSides: ["top", "bottom"] },
  56: { boxes: ["box14", "box8"] , relativeSides: ["top", "bottom"] },
  57: { boxes: ["box15", "box9"] , relativeSides: ["top", "bottom"] },
  58: { boxes: ["box16", "box10"] , relativeSides: ["top", "bottom"] },
  59: { boxes: ["box17", "box11"] , relativeSides: ["top", "bottom"] },
  60: { boxes: ["box18", "box12"] , relativeSides: ["top", "bottom"] },
  61: { boxes: ["box19", "box13"] , relativeSides: ["top", "bottom"] },
  62: { boxes: ["box20", "box14"] , relativeSides: ["top", "bottom"] },
  63: { boxes: ["box21", "box15"] , relativeSides: ["top", "bottom"] },
  64: { boxes: ["box22", "box16"] , relativeSides: ["top", "bottom"] },
  65: { boxes: ["box23", "box17"] , relativeSides: ["top", "bottom"] },
  66: { boxes: ["box24", "box18"] , relativeSides: ["top", "bottom"] },
  67: { boxes: ["box25", "box19"] , relativeSides: ["top", "bottom"] },
  68: { boxes: ["box26", "box20"] , relativeSides: ["top", "bottom"] },
  69: { boxes: ["box27", "box21"] , relativeSides: ["top", "bottom"] },
  70: { boxes: ["box28", "box22"] , relativeSides: ["top", "bottom"] },
  71: { boxes: ["box29", "box23"] , relativeSides: ["top", "bottom"] },
  72: { boxes: ["box30", "box24"] , relativeSides: ["top", "bottom"] },
  73: { boxes: ["box31", "box25"] , relativeSides: ["top", "bottom"] },
  74: { boxes: ["box32", "box26"] , relativeSides: ["top", "bottom"] },
  75: { boxes: ["box33", "box27"] , relativeSides: ["top", "bottom"] },
  76: { boxes: ["box34", "box28"] , relativeSides: ["top", "bottom"] },
  77: { boxes: ["box35", "box29"] , relativeSides: ["top", "bottom"] },

  78: { boxes: ["box30"] , relativeSides: ["bottom"] },
  79: { boxes: ["box31"] , relativeSides: ["bottom"] },
  80: { boxes: ["box32"] , relativeSides: ["bottom"] },
  81: { boxes: ["box33"] , relativeSides: ["bottom"] },
  82: { boxes: ["box34"] , relativeSides: ["bottom"] },
  83: { boxes: ["box35"] , relativeSides: ["bottom"] },
}

// the dots are disabled if the boxes in their respective index array is all disabled
// ex: the dot of index 15 has an opacity of 0 if box6, box7, box12, and box13 are all disabled
const disabledDotConditions = {

  0: ["box0"],
  1: ["box0", "box1"],
  2: ["box1", "box2"],
  3: ["box2", "box3"],
  4: ["box3", "box4"],
  5: ["box4", "box5"],
  6: ["box5", "box6"],

  7: ["box0", "box6"],
  8: ["box0", "box1", "box6", "box7"],
  9: ["box1", "box2", "box7", "box8"],
  10: ["box2", "box3", "box8", "box9"],
  11: ["box3", "box4", "box9", "box10"],
  12: ["box4", "box5", "box10", "box11"],
  13: ["box5", "box11"],

  14: ["box6", "box12"],
  15: ["box6", "box7", "box12", "box13"],
  16: ["box7", "box8", "box13", "box14"],
  17: ["box8", "box9", "box14", "box15"],
  18: ["box9", "box10", "box15", "box16"],
  19: ["box10", "box11", "box16", "box17"],
  20: ["box11", "box17"],

  21: ["box12", "box18"],
  22: ["box12", "box13", "box18", "box19"],
  23: ["box13", "box14", "box19", "box20"],
  24: ["box14", "box15", "box20", "box21"],
  25: ["box15", "box16", "box21", "box22"],
  26: ["box16", "box17", "box22", "box23"],
  27: ["box17", "box23"],

  28: ["box18", "box24"],
  29: ["box18", "box19", "box24", "box25"],
  30: ["box19", "box20", "box25", "box26"],
  31: ["box20", "box21", "box26", "box27"],
  32: ["box21", "box22", "box27", "box28"],
  33: ["box22", "box23", "box28", "box29"],
  34: ["box23", "box29"],

  35: ["box24", "box30"],
  36: ["box24", "box25", "box30", "box31"],
  37: ["box25", "box26", "box31", "box32"],
  38: ["box26", "box27", "box32", "box33"],
  39: ["box27", "box28", "box33", "box34"],
  40: ["box28", "box29", "box34", "box35"],
  41: ["box29", "box35"],

  42: ["box30"],
  43: ["box30", "box31"],
  44: ["box31", "box32"],
  45: ["box32", "box33"],
  46: ["box33", "box34"],
  47: ["box34", "box35"],
  48: ["box35"]

}

// the lines are disabled if the boxes in their respective index array is all disabled
// ex: the line of index 15 has an opacity of 0 and not clickable if box12, and box13 are all disabled
const disabledLineConditions = {

  0:  ["box0"],
  1:  ["box0", "box1"],
  2:  ["box1", "box2"],
  3:  ["box2", "box3"],
  4:  ["box3", "box4"],
  5:  ["box4", "box5"],
  6:  ["box5"],

  7:  ["box6"],
  8:  ["box6", "box7"],
  9:  ["box7", "box8"],
  10: ["box8", "box9"],
  11: ["box9", "box10"],
  12: ["box10", "box11"],
  13: ["box11"],

  14: ["box12"],
  15: ["box12", "box13"],
  16: ["box13", "box14"],
  17: ["box14", "box15"],
  18: ["box15", "box16"],
  19: ["box16", "box17"],
  20: ["box17"],

  21: ["box18"],
  22: ["box18", "box19"],
  23: ["box19", "box20"],
  24: ["box20", "box21"],
  25: ["box21", "box22"],
  26: ["box22", "box23"],
  27: ["box23"],

  28: ["box24"],
  29: ["box24", "box25"],
  30: ["box25", "box26"],
  31: ["box26", "box27"],
  32: ["box27", "box28"],
  33: ["box28", "box29"],
  34: ["box29"],

  35: ["box30"],
  36: ["box30", "box31"],
  37: ["box31", "box32"],
  38: ["box32", "box33"],
  39: ["box33", "box34"],
  40: ["box34", "box35"],
  41: ["box35"],

  42: ["box0"],
  43: ["box1"],
  44: ["box2"],
  45: ["box3"],
  46: ["box4"],
  47: ["box5"],

  48: ["box0", "box6"],
  49: ["box1", "box7"],
  50: ["box2", "box8"],
  51: ["box3", "box9"],
  52: ["box4", "box10"],
  53: ["box5", "box11"],
  54: ["box6", "box12"],
  55: ["box7", "box13"],
  56: ["box8", "box14"],
  57: ["box9", "box15"],
  58: ["box10", "box16"],
  59: ["box11", "box17"],
  60: ["box12", "box18"],
  61: ["box13", "box19"],
  62: ["box14", "box20"],
  63: ["box15", "box21"],
  64: ["box16", "box22"],
  65: ["box17", "box23"],
  66: ["box18", "box24"],
  67: ["box19", "box25"],
  68: ["box20", "box26"],
  69: ["box21", "box27"],
  70: ["box22", "box28"],
  71: ["box23", "box29"],
  72: ["box24", "box30"],
  73: ["box25", "box31"],
  74: ["box26", "box32"],
  75: ["box27", "box33"],
  76: ["box28", "box34"],
  77: ["box29", "box35"],

  78: ["box30"],
  79: ["box31"],
  80: ["box32"],
  81: ["box33"],
  82: ["box34"],
  83: ["box35"],

}

const centerOfLine = { // collabrated

  0: [33.47, 61.39],
  1: [91.39, 61.39],
  2: [149.32, 61.39],
  3: [207.25, 61.39],
  4: [265.17, 61.39],
  5: [323.1, 61.39],
  6: [381.03, 61.39],
  7: [33.47, 120.9],
  8: [91.39, 120.9],
  9: [149.32, 120.9],
  10: [207.25, 120.9],
  11: [265.17, 120.9],
  12: [323.1, 120.9],
  13: [381.03, 120.9],
  14: [33.47, 180.41],
  15: [91.39, 180.41],
  16: [149.32, 180.41],
  17: [207.25, 180.41],
  18: [265.17, 180.41],
  19: [323.1, 180.41],
  20: [381.03, 180.41],
  21: [33.47, 239.92],
  22: [91.39, 239.92],
  23: [149.32, 239.92],
  24: [207.25, 239.92],
  25: [265.17, 239.92],
  26: [323.1, 239.92],
  27: [381.03, 239.92],
  28: [33.47, 299.42],
  29: [91.39, 299.42],
  30: [149.32, 299.42],
  31: [207.25, 299.42],
  32: [265.17, 299.42],
  33: [323.1, 299.42],
  34: [381.03, 299.42],
  35: [33.47, 358.93],
  36: [91.39, 358.93],
  37: [149.32, 358.93],
  38: [207.25, 358.93],
  39: [265.17, 358.93],
  40: [323.1, 358.93],
  41: [381.03, 358.93],
  42: [62.43, 31.64],
  43: [120.36, 31.64],
  44: [178.28, 31.64],
  45: [236.21, 31.64],
  46: [294.14, 31.64],
  47: [352.07, 31.64],
  48: [62.43, 91.15],
  49: [120.36, 91.15],
  50: [178.28, 91.15],
  51: [236.21, 91.15],
  52: [294.14, 91.15],
  53: [352.07, 91.15],
  54: [62.43, 150.65],
  55: [120.36, 150.65],
  56: [178.28, 150.65],
  57: [236.21, 150.65],
  58: [294.14, 150.65],
  59: [352.07, 150.65],
  60: [62.43, 210.16],
  61: [120.36, 210.16],
  62: [178.28, 210.16],
  63: [236.21, 210.16],
  64: [294.14, 210.16],
  65: [352.07, 210.16],
  66: [62.43, 269.67],
  67: [120.36, 269.67],
  68: [178.28, 269.67],
  69: [236.21, 269.67],
  70: [294.14, 269.67],
  71: [352.07, 269.67],
  72: [62.43, 329.18],
  73: [120.36, 329.18],
  74: [178.28, 329.18],
  75: [236.21, 329.18],
  76: [294.14, 329.18],
  77: [352.07, 329.18],
  78: [62.43, 388.69],
  79: [120.36, 388.69],
  80: [178.28, 388.69],
  81: [236.21, 388.69],
  82: [294.14, 388.69],
  83: [352.07, 388.69],

}

const centerOfLine2 = {

  0:  [ 26.81, 53],
  1:  [ 79.95, 53],
  2:  [133.08, 53],
  3:  [186.23, 53],
  4:  [239.36, 53],
  5:  [292.50, 53],
  6:  [345.64, 53],

  7:  [ 26.81, 107],
  8:  [ 79.95, 107],
  9:  [133.08, 107],
  10: [186.23, 107],
  11: [239.36, 107],
  12: [292.50, 107],
  13: [345.64, 107],

  14: [ 26.81, 161],
  15: [ 79.95, 161],
  16: [133.08, 161],
  17: [186.23, 161],
  18: [239.36, 161],
  19: [292.50, 161],
  20: [345.64, 161],

  21: [ 26.81, 213],
  22: [ 79.95, 213],
  23: [133.08, 213],
  24: [186.23, 213],
  25: [239.36, 213],
  26: [292.50, 213],
  27: [345.64, 213],

  28: [ 26.81, 267],
  29: [ 79.95, 267],
  30: [133.08, 267],
  31: [186.23, 267],
  32: [239.36, 267],
  33: [292.50, 267],
  34: [345.64, 267],

  35: [ 26.81, 323],
  36: [ 79.95, 323],
  37: [133.08, 323],
  38: [186.23, 323],
  39: [239.36, 323],
  40: [292.50, 323],
  41: [345.64, 323],

  42: [53 ,  29],
  43: [107,  29],
  44: [160,  29],
  45: [213,  29],
  46: [266,  29],
  47: [320,  29],

  48: [53 ,  83],
  49: [107,  83],
  50: [160,  83],
  51: [213,  83],
  52: [266,  83],
  53: [320,  83],

  54: [53 , 137],
  55: [107, 137],
  56: [160, 137],
  57: [213, 137],
  58: [266, 137],
  59: [320, 137],

  60: [53 , 191],
  61: [107, 191],
  62: [160, 191],
  63: [213, 191],
  64: [266, 191],
  65: [320, 191],

  66: [53 , 245],
  67: [107, 245],
  68: [160, 245],
  69: [213, 245],
  70: [266, 245],
  71: [320, 245],

  72: [53 , 299],
  73: [107, 299],
  74: [160, 299],
  75: [213, 299],
  76: [266, 299],
  77: [320, 299],

  78: [53 , 353],
  79: [107, 353],
  80: [160, 353],
  81: [213, 353],
  82: [266, 353],
  83: [320, 353],

}

const getClosesLine = (locationX, locationY, centerOfLine) => {
  let closestLine;
  let distance = 1000;
  for(let key in centerOfLine){
    const x = locationX - centerOfLine[key][0];
    const y = locationY - centerOfLine[key][1];
    const z = Math.sqrt((x * x) + (y * y));
    if(z < distance){
      closesLine = key;
      distance = z;
    }
  }
  return (distance < 30) ? parseInt(closesLine) : false;
}

const getDisabledStatus = (disabledMapper, disabledBoxes) => {
  let isDisabled = true;
  disabledMapper.forEach(data => {
    if(!disabledBoxes.includes(data)){
      isDisabled = false;
    }
  })
  return isDisabled
}

const getDisabledBoxes = (board) => {
  const disabledBoxes = [];
  for(let box in board){
    if(board[box].disabled){
      disabledBoxes.push(box)
    }
  }
  return disabledBoxes
}

const getClick = (clickInfo, disabledBoxes) => {
  let click = false;
  clickInfo.boxes.forEach((data, index) => {
    if(!disabledBoxes.includes(data)){
      click = {
        box: data,
        side: clickInfo.relativeSides[index]
      }
    }
  })
  return click;
}

const getBoxIndex = (box) => {
  const boxIndex = box.replace("box", "");
  return parseInt(boxIndex);
}

const getSelected = (whoClickedTheLine) => {
  const selected = {};
  let count = 0;
  for(let box in whoClickedTheLine){
    const borders = whoClickedTheLine[box];
    const top = borders.top || false;
    const right = borders.right || false;
    const bottom = borders.bottom || false;
    const left = borders.left || false;
    selected[`_${count}`] = [top, right, bottom, left];
    count++;
  }
  return selected;
}

const getWhoScored = (whoScored) => {
  const scored = [];
  let count = 0;
  for(let data in whoScored){
    scored[count] = whoScored[data];
    count++;
  }
  return scored;
}

const getClickFromPostion = (x, y, lineClickPositions, boxClickPositions) => {
  let click = false;
  for(let data in lineClickPositions){
    if(!click){
      const xLow = lineClickPositions[data].x[0];
      const xHigh = lineClickPositions[data].x[1];
      const yLow = lineClickPositions[data].y[0];
      const yHigh = lineClickPositions[data].y[1];
      if((xLow < x) && (xHigh > x) && (yLow < y) && (yHigh > y)){
        click = {
          type: "line",
          index: parseInt(data)
        }
      }
    }
  }
  if(!click){
    for(let data in boxClickPositions){
      if(!click){
        const xLow = boxClickPositions[data].x[0];
        const xHigh = boxClickPositions[data].x[1];
        const yLow = boxClickPositions[data].y[0];
        const yHigh = boxClickPositions[data].y[1];
        if((xLow < x) && (xHigh > x) && (yLow < y) && (yHigh > y)){
          click = {
            type: "box",
            index: parseInt(data)
          }
        }
      }
    }
  }
  return click
}

const lineClickPositions = {

  0:  {x: [14, 42], y: [32, 78]}, // +-6
  1:  {x: [67, 108], y: [32, 78]},
  2:  {x: [120, 150], y: [32, 78]},
  3:  {x: [173, 202], y: [32, 78]},
  4:  {x: [228, 256], y: [32, 78]},
  5:  {x: [281, 310], y: [32, 78]},
  6:  {x: [335, 364], y: [32, 78]},

  7:  {x: [14, 42], y: [87, 132]},
  8:  {x: [67, 108], y: [87, 132]},
  9:  {x: [120, 150], y: [87, 132]},
  10: {x: [173, 202], y: [87, 132]},
  11: {x: [228, 256], y: [87, 132]},
  12: {x: [281, 310], y: [87, 132]},
  13: {x: [335, 364], y: [87, 132]},

  14: {x: [14, 42], y: [140, 185]},
  15: {x: [67, 108], y: [140, 185]},
  16: {x: [120, 150], y: [140, 185]},
  17: {x: [173, 202], y: [140, 185]},
  18: {x: [228, 256], y: [140, 185]},
  19: {x: [281, 310], y: [140, 185]},
  20: {x: [335, 364], y: [140, 185]},

  21: {x: [14, 42], y: [192, 239]},
  22: {x: [67, 108], y: [192, 239]},
  23: {x: [120, 150], y: [192, 239]},
  24: {x: [173, 202], y: [192, 239]},
  25: {x: [228, 256], y: [192, 239]},
  26: {x: [281, 310], y: [192, 239]},
  27: {x: [335, 364], y: [192, 239]},

  28: {x: [14, 42], y: [246, 290]},
  29: {x: [67, 108], y: [246, 290]},
  30: {x: [120, 150], y: [246, 290]},
  31: {x: [173, 202], y: [246, 290]},
  32: {x: [228, 256], y: [246, 290]},
  33: {x: [281, 310], y: [246, 290]},
  34: {x: [335, 364], y: [246, 290]},

  35: {x: [14, 42], y: [301, 342]},
  36: {x: [67, 108], y: [301, 342]},
  37: {x: [120, 150], y: [301, 342]},
  38: {x: [173, 202], y: [301, 342]},
  39: {x: [228, 256], y: [301, 342]},
  40: {x: [281, 310], y: [301, 342]},
  41: {x: [335, 364], y: [301, 342]},

  42: {x: [37, 71], y: [14, 42]},
  43: {x: [91, 125], y: [14, 42]},
  44: {x: [144, 179], y: [14, 42]},
  45: {x: [192, 239], y: [14, 42]},
  46: {x: [250, 285], y: [14, 42]},
  47: {x: [305, 339], y: [14, 42]},

  48: {x: [37, 71], y: [67, 95]},
  49: {x: [91, 125], y: [67, 95]},
  50: {x: [144, 179], y: [67, 95]},
  51: {x: [192, 239], y: [67, 95]},
  52: {x: [250, 285], y: [67, 95]},
  53: {x: [305, 339], y: [67, 95]},

  54: {x: [37, 71], y: [120, 150]},
  55: {x: [91, 125], y: [120, 150]},
  56: {x: [144, 179], y: [120, 150]},
  57: {x: [192, 239], y: [120, 150]},
  58: {x: [250, 285], y: [120, 150]},
  59: {x: [305, 339], y: [120, 150]},

  60: {x: [37, 71], y: [173, 203]},
  61: {x: [91, 125], y: [173, 203]},
  62: {x: [144, 179], y: [173, 203]},
  63: {x: [192, 239], y: [173, 203]},
  64: {x: [250, 285], y: [173, 203]},
  65: {x: [305, 339], y: [173, 203]},

  66: {x: [37, 71], y: [227, 258]},
  67: {x: [91, 125], y: [227, 258]},
  68: {x: [144, 179], y: [227, 258]},
  69: {x: [192, 239], y: [227, 258]},
  70: {x: [250, 285], y: [227, 258]},
  71: {x: [305, 339], y: [227, 258]},

  72: {x: [37, 71], y: [282, 311]},
  73: {x: [91, 125], y: [282, 311]},
  74: {x: [144, 179], y: [282, 311]},
  75: {x: [192, 239], y: [282, 311]},
  76: {x: [250, 285], y: [282, 311]},
  77: {x: [305, 339], y: [282, 311]},

  78: {x: [37, 71], y: [335, 363]},
  79: {x: [91, 125], y: [335, 363]},
  80: {x: [144, 179], y: [335, 363]},
  81: {x: [192, 239], y: [335, 363]},
  82: {x: [250, 285], y: [335, 363]},
  83: {x: [305, 339], y: [335, 363]},

}

const boxClickPositions = {

  0:  {x: [36, 73],   y: [37, 73]},
  1:  {x: [90, 126],  y: [37, 73]},
  2:  {x: [144, 179], y: [37, 73]},
  3:  {x: [192, 239], y: [37, 73]},
  4:  {x: [255, 286], y: [37, 73]},
  5:  {x: [304, 340], y: [37, 73]},

  6:  {x: [36, 73],   y: [90, 126]},
  7:  {x: [90, 126],  y: [90, 126]},
  8:  {x: [144, 179], y: [90, 126]},
  9:  {x: [192, 239], y: [90, 126]},
  10: {x: [255, 286], y: [90, 126]},
  11: {x: [304, 340], y: [90, 126]},

  12: {x: [36, 73],   y: [145, 179]},
  13: {x: [90, 126],  y: [145, 179]},
  14: {x: [144, 179], y: [145, 179]},
  15: {x: [192, 239], y: [145, 179]},
  16: {x: [255, 286], y: [145, 179]},
  17: {x: [304, 340], y: [145, 179]},

  18: {x: [36, 73],   y: [197, 233]},
  19: {x: [90, 126],  y: [197, 233]},
  20: {x: [144, 179], y: [197, 233]},
  21: {x: [192, 239], y: [197, 233]},
  22: {x: [255, 286], y: [197, 233]},
  23: {x: [304, 340], y: [197, 233]},

  24: {x: [36, 73],   y: [251, 286]},
  25: {x: [90, 126],  y: [251, 286]},
  26: {x: [144, 179], y: [251, 286]},
  27: {x: [192, 239], y: [251, 286]},
  28: {x: [255, 286], y: [251, 286]},
  29: {x: [304, 340], y: [251, 286]},

  30: {x: [36, 73],   y: [305, 339]},
  31: {x: [90, 126],  y: [305, 339]},
  32: {x: [144, 179], y: [305, 339]},
  33: {x: [192, 239], y: [305, 339]},
  34: {x: [255, 286], y: [305, 339]},
  35: {x: [304, 340], y: [305, 339]},

}

const getAveFromPoints = (arr) => {
  let x = 0;
  let y = 0;
  let l = arr.length;
  arr.forEach(data => {
    x += data[0];
    y += data[1];
  });
  return [(x/l), (y/l)];
}

const getEdgeCoordinates = (topLeftAve, topRightAve, bottomLeftAve) => {

  const ave = (a, b) => ((a+b)/2);
  const x1 = ave(topLeftAve[0], bottomLeftAve[0]);
  const x2 = topRightAve[0];
  const y1 = ave(topLeftAve[1], topRightAve[1]);
  const y2 = bottomLeftAve[1];
  const X = x2 - x1;
  const Y = y2 - y1;
  const dx = X / 12;
  const dy = Y / 12;

  return {
    x: [
      parseFloat(x1.toFixed(2)),
      parseFloat((x1 + dx * 1).toFixed(2)),
      parseFloat((x1 + dx * 2).toFixed(2)),
      parseFloat((x1 + dx * 3).toFixed(2)),
      parseFloat((x1 + dx * 4).toFixed(2)),
      parseFloat((x1 + dx * 5).toFixed(2)),
      parseFloat((x1 + dx * 6).toFixed(2)),
      parseFloat((x1 + dx * 7).toFixed(2)),
      parseFloat((x1 + dx * 8).toFixed(2)),
      parseFloat((x1 + dx * 9).toFixed(2)),
      parseFloat((x1 + dx * 10).toFixed(2)),
      parseFloat((x1 + dx * 11).toFixed(2)),
      parseFloat((x1 + dx * 12).toFixed(2))
    ],
    y: [
      parseFloat(y1.toFixed(2)),
      parseFloat((y1 + dy * 1).toFixed(2)),
      parseFloat((y1 + dy * 2).toFixed(2)),
      parseFloat((y1 + dy * 3).toFixed(2)),
      parseFloat((y1 + dy * 4).toFixed(2)),
      parseFloat((y1 + dy * 5).toFixed(2)),
      parseFloat((y1 + dy * 6).toFixed(2)),
      parseFloat((y1 + dy * 7).toFixed(2)),
      parseFloat((y1 + dy * 8).toFixed(2)),
      parseFloat((y1 + dy * 9).toFixed(2)),
      parseFloat((y1 + dy * 10).toFixed(2)),
      parseFloat((y1 + dy * 11).toFixed(2)),
      parseFloat((y1 + dy * 12).toFixed(2))
    ]
  }
}

const getPositions = (coordinates) => {
  const {
    x,
    y
  } = coordinates;

  return {

    0:  [x[0], y[1]],
    1:  [x[2], y[1]],
    2:  [x[4], y[1]],
    3:  [x[6], y[1]],
    4:  [x[8], y[1]],
    5:  [x[10], y[1]],
    6:  [x[12], y[1]],

    7:  [x[0], y[3]],
    8:  [x[2], y[3]],
    9:  [x[4], y[3]],
    10: [x[6], y[3]],
    11: [x[8], y[3]],
    12: [x[10], y[3]],
    13: [x[12], y[3]],

    14: [x[0], y[5]],
    15: [x[2], y[5]],
    16: [x[4], y[5]],
    17: [x[6], y[5]],
    18: [x[8], y[5]],
    19: [x[10], y[5]],
    20: [x[12], y[5]],

    21: [x[0], y[7]],
    22: [x[2], y[7]],
    23: [x[4], y[7]],
    24: [x[6], y[7]],
    25: [x[8], y[7]],
    26: [x[10], y[7]],
    27: [x[12], y[7]],

    28: [x[0], y[9]],
    29: [x[2], y[9]],
    30: [x[4], y[9]],
    31: [x[6], y[9]],
    32: [x[8], y[9]],
    33: [x[10], y[9]],
    34: [x[12], y[9]],

    35: [x[0], y[11]],
    36: [x[2], y[11]],
    37: [x[4], y[11]],
    38: [x[6], y[11]],
    39: [x[8], y[11]],
    40: [x[10], y[11]],
    41: [x[12], y[11]],

    42: [x[1], y[0]],
    43: [x[3], y[0]],
    44: [x[5], y[0]],
    45: [x[7], y[0]],
    46: [x[9], y[0]],
    47: [x[11], y[0]],

    48: [x[1], y[2]],
    49: [x[3], y[2]],
    50: [x[5], y[2]],
    51: [x[7], y[2]],
    52: [x[9], y[2]],
    53: [x[11], y[2]],

    54: [x[1], y[4]],
    55: [x[3], y[4]],
    56: [x[5], y[4]],
    57: [x[7], y[4]],
    58: [x[9], y[4]],
    59: [x[11], y[4]],

    60: [x[1], y[6]],
    61: [x[3], y[6]],
    62: [x[5], y[6]],
    63: [x[7], y[6]],
    64: [x[9], y[6]],
    65: [x[11], y[6]],

    66: [x[1], y[8]],
    67: [x[3], y[8]],
    68: [x[5], y[8]],
    69: [x[7], y[8]],
    70: [x[9], y[8]],
    71: [x[11], y[8]],

    72: [x[1], y[10]],
    73: [x[3], y[10]],
    74: [x[5], y[10]],
    75: [x[7], y[10]],
    76: [x[9], y[10]],
    77: [x[11], y[10]],

    78: [x[1], y[12]],
    79: [x[3], y[12]],
    80: [x[5], y[12]],
    81: [x[7], y[12]],
    82: [x[9], y[12]],
    83: [x[11], y[12]],

  }
}

export default {
  getVerticalSidePosition,
  getHorizontalSidePosition,
  getSelectedStatus,
  sideAndSquareMapper,
  selected,
  getSelectedLines,
  scored, // input
  disabledBoxes, // input
  getScoreStatus,
  getBorderNumber,
  clickSide,
  disabledDotConditions,
  disabledLineConditions,
  getDisabledBoxes,
  getDisabledStatus,
  getClick,
  getBoxIndex,
  getSelected,
  getWhoScored,
  lineClickPositions,
  boxClickPositions,
  getClickFromPostion,
  centerOfLine,
  getClosesLine,
  getAveFromPoints,
  getEdgeCoordinates,
  getPositions
}