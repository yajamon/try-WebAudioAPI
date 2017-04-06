/// <reference path="./Model/AnalyserWrapper.ts" />


const audioCtx = new AudioContext();
let nodes:AudioNode[] = [];
let analysers:AnalyserWrapper[] = [];

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
    const ocr = audioCtx.createOscillator();
    ocr.type = OscillatorNodeType.Sine;
    ocr.frequency.value = hertzByMidiNoteNumber(noteNumber);
    ocr.start(audioCtx.currentTime);
    nodes.push(ocr);
    const ocrAnalyser = new AnalyserWrapper(audioCtx.createAnalyser());

    const gain = audioCtx.createGain();
    gain.gain.value = 0.5;
    nodes.push(gain);
    const gainAnalyser =  new AnalyserWrapper(audioCtx.createAnalyser());

    ocr.connect(ocrAnalyser.analyser);
    ocrAnalyser.analyser.connect(gain);
    gain.connect(gainAnalyser.analyser);
    gainAnalyser.analyser.connect(audioCtx.destination);

    analysers.push(ocrAnalyser);
    analysers.push(gainAnalyser);

    renderAnalysers(analysers);
}

function renderAnalysers(analysers:AnalyserWrapper[]){
    const analysersDom = document.getElementById('analysers');
    analysers.forEach(analyser =>{
        analysersDom.appendChild(analyser.canvas);
        analyser.draw();
    });
}

function clear(){
    nodes.forEach((node)=>{
        if(node instanceof OscillatorNode){
            // node.stop()
        }
        node.disconnect();
    });
    nodes = [];

    analysers.forEach((wrapper)=>{
        wrapper.analyser.disconnect();
        wrapper.canvas.remove();
    });
    analysers = [];
}

window.addEventListener('load', function(){
    const doms = document.getElementsByClassName('clear');
    for(let index=0; index<doms.length; ++index){
        doms[index].addEventListener('click', function(){
            clear();
        });
    }
});
