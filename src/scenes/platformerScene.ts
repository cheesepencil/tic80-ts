/// <reference path="../lib/camera.ts" />

class PlatformerScene extends Scene {
    camera: Camera = new Camera()
    platformerSprites: PlatformerSprite[] = []

    init = () => {
        const platformerSprite = new PlatformerSprite({
            x: 1 * 8,
            y: 32 * 8,
            heightSprites: 1,
            widthSprites: 1,
            index: 48,
            colorKey: 0,
            camera: this.camera
        })
        this.platformerSprites.push(platformerSprite)
        this.camera.target = platformerSprite
        this.camera.centerOn(platformerSprite)
    }

    update = () => {
        for (let sprite of this.platformerSprites) {
            sprite.update()
        }

        this.camera.update()
    }

    draw = () => {
        cls(0)
        map(0, 0,
            59, 34,
            -this.camera.x, -this.camera.y)
        for (let sprite of this.platformerSprites) {
            sprite.draw()
        }
    }
}