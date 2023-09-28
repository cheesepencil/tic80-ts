// title:  game title
// author: game developer
// desc:   short description
// script: js

/// <reference path="./src/scenes/easingScene.ts" />
/// <reference path="./src/scenes/platformerScene.ts" />
/// <reference path="./src/scenes/buttonScene.ts" />

const scenes: Scene[] = [
  new ButtonScene(),
  new PlatformerScene(),
  new EasingScene(),
]
let activeScene: Scene = scenes[0]

function TIC() {
  if (btnp(5)) {
    const index = (scenes.indexOf(activeScene) + 1) % scenes.length
    activeScene = scenes[index]
  }
  activeScene.TIC()

  print("Press B to switch scenes", 2, 2, 12)
}
