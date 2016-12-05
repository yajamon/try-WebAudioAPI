/**
 * AnalyserWrapper
 */
class AnalyserWrapper {
    canvas = document.createElement("canvas");
    context = this.canvas.getContext("2d");
    latestRequestAnimationId: number = null;

    bufferLength: number;
    dataArray: Uint8Array;
    constructor(public analyser: AnalyserNode) {
        this.analyser.fftSize = 2048;
        this.bufferLength = analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
    }

    draw() {
        this.latestRequestAnimationId = requestAnimationFrame(this.draw);
    }
    stopDraw() {
        cancelAnimationFrame(this.latestRequestAnimationId);
    }

}
