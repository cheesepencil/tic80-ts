/// <reference path="./constants.ts" />
/// <reference path="./box.ts" />

class Camera {
    x: number = 0
    y: number = 0
    bounds: Box = {
        v1: new Vector(0, 0),
        v2: new Vector(Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT)
    }
    target?: { x: number, y: number }

    offsetY: number = -Constants.SCREEN_HEIGHT / 2
    offsetX: number = -Constants.SCREEN_WIDTH / 2

    panSpeedX: number = 0.075
    panSpeedY: number = 0.075

    update() {
        if (!this.target) return

        const lerpedX = Util.lerp(this.x - this.offsetX, this.target.x, this.panSpeedX)
        this.setX(Math.floor(lerpedX + this.offsetX))

        const lerpedY = Util.lerp(this.y - this.offsetY, this.target.y, this.panSpeedY)
        this.setY(Math.floor(lerpedY + this.offsetY))
    }

    centerOn(target: { x: number, y: number }) {
        this.setX(target.x + this.offsetX)
        this.setY(target.y + this.offsetY)
    }

    setX(x: number) {
        this.x = Util.clamp(this.x, this.bounds.v1.x, this.bounds.v2.x)
    }

    setY(y: number) {
        this.y = Util.clamp(y, this.bounds.v1.y, this.bounds.v2.y)
    }
}