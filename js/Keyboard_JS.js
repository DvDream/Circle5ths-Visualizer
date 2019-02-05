//AGGIORNAMENTO: ALLO STATO ATTUALE IL CODICE FUNZIONA ANCHE CON UNA TASTIERA MIDI, TESTATO E FUNZIONANTE
var key= "q2w3er5t6y7uzsxdcvgbhnjm"
var midi;
var c = new AudioContext();
var analyser = c.createAnalyser();
var volume_master= c.createGain();

volume_master.connect(c.destination);



analyser.fftSize=2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);


var gain_vec= [];
export var chord_;         //VARIABILE CHE IDENTIFICA UN SINGOLO ACCORDO E CHE VIENE SOVRASCRITTA OGNI VOLTA
var chords_vec=[];  //VETTORE DI ACCORDI
var midi_vec=[];    //VETTORE DI NUMERI MIDI (PER GESTIRE I RIVOLTI)
var note_vec=[];    //VETTORE DI NOTE (PER IL RICONOSCIMENTO DELL'ACCORDO)
var collect_note=[[]];  //VETTORE CONTENTE VETTORI DI NOTE
var collect_midi= [[]]; //VETTORE CONTENENTE VETTORI DI NUMERI MIDI (IDEA PER LOOP MAYBE)
var i=0;
import { chord } from "./tonal/extensions/detect/index.js";
import { Note, Chord } from "./tonal";
import {canvas, ctx, my_gradient, blink } from "./canvas.js";
import {canvas  as canvas2, reset_canvas2,split_array} from "./canvas_progression.js";
import {ctx as ctx2}  from "./canvas_progression.js";
import {circle, key_, findKey,degree,key_minor_arr} from "./circleFifth.js";
var counter = new Array(circle.length).fill(0);
var octave_step=0;
var color_chord= [];
 var maj_scale= [2,2,1,2,2,2,1];
 export var scale_maj=[];
 var chromatic_scale=["C","Db/C#","D","Eb","E","F","Gb/F#","G","Ab","A","Bb","B"];
var change_scale=0;

//--------------FUNCTION FOR THE DICTIONARY---------------------------------------------------------------------//
var canvas3=document.querySelector("#canvas3");
var context = canvas3.getContext("2d");
import {dizionario as dict}  from "./dizionario.js"
//var getKey = (obj,val) => Object.keys(obj).find(key => obj[key].length === val.length && obj[key].every((kn) => val.includes(kn)));

function getKey(obj, arr) {

  // Grab the key from the first object that satisfies the condition...
  const [ key ] = Object.entries(obj).find(([key, notes]) => {

    // ...that all the notes in the object are included in the
    // array that was passed in. As long as the notes array and the
    // query array are the same length, the notes can be in any order
    return arr.length === notes.length && arr.every(note => notes.includes(note));
  });

  // Return that key
  return key;
}

//console.log(dict["Dmaj7"])
//console.log(getKey(dict,["C","E","G","B"]));


//------------------------------------------------------------------------------------------------------------------//


function render(vec,key){
  //console.log(key);
  var y= document.getElementsByClassName("Key");
  var x = document.getElementsByClassName("chord");
  x[i].innerHTML = vec[i];
  x[i].style.color = "#14fdce";
  x[i].style.textAlign = "center";
  x[i].style.top= "50px";
  x[i].style.fontWeight = "900";
  x[i].style.verticalAlign = 'middle';
  x[i].style.fontFamily = 'Prompt';
  if(chords_vec.length==4){
    y[0].innerHTML = key+key_minor_arr;
    y[0].style.color = "#14fdce";
    y[0].style.textAlign = "center";
    y[0].style.top= "50px";
    y[0].style.fontWeight = "900";
    y[0].style.verticalAlign = 'middle';
    y[0].style.fontFamily = 'Prompt';
  }
  note_vec=[];
  midi_vec=[];
  chord_=null;
  i=i+1;

}


//FUNZIONE DI TIMEOUT SE NON VIENE PREMUTA SUBITO UN'ALTRA NOTA------------------------//


function timeOut(){
  note_vec=[];
  midi_vec=[];
}

//-----------------------FUNZIONE MOSTRA TASTI DELLA TASTIERA-----------------------//

document.getElementById("button").onclick= function(){
  for(var i=0; i<key.length; i++){
  document.getElementsByClassName("keyboard")[i].classList.toggle("keyboard_grey");
}
}
//--------------------------VOLUME MASTER HANDLER---------------------------------//
document.getElementById("slider").addEventListener("input", changeVol);

function changeVol(){
  volume_master.gain.value= parseFloat(document.getElementById("slider").value);
  console.log(volume_master.gain.value);

}
//-------------------------FUNZIONE DI RESET--------------------------------------//


