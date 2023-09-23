/// <reference path="./camera.ts" />
/// <reference path="./sprite.ts" />

class Scene {
    camera: Camera = new Camera()
    sprites: Sprite[] = []
    map: Map | undefined

    init: () => void = () => { }
    update: () => void = () => { }
    draw: () => void = () => { }

    private initialized = false

    readonly TIC = () => {
        if (!this.initialized) {
            this.init()
            this.initialized = true
        }

        this.update()
        for (const sprite of this.sprites) {
            sprite.update()
        }
        this.camera.update()

        this.draw()
        if (this.map) {
            map(this.map.x, this.map.y,
                this.map.w, this.map.h,
                -this.camera.x, -this.camera.y)
        }
        for (let sprite of this.sprites) {
            sprite.draw()
        }
    }
}