/// <reference path="../lib/scene.ts" />

class PlatformerScene extends Scene {
    init = () => {
        const platformerSprite = new PlatformerSprite(this,
            {
                ...new PlatformerSpriteConfig(),
                x: 2 * 8,
                y: 2 * 8,
                heightSprites: 1,
                widthSprites: 1,
                index: 48,
            })
        this.sprites.push(platformerSprite)
        this.camera.configure({
            target: platformerSprite,
            lerpX: 0.05,
            lerpY: 0.05,
            bounds: {
                v1: new Vector(0, 0),
                v2: new Vector(Constants.SCREEN_WIDTH * 2, Constants.SCREEN_HEIGHT)
            }
        })
        this.map = new Map({
            x: 60,
            y: 34,
            w: Constants.MAP_WIDTH_DEFAULT * 2,
            h: Constants.MAP_HEIGHT_DEFAULT * 2
        })
    }

    update = () => {

    }

    draw = () => {
        cls(0)
    }
}