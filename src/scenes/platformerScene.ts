/// <reference path="../lib/scene.ts" />
/// <reference path="../lib/platform.ts" />

class PlatformerScene extends Scene {
    init = () => {
        const platformerSprite = new PlatformerSprite(this,
            {
                ...new PlatformerSpriteConfig(),
                x: 1 * 8,
                y: 1 * 8,
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
                v2: new Vector(0, 0)
                // v2: new Vector(Constants.SCREEN_WIDTH * 2, Constants.SCREEN_HEIGHT)
            }
        })
        this.map = new Map({
            x: 60,
            y: 0,
            w: Constants.MAP_WIDTH_DEFAULT,
            h: Constants.MAP_HEIGHT_DEFAULT
        })
        this.platforms.push(new ExamplePlatform1(this))
        this.platforms.push(new ExamplePlatform2(this))
        this.platforms.push(new ExamplePlatform3(this))
    }

    update = () => {

    }

    draw = () => {
        cls(0)
    }
}

class ExamplePlatform1 extends Platform {
    tween: PositionTween

    constructor(scene: Scene) {
        super(scene, { x: 8 * 8, y: 13 * 8, w: 3 * 8, h: 8 })
        this.tween = new PositionTween({
            target: this,
            durationFrames: 240,
            repeat: -1,
            yoyo: true,
            startX: this.x,
            startY: this.y,
            endX: this.x + 88,
            endY: this.y
        })
    }

    update = () => {
        const oldX = this.x
        const oldY = this.y
        this.tween.TIC()
        this.dx = this.x - oldX
        this.dy = this.y - oldY
    }

    draw = () => {
        const spritesWide = Math.floor(this.w / 8)
        for (let i = 0; i < spritesWide; i++) {
            spr(38, this.x + (i * 8) - this.scene.camera.x, this.y - this.scene.camera.y)
        }
    }
}

class ExamplePlatform2 extends Platform {
    tween: PositionTween

    constructor(scene: Scene) {
        super(scene, { x: 8 * 3, y: 9 * 8, w: 3 * 8, h: 8 })
        this.tween = new PositionTween({
            target: this,
            durationFrames: 120,
            repeat: -1,
            yoyo: true,
            startX: this.x,
            startY: this.y,
            endX: this.x,
            endY: this.y - 32
        })
    }

    update = () => {
        const oldX = this.x
        const oldY = this.y
        this.tween.TIC()
        this.dx = this.x - oldX
        this.dy = this.y - oldY
    }

    draw = () => {
        const spritesWide = Math.floor(this.w / 8)
        for (let i = 0; i < spritesWide; i++) {
            spr(38, this.x + (i * 8) - this.scene.camera.x, Math.floor(this.y - this.scene.camera.y))
        }
    }
}

class ExamplePlatform3 extends Platform {
    counter = 0

    constructor(scene: Scene) {
        super(scene, {
            x: Constants.SCREEN_WIDTH / 2,
            y: Constants.SCREEN_HEIGHT / 2,
            w: 3 * 8,
            h: 8
        })
    }

    update = () => {
        const oldX = this.x
        const oldY = this.y

        this.counter += 1
        this.x = (Constants.SCREEN_WIDTH / 2) + 32 * Util.picoSin(this.counter / 500)
        this.y = (Constants.SCREEN_HEIGHT / 2 - 32) + 32 * Util.picoCos(this.counter / 500)

        this.dx = this.x - oldX
        this.dy = this.y - oldY
    }

    draw = () => {
        const spritesWide = Math.floor(this.w / 8)
        for (let i = 0; i < spritesWide; i++) {
            spr(38, this.x + (i * 8) - this.scene.camera.x, Math.floor(this.y - this.scene.camera.y))
        }
    }
}