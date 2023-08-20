interface SpriteConfig {
    x?: number
    y?: number
    widthSprites?: number
    heightSprites?: number
    index: number
    colorKey: number | number[]
}

class Sprite implements Positionable {
    x: number
    y: number
    widthSprites: number
    heightSprites: number
    index: number
    colorKey: number | number[]

    constructor(config: SpriteConfig) {
        this.x = config.x || 0
        this.y = config.y || 0
        this.widthSprites = config.widthSprites || 1
        this.heightSprites = config.heightSprites || 1
        this.index = config.index
        this.colorKey = config.colorKey
    }

    draw() {
        spr(this.index, this.x, this.y, this.colorKey, 1, 0, 0, this.widthSprites, this.heightSprites)
    }
}