/**
 * AnalyserWrapper
 */
class AnalyserWrapper {
    canvas = document.createElement("canvas");
    context = this.canvas.getContext("2d");
    latestRequestAnimationId:number = null;
    constructor(analyser:AnalyserNode) {
    }

    draw(){
        this.latestRequestAnimationId = requestAnimationFrame(this.draw);
    }
    stopDraw(){
        cancelAnimationFrame(this.latestRequestAnimationId);
    }

}