document.getElementById("reset").onclick= function(){
  for(var j=0; j<chords_vec.length; j++){
  var x = document.getElementsByClassName("chord");
  x[j].innerHTML = "";
}
document.getElementsByClassName("Key")[0].innerHTML= "";
  i=0;
  chords_vec=[];
  counter.fill(0);
  console.log(chords_vec);
  color_chord=[];
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
  reset_canvas2();
    scale_maj=[];
}

//console.log($("#highlight").position().left/ $("#highlight").parent().width() * 100);



//----------------------------OCTAVE CHANGES....................................//
$(document).ready(function() {
    $('#min_oct').click(function() {


      octave_step= octave_step-12;

      if(octave_step<-36){                  //controllo che impedisce l'aumento dell'ottava anche se il riquadro sta fermo
        octave_step=-36;
      }
      console.log(octave_step);

      switch(octave_step){
        case 12: document.getElementById("C-first").innerHTML= "C5";
                document.getElementById("C-second").innerHTML= "C6";
                break;

        case 0: document.getElementById("C-first").innerHTML= "C4";
                document.getElementById("C-second").innerHTML= "C5";
                break;
        case -12: document.getElementById("C-first").innerHTML= "C3";
                document.getElementById("C-second").innerHTML= "C4";
                break;
        case -24: document.getElementById("C-first").innerHTML="C2";
                  document.getElementById("C-second").innerHTML="C3";
                  break;
        case -36: document.getElementById("C-first").innerHTML="C1";
                  document.getElementById("C-second").innerHTML="C2";
                  break;
      }

      var containerWidth = $(".mini_keyboard").width();
      var left = parseFloat($('.highlighted').css('left'));
      //console.log(left);
      var step = (containerWidth * 0.145);
      if(left < step){
        $('.highlighted').css('left',left);
      }
      else{
        left= left - step;
        $('.highlighted').css('left',left);
      }
    });
});

$(document).ready(function() {
    $('#plus_oct').click(function() {



      if(octave_step==24){                //controllo che impedisce l'aumento dell'ottava anche se il riquadro sta fermo
        octave_step=octave_step-12;
      }
        octave_step= octave_step+12;
      console.log(octave_step);

      switch(octave_step){
        case 0: document.getElementById("C-first").innerHTML= "C4";
                document.getElementById("C-second").innerHTML= "C5";
                break;
        case 12: document.getElementById("C-first").innerHTML= "C5";
                document.getElementById("C-second").innerHTML= "C6";
                break;
        case 24: document.getElementById("C-first").innerHTML= "C6";
                document.getElementById("C-second").innerHTML= "C7";
                break;
                case -24: document.getElementById("C-first").innerHTML="C2";
                          document.getElementById("C-second").innerHTML="C3";
                          break;
                          case -12: document.getElementById("C-first").innerHTML= "C3";
                                  document.getElementById("C-second").innerHTML= "C4";
                                  break;
      }

      var containerWidth = $(".mini_keyboard").width();
      var left = parseFloat($('.highlighted').css('left'));
    //  console.log(left);
      var step = (containerWidth * 0.145);
      if(left > (containerWidth - (2*step))){
        $('.highlighted').css('left',left);
      }
      else{
        left = left + step;
        $('.highlighted').css('left',left);
      }
    });
});



//--------------------------------------------------------------------------------//
document.onkeydown = function(e) {
  if(!e.repeat){
//  console.log("Hai premuto", key.indexOf(e.key) )
  var keypressed=key.indexOf(e.key)
//  console.log(keypressed)
  document.getElementById(keypressed).classList.toggle("clicked");
  playNote(Math.pow(2,(keypressed-9+octave_step)/12)*440, 144);
  setTimeout(timeOut, 2000);
   var midi_num = [keypressed+octave_step+60];
   detect_chord (midi_num);
  }
}

// -45,-33,-21,-9,3,15,27
document.onkeyup= function(e) {
  if(!e.repeat){
//    console.log("Hai rilasciato", key.indexOf(e.key) )
  var keypressed=key.indexOf(e.key)
  document.getElementById(keypressed).classList.toggle("clicked");
  playNote(Math.pow(2,(keypressed-9+octave_step)/12)*440,128);
}
}

//GESTIONE TASTIERA MOUSECLICK
//Sistemare il playNote al mouseclick
document.querySelectorAll(".rect_white").forEach(toggleRect);

function toggleRect(rect_white) {
  rect_white.onmousedown = clickOnRect;
  rect_white.onmouseup = clickOffRect;
}

function clickOnRect(data) {
  //console.log(data)
  var id = data.path[0].id;
  document.getElementById(id).classList.toggle("clicked");
  playNote(Math.pow(2,((id)-9+octave_step)/12)*440, 144);
}
function clickOffRect(data) {
  //console.log(data)
  var id = data.path[0].id;
  document.getElementById(id).classList.toggle("clicked");
  playNote(Math.pow(2,((id)-9+octave_step)/12)*440, 128);
}

//GESTIONE MIDI IN INGRESSO
if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
    navigator.requestMIDIAccess().then(onMIDISuccess);
  }
