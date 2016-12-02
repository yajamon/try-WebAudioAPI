const audioCtx = new AudioContext();
const nodes:AudioNode[] = [];

namespace OscillatorNodeType {
    export const Sine = 'sine'
    export const Square = 'square'
    export const Sawtooth = 'sawtooth'
    export const Triangle = 'triangle'
    export const Custom = 'custom'
}

function hertzByMidiNoteNumber(noteNumber:number):number{
    return (Math.pow(2, (noteNumber - 69)/12 ) ) * 440;
}

function my01(){
    my02(69);
}

function my02(noteNumber:number){
    let ocr = audioCtx.createOscillator();
    ocr.type = OscillatorNodeType.Sine;
    ocr.frequency.value = hertzByMidiNoteNumber(noteNumber);
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
