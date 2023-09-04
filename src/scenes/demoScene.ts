class DemoScene implements Scene {
    private initialized = false
    private sprites: Sprite[] = []
    private tweens: PositionTween[] = []

    init(): void {
        this.initialized = true
        let ticGuy = new Sprite({
            x: 0,
            y: 32,
            heightSprites: 2,
            widthSprites: 2,
            index: 1,
            colorKey: 14,
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

        ticGuy = new Sprite({
            x: 0,
            y: 96,
            heightSprites: 2,
            widthSprites: 2,
            index: 1,
            colorKey: 14,
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

    TIC(): void {
        if (!this.initialized) this.init()

        this.tweens.map(tween => tween.TIC())
        
        cls(13)
        this.sprites.map(sprite => sprite.draw())


        // spr(1 + (((t % 60) / 30) | 0) * 2,
        //     foo.x, foo.y, 14, 3, 0, 0, 2, 2)
        // t++
    }

}