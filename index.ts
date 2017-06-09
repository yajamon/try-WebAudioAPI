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

    const gain = audioCtx.createGain();
    gain.gain.value = 0.5;
    nodes.push(gain);

    joinAudioNodesWithAnalyserAndConnectDestination(nodes);

    // global気持ち悪い
    renderAnalysers(analysers);
}

function joinSerialAudioNodes(nodes:AudioNode[]){
    nodes.reduce((prev, current)=>{
        prev.connect(current);
        return current
    }).connect(audioCtx.destination);
}

function createAnalysers(nodes:AudioNode[]):AnalyserWrapper[]{
    return nodes.map(node => {
        const wrapper = new AnalyserWrapper(audioCtx.createAnalyser());
        node.connect(wrapper.analyser);
        return wrapper;
    });
}

function joinAudioNodesWithAnalyserAndConnectDestination(nodes:AudioNode[]){
    nodes.map(node => {
        const analyser = new AnalyserWrapper(audioCtx.createAnalyser());
        node.connect(analyser.analyser);
        analysers.push(analyser);
        return {node: node, analyser: analyser};
    }).reduce((prev, current) => {
        prev.analyser.analyser.connect(current.node);
        return current
    }).analyser.analyser.connect(audioCtx.destination);
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
