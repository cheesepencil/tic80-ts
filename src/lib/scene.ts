class Scene {
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

        this.draw()
    }
}