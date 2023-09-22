interface PlatformerSpriteConfig {
    x?: number
    y?: number
    dx?: number
    dy?: number
    widthSprites?: number
    heightSprites?: number
    index: number
    colorKey: number | number[]
    jumpButton?: number
    camera?: Camera
}

class PlatformerSpriteButton {
    isPressed: boolean = false
    isDown: boolean = false
    ticksDown: number = 0
    jumpBtn: number

    constructor(jumpBtn: number) {
        this.jumpBtn = jumpBtn
    }

    update() {
        this.isPressed = false
        if (btn(this.jumpBtn)) {
            if (!this.isDown) this.isPressed = true
            this.isDown = true
            this.ticksDown += 1
        }
        else {
            this.isDown = false
            this.isPressed = false
            this.ticksDown = 0
        }
    }
}

class PlatformerSprite implements Positionable {
    // dimensions
    x: number
    y: number
    widthSprites: number
    heightSprites: number
    w: number
    h: number

    // movement
    dx: number = 0
    dy: number = 0
    dxMax: number = 1
    dyMax: number = 4

    // jumping
    jumpButton: PlatformerSpriteButton
    jumpSpeed: number = -1.5
    acc: number = 0.1
    dcc: number = 0.25
    airDcc: number = 1
    grav: number = 0.15

    jumpHoldTime: number = 0
    maxJumpPress: number = 15

    jumpBtnReleased = true
    grounded: boolean = false
    airTime: number = 0

    // drawing
    camera: Camera
    index: number
    colorKey: number | number[]
    flipX: boolean = false

    constructor(config: PlatformerSpriteConfig) {
        this.x = config.x || 0
        this.y = config.y || 0
        this.widthSprites = config.widthSprites || 1
        this.w = this.widthSprites * 8
        this.heightSprites = config.heightSprites || 1
        this.h = this.heightSprites * 8
        this.index = config.index
        this.colorKey = config.colorKey
        this.jumpButton = new PlatformerSpriteButton(config.jumpButton || 4)
        this.camera = config.camera || new Camera()
    }

    update() {
        const btnLeft = btn(2)
        const btnRight = btnLeft ? false : btn(3)

        // x movement
        if (btnLeft) {
            this.dx -= this.acc
        }
        else if (btnRight) {
            this.dx += this.acc
        }
        else {
            if (this.grounded) this.dx *= this.dcc
            else this.dx *= this.airDcc
        }

        this.dx = Util.clamp(this.dx, -this.dxMax, this.dxMax)
        this.x += this.dx

        // SIDE EFFECTS!
        Collision.collideSideMap(this, 1)

        // jump mechanics
        this.jumpButton.update()
        if (this.jumpButton.isDown) {
            const onGround = this.grounded || (this.airTime < 5)
            const newJumpBtn = this.jumpButton.ticksDown < 10

            if (this.jumpHoldTime > 0 || (onGround && newJumpBtn)) {
                if (this.jumpHoldTime === 0) {
                    // sound effect
                }
                this.jumpHoldTime += 1
                if (this.jumpHoldTime < this.maxJumpPress) {
                    this.dy = this.jumpSpeed
                }
            }
        }
        else this.jumpHoldTime = 0

        // y movement
        this.dy += this.grav
        this.dy = Util.clamp(this.dy, -this.dyMax, this.dyMax)
        this.y += this.dy

        // SIDE EFFECTS!
        const collideFloor = Collision.collideFloorMap(this, 1)
        if (!collideFloor) {
            // jump anim
            this.grounded = false
            this.airTime += 1
        }

        // SIDE EFFECTS!
        Collision.collideRoofMap(this, 1)

        if (this.grounded) {
            if (btnRight) {
                if (this.dx < 0) {
                    // slide anim
                }
                else {
                    // walk anim
                }
            }
            else if (btnLeft) {
                if (this.dx > 0) {
                    // slide anim
                }
                else {
                    // walk anim
                }
            }
            else {
                // stand anim
            }
        }

        if (btnRight) this.flipX = false
        else this.flipX = true

        // animation logic TBA
    }

    draw() {
        spr(
            this.index,
            this.x - this.camera.x,
            this.y - this.camera.y,
            this.colorKey,
            1, // scale
            this.flipX ? 1 : 0, // flip
            0, // rotate
            this.widthSprites,
            this.heightSprites)
    }
}