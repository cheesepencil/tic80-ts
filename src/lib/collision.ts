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

    static collideSide(sprite: { x: number, w: number, dx: number, y: number, flags: number[] }) {
        const offset = Math.floor(sprite.w / 3)

        for (let i = -(offset); i += offset; i == 2) {
            // if tile at sprite.x + offset / sprite.w, sprite.y + i / sprite.h 
            // has a flag in flags then...
            if (true) {
                sprite.dx = 0
                sprite.x = (Math.floor(((sprite.x + (offset)) / sprite.w)) * sprite.w) - (offset)
                return true
            }
        }
    }
}