/// <reference path="../lib/fancyText.ts" />

class ButtonScene extends Scene {
    counter = 0
    fancyText = new FancyText()

    init = () => {
        this.fancyText.text = "The quick fox jumped over the lazy dog"
        this.fancyText.x = 16 // Constants.SCREEN_WIDTH / 2 - 64
        this.fancyText.y = Constants.SCREEN_HEIGHT / 2
        this.fancyText.scale = 1
        this.fancyText.marginX = 3
        this.fancyText.marginY = 3
        this.fancyText.bubbleSize = 2
    }

    update = () => {
        if (btn(4)) {
            this.counter += 1
        }
        else {
            this.counter = 0
        }
        this.fancyText.update()
    }

    draw = () => {
        cls(14)

        this.fancyText.draw()
    }
}