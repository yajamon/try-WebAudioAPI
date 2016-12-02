const audioCtx = new AudioContext();
const nodes:AudioNode[] = [];

namespace OscillatorNodeType {
    export const Sine = 'sine'
    export const Square = 'square'
    export const Sawtooth = 'sawtooth'
    export const Triangle = 'triangle'
    export const Custom = 'custom'
}

function my01(){
    let ocr = audioCtx.createOscillator();
    ocr.type = OscillatorNodeType.Sine;
    ocr.frequency.value = 440;
    ocr.start(audioCtx.currentTime);

    let gain = audioCtx.createGain();
    gain.gain.value = 0.5;

    ocr.connect(gain);
    gain.connect(audioCtx.destination);

    nodes.push(ocr);
    nodes.push(gain);
}

function clear(){
    nodes.forEach((node)=>{
        if(node instanceof OscillatorNode){
            // node.stop()
        }
        node.disconnect();
    })
}
