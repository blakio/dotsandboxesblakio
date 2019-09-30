export const trainRestrictions = {
  level1: {
    preText: [
`
You vs. Computer
Create more boxes. That's it!
Tap when ready`
    ],
    computerMoves: [{
        type: "clickSide",
        box: 19,
        side: "top"
      }, {
        type: "clickSide",
        box: 14,
        side: "right"
      }
    ],
    yourMoves: [{
      type: "clickSide",
      boxes: [15, 16],
      sides: ["right", "left"],
      text: "Tap between dots"
    }, {
      type: "clickSide",
      boxes: [9, 15],
      sides: ["bottom", "top"],
      text: ""
    }, {
      type: "clickSide",
      boxes: [15, 21],
      sides: ["bottom", "top"]
    }, {
      type: "clickSide",
      boxes: [10, 11],
      sides: ["right", "left"],
      text: "score to take another turn"
    }, {
      text: "Draw more boxes to win"
    }, {
      text: ""
    }]
  },
  level2: {
    preText: [
`Use animal bombs to remove obstacles
Tap when ready`
    ],
    yourMoves: [{
      type: "explosionClick",
      bomb: "cheetah",
      text: "Use bombs to remove",
      text2: "Foot Of Oppression",
      text3: "Click the cheetah"
    }, {
      type: "boxClick",
      clickBox: 16,
      text: "Click the box",
      text2: "it explodes right and left",
      aimBoxes: ["box13", "box14", "box15", "box16"]
    }, {
      type: "explosionClick",
      bomb: "panther",
      text: "Click a panther"
    }, {
      type: "boxClick",
      clickBox: 10,
      text: "It explodes up and down",
      aimBoxes: ["box10", "box16", "box22", "box28"]
    }, {
      text: "Destroy",
      text2: "Foot of Oppression",
      text3: "or lose!"
    }, {
      text: ""
    }]
  },
  level3: {yourMoves: [{text: ""}]},
  level4: {yourMoves: [{text: ""}]},
  level5: {yourMoves: [{text: ""}]},
  level6: {yourMoves: [{text: ""}]},
  level7: {yourMoves: [{text: ""}]},
  level8: {yourMoves: [{text: ""}]},
}
