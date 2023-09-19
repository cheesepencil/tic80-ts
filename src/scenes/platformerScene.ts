class PlatformerScene extends Scene {
    platformerSprites: PlatformerSprite[] = []

    init = () => {
        this.platformerSprites.push(new PlatformerSprite({
            x: 1*8,
            y: 15*8-8,
            heightSprites: 2,
            widthSprites: 2,
            index: 1,//48,
            colorKey: 0
        }))
        this.platformerSprites.push(new PlatformerSprite({
            x: 1*8,
            y: 7*8-8,
            heightSprites: 1,
            widthSprites: 1,
            index: 48,
            colorKey: 0
        }))
    }

    update = () => {
        for(let sprite of this.platformerSprites){
            sprite.update()
        }
    }

    draw = () => {
        map(0, 0)
        for(let sprite of this.platformerSprites){
            sprite.draw()
        }
    }
}