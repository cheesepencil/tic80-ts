// title:  game title
// author: game developer
// desc:   short description
// script: js

/// <reference path="./src/scenes/easingScene.ts" />
/// <reference path="./src/scenes/platformerScene.ts" />

const platformerScene: Scene = new PlatformerScene()
const easingScene: Scene = new EasingScene()
let activeScene: Scene = platformerScene

function TIC() {
  if (btnp(5)) {
    if (activeScene === platformerScene) {
      activeScene = easingScene
    }
    else {
      activeScene = platformerScene
    }
  }
  activeScene.TIC()
  
  print("Press B to switch scenes", 2, 2, 12)
}