else {
    console.log('WebMIDI is not supported in this browser.');
}


function onMIDISuccess(midiAccess) {
    midi = midiAccess;
  //  console.log(midi.inputs)
    var allInputs = midi.inputs.values();
  //loop attorno a tutti gli input per trovare qualsiasi MIDI input
    for (var input = allInputs.next(); input && !input.done; input = allInputs.next()) {
    // Quando ricevo un MIDI chiamo la funzione onMIDIMessage
    input.value.onmidimessage = getMIDImessage;
  }
}



function getMIDImessage(midiMessage){
    var on_off = midiMessage.data[0];
    var midi_number = midiMessage.data[1];
    console.log(midi_number);
    //console.log(on_off);
    var f= Math.pow(2,(midi_number-69)/12)*440
    document.getElementById(midi_number-60-octave_step).classList.toggle("clicked");
    playNote(f, on_off);
    setTimeout(timeOut, 2000);
    if(on_off==144){
    detect_chord(midi_number);
    }
    else{
       //midi_vec=[];
    }
}



function playNote(freq,on_off){
  switch(on_off){
    case 144:

              var o = c.createOscillator();
              var g = c.createGain();
              o.type="triangle";
              o.connect(g);
              g.connect(volume_master);
              volume_master.connect(analyser);
              o.frequency.value = freq;
              g.gain.value=0;
              //g.gain.setValueAtTime(0, c.currentTime);
              g.gain.linearRampToValueAtTime(1, c.currentTime+0.5); //Problematica: se il testo viene premuto e rilasciato subito, il suono continua all'infinito. AGGIUSTARE QUEST'ASPETTO
              g.gain.linearRampToValueAtTime(0.6, c.currentTime+0.4);
              o.start();
              gain_vec[freq]=g;
              drawSamples();
              break;
    case 128:
              releaseNote(freq);
              break;
  }
}


function releaseNote(f){
     gain_vec[f].gain.linearRampToValueAtTime(0, c.currentTime+0.5);
}


//-------------DETECTION CHORD FUNCTION-----------------//


function detect_chord(midi_num){
    midi_vec.push(midi_num);
    note_vec.push(Note.pc(Note.fromMidi(midi_num, true)));
  //  console.log(note_vec);
  if(note_vec.length==4 && midi_vec.length==4 && chords_vec.length<4){
      collect_midi.push(midi_vec);
    //  console.log(collect_midi);
      collect_note.push(note_vec);
      var min_midi = Math.min.apply(Math, midi_vec)
      var bass_note= Note.fromMidi(min_midi);
      var accordo = getKey(dict,note_vec);
      chord_=getKey(dict,note_vec)+"/"+bass_note;
      chords_vec.push(chord_);
      find_indexes(accordo);
      blink(color_chord);
      var chiave= findKey(accordo,counter,chords_vec);
      console.log(chiave);
      render(chords_vec,chiave);  //VISUALIZZA SULLO SCHERMO
      scale(chiave);


      console.log(chords_vec);

  }
}

function find_indexes(chord) {
for(var i=0; i<circle.length; i++){
   for(var j=0; j<circle[i].length; j++){
       if(circle[i][j] == chord){
          color_chord.push([i,j,0]);

    //       console.log("found " + chord + " at (" + i + ", " + j + ")");
         }
         }
}
   console.log("color chord",color_chord);
}


function scale(key_arr){
  var appoggio;
  for(var j=0; j<key_arr.length; j++){
  var arr=[];
  var index_maj=chromatic_scale.indexOf(key_arr[j]);
  if(chromatic_scale[index_maj].includes("#")){
    appoggio=chromatic_scale[index_maj].replace("/","_")
    arr.push(appoggio.replace("#","sharp"));
  }else{
  arr.push(chromatic_scale[index_maj]);
}
      for(i=0; i<maj_scale.length; i++){
        index_maj=index_maj+maj_scale[i];

        if(index_maj>=chromatic_scale.length){
          index_maj=index_maj%chromatic_scale.length;
        }
        console.log(index_maj);

        if(chromatic_scale[index_maj].includes("#")){
          appoggio=chromatic_scale[index_maj].replace("/","_")
          arr.push(appoggio.replace("#","sharp"));
        }else{
        arr.push(chromatic_scale[index_maj]);
      }

      }
  scale_maj.push(arr);
  console.log(scale_maj);
  arr=[];
  //    console.log(scale_min);
  }

  for(var i=0; i<scale_maj[change_scale].length;i++){
         $("#"+scale_maj[change_scale][i]).css("visibility", "visible");
    }
  console.log(scale_maj);
}

function drawSamples(){
  analyser.getByteFrequencyData(dataArray);
  context.clearRect(0,0,canvas3.width, canvas3.height)
  context.beginPath();
for(var i=0; i<canvas3.width;i++){
  context.lineTo(dataArray[i],i);
}
  context.stroke();
  context.strokeStyle = "white";
  requestAnimationFrame(drawSamples)
}
