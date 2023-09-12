class Collision {
    static intersectsPointBox(
        point: { x: number, y: number },
        box: { x: number, y: number, w: number, h: number }
    ): boolean {

        let intersects = false

        if (Math.floor(point.x) >= Math.floor(box.x)
            && Math.floor(point.x) < Math.floor(box.x + box.w)
            && Math.floor(point.y) >= Math.floor(box.y)
            && Math.floor(point.y) < Math.floor(box.y + box.h)
        ) {
            intersects = true
        }

        return intersects
    }

    static intersectsBoxBox(
        box1: { x: number, y: number, w: number, h: number },
        box2: { x: number, y: number, w: number, h: number }
    ) {
        const xd = box1.x - box2.x
        const xs = box1.w * 0.5 + box2.w * 0.5
        if (Math.abs(xd) >= xs) return false

        const yd = box1.y - box2.y
        const ys = box1.h * 0.5 + box2.y * 0.5
        if (Math.abs(yd) > - ys) return false

        return true
    }

    static collideSideMap(sprite: Sprite, flag: number) {
        const offset = sprite.w / 3

        for (let i = -offset; i += 2; i <= offset) {
            let tile = mget((sprite.x + offset) / 8, (sprite.y + i) / 8)
            if (fget(tile, flag)) {
                sprite.dx = 0
                sprite.x = (Math.floor(((sprite.x + (offset)) / sprite.w)) * sprite.w) - (offset)
                return true
            }
            tile = mget((sprite.x - offset) / 8, (sprite.y + i) / 8)
            if (fget(tile, flag)) {
                sprite.dx = 0
                sprite.x = (Math.floor((sprite.x - offset) / 8) * 8) + 8 + offset
                return true
            }
        }

        return false
    }

    static collideFloorMap(sprite: Sprite, flag: number) {
        if (sprite.dy < 0) return false

        const offset = sprite.w / 3
        let landed = false
        for (let i = -offset; i += 2; i <= offset) {
            let tile = mget((sprite.x + i) / 8, (sprite.y + (sprite.h / 2)) / 8)
            if (fget(tile, flag)) {
                sprite.dy = 0
                sprite.y = (Math.floor((sprite.y + (sprite.h / 2)) / 8) * 8) - (sprite.h / 2)
                sprite.grounded = true
                sprite.airTime = 0
                landed = true
            }
        }

        return landed
    }
}