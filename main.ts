// title:  game title
// author: game developer
// desc:   short description
// script: js

let t = 0
let initialized = false
let tweens: PositionTween[] = []
let foo: Positionable = {
  x: 64,
  y: 64
}

function init() {
  initialized = true
  const tween1 = new PositionTween({
    target: foo,
    durationFrames: Util.secondsToFrames(1),
    // delayFrames: Util.secondsToFrames(2),
    yoyo: true,
    easing: Easing.easeInOutQuad,
    repeat: -1,
    startX: 32,
    endX: 128,
  });
  const tween2 = new PositionTween({
    target: foo,
    durationFrames: Util.secondsToFrames(1),
    //delayFrames: Util.secondsToFrames(2),
    //yoyo: true,
    easing: Easing.easeOutInQuad,
    repeat: -1,
    startY: -16,
    endY: 128,
  });
  tweens = tweens.concat(tween1, tween2)
}

function TIC() {
  if (!initialized) init()
  tweens.map(t => t.update())

  cls(13)
  spr(1 + (((t % 60) / 30) | 0) * 2,
    foo.x, foo.y, 14, 3, 0, 0, 2, 2)
  t++
}
