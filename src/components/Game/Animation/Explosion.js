import React, { useState } from "react";
import {
  View
} from "react-native";
import SpriteSheet from "rn-sprite-sheet";
import { config } from "../util/Settings";

const Explosion = (props) => {
  let [explosion, setExplosion] = useState(null);

  play = config => explosion.play(config);

  setTimeout(() => {
    play({
      type: "explode",
      fps: 4,
      loop: false,
      resetAfterFinish: false,
      onFinish: () => {}
    })
  }, 4000)

  return (<View
      style={{
        position: "absolute",
        top: "-50%",
        left: "-50%",
        width: config.width * 0.14
      }}
    >
    <SpriteSheet
      ref={ref => (explosion = ref)}
      source={require('./bombSprite.png')}
      columns={10}
      rows={1}
      width={100}
      animations={{
        explode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }}
    />
  </View>)
}

export default Explosion;
