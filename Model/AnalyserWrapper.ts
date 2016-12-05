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
        const WIDTH = 300;
        const HEIGHT = 150;
        this.latestRequestAnimationId = requestAnimationFrame(()=>{
            this.draw();
        });
        this.analyser.getByteTimeDomainData(this.dataArray);
        this.context.fillStyle = 'rgb(200, 200, 200)';
        this.context.fillRect(0, 0, WIDTH, HEIGHT);

        this.context.lineWidth = 2;
        this.context.strokeStyle = 'rgb(0, 0, 0)';

        this.context.beginPath();

        const sliceWidth = WIDTH * 1.0 / this.bufferLength;
        let x = 0;

        for (let i = 0; i < this.bufferLength; i++) {

            var v = this.dataArray[i] / 128.0;
            var y = v * HEIGHT / 2;

            if (i === 0) {
                this.context.moveTo(x, y);
            } else {
                this.context.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.context.lineTo(WIDTH, HEIGHT / 2);
        this.context.stroke();
    }
    stopDraw() {
        cancelAnimationFrame(this.latestRequestAnimationId);
    }

}
