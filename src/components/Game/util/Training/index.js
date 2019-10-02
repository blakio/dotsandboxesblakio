export const trainRestrictions = {
  level1: {
    preText: [
`
Create more boxes than you opponent. That's it!
You vs. Computer
---------------------------------
Directions

Tap between two vertical or horozontal dots to make a line

Two players take turns making lines

The player to complete a box scores and takes another turn

Tap when ready`
    ],
    computerMoves: [{
        type: "clickSide",
        box: 20,
        side: "top"
      }, {
        type: "clickSide",
        box: 13,
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
      boxes: [8, 14],
      sides: ["bottom", "top"],
      text: ""
    }, {
      type: "clickSide",
      boxes: [14, 15],
      sides: ["right", "left"]
    }, {
      type: "clickSide",
      boxes: [21, 27],
      sides: ["bottom", "top"],
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
---------------------------------
Directions

Select an animal bomb and then select a box that does not contain an obstacle

The bomb will remove everything in it's blasting path`
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
