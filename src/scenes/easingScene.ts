/// <reference path="../lib/scene.ts" />
/// <reference path="../lib/sprite.ts" />

class EasingScene extends Scene {
    private tweens: PositionTween[] = []

    init = () => {
        let ticGuy = new Sprite(this, {
            x: 0,
            y: 32,
            heightSprites: 2,
            widthSprites: 2,
            index: 1,
            colorKey: [14],
            flipX: false,
        });
        this.sprites.push(ticGuy)

        let tween = new PositionTween({
            target: ticGuy,
            durationFrames: Util.secondsToFrames(2),
            delayFrames: Util.secondsToFrames(0.5),
            startX: 0,
            endX: 224,
            easing: Easing.easeInOutElastic,
            yoyo: true,
            repeat: -1,
        });
        this.tweens.push(tween)

        ticGuy = new Sprite(this, {
            x: 0,
            y: 96,
            heightSprites: 2,
            widthSprites: 2,
            index: 1,
            colorKey: [14],
            flipX: false
        });
        this.sprites.push(ticGuy)

        tween = new PositionTween({
            target: ticGuy,
            durationFrames: Util.secondsToFrames(2),
            delayFrames: Util.secondsToFrames(0.5),
            startX: 0,
            endX: 224,
            easing: Easing.easeInOutQuad,
            yoyo: true,
            repeat: -1,
        });
        this.tweens.push(tween)
    }

    update = () => {
        this.tweens.map(tween => tween.TIC())
    }

    draw = () => {
        cls(13)
    }
}