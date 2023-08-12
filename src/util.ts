class Util {
    static secondsToFrames = function (seconds: number): number {
        return Math.floor(seconds * 60);
    }

    static lerp = function (a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    static invlerp = function (a: number, b: number, v: number) {
        if (b - a === 0) return 0;
        return (v - a) / (b - a);
    }
}