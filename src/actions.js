"use strict";

function init(game) {
    return {'playerMove': (n) => {
      console.log("Enemy try to move " + JSON.stringify(n));
      game.aiMove(n);
  }}
}

export default init;
