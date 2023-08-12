class Util {
    static secondsToFrames = function (seconds: number): number {
        return Math.floor(seconds * 60)
    }

    static lerp = function (a: number, b: number, t: number): number {
        return a + (b - a) * t
    }

    static invlerp = function (a: number, b: number, v: number): number {
        if (b - a === 0) return 0
        return (v - a) / (b - a)
    }

    // Simulates PICO-8's sin(), which takes "turns" as input instead of rads
    // and measures the angle in a clockwise direction
    static picoSin(angle: number): number {
        const rads = angle * (Math.PI * 2)
        return -Math.sin(rads)
    }

    // Simulates PICO-8's cos(), which takes "turns" as input instead of rads
    static picoCos(angle: number): number {
        const rads = angle * (Math.PI * 2)
        return Math.cos(rads)
    }
}