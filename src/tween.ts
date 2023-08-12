interface TweenConfig {
    target: Positionable
    durationFrames: number
    delayFrames?: number
    repeat?: number
    yoyo?: boolean
    easing?: (t: number) => number
    startX?: number
    startY?: number
    endX?: number
    endY?: number
    callback?: () => void
}

class PositionTween {
    private frameCounter: number = 0
    private frameCounterIncrement = 1
    private delayCompleted: boolean = false
    private done: boolean = false
    private calledBack: boolean = false
    private repeatCounter: number = 0

    private config: TweenConfig

    constructor(config: TweenConfig) {
        this.config = {
            ...config,
            delayFrames: config.delayFrames ? Math.floor(config.delayFrames) : 0,
            repeat: config.repeat ? Math.floor(config.repeat) : 0,
            yoyo: config.yoyo || false,
            easing: config.easing || Easing.linear,
            callback: config.callback || (() => { }),
        }
    }

    update(): void {
        if (this.done) return

        if (!this.delayCompleted && this.frameCounter >= this.config.delayFrames!) {
            this.delayCompleted = true
            this.frameCounter = 0
        }

        if (this.delayCompleted) {
            let progress = this.frameCounter / this.config.durationFrames
            progress = Math.min(progress, 1)
            progress = Math.max(progress, 0)

            const easedProgress = this.config.easing!(progress)
            if (this.config.startX !== undefined && this.config.endX !== undefined) {
                this.config.target.x = Util.lerp(this.config.startX, this.config.endX, easedProgress)
            }
            if (this.config.startY !== undefined && this.config.endY !== undefined) {
                this.config.target.y = Util.lerp(this.config.startY, this.config.endY, easedProgress)
            }

            if (this.frameCounterIncrement > 0 && progress === 1) {
                if (this.config.yoyo) {
                    this.frameCounterIncrement = -1
                } else {
                    this.repeatCounter++
                    this.frameCounter = 0
                }
            } else if (this.frameCounterIncrement < 0 && progress === 0) {
                this.repeatCounter++
                this.frameCounterIncrement = 1
            }

            if (this.config.repeat! >= 0 && this.repeatCounter > this.config.repeat!) {
                this.done = true
            }
        }

        this.frameCounter += this.frameCounterIncrement
    }
}
