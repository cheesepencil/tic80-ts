// title:  game title
// author: game developer
// desc:   short description
// script: js

/// <reference path="./src/scenes/easingScene.ts" />
/// <reference path="./src/scenes/platformerScene.ts" />

const demoScene: Scene = new PlatformerScene()

function TIC() {
  demoScene.TIC()
}
