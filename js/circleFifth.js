export var circle = [];
circle.push(["Fmaj7","Cmaj7", "G7","Dm7", "Am7","Em7", "Bsemi"]);
circle.push(["Cmaj7","Gmaj7", "D7","Am7", "Em7","Bm7", "F#semi"]);
circle.push(["Gmaj7","Dmaj7", "A7","Em7", "Bm7","F#m7",  "C#semi"]);
circle.push([ "Dmaj7","Amaj7","E7","Bm7", "F#m7","C#m7",  "G#semi"]);
circle.push([ "Amaj7","Emaj7", "B7","F#m7","C#m7","G#m7",  "D#semi"]);
circle.push(["Emaj7","Bmaj7","F#7","C#m7","G#m7","D#m7",    "A#semi"]);
circle.push([ "Bmaj7","F#maj7","C#7","G#m7","D#m7","A#m7", "Fsemi"]);
circle.push(["F#maj7","C#maj7","G#7","D#m7","A#m7","Fm7", "Csemi"]);
circle.push(["C#maj7","G#maj7",  "D#7","A#m7", "Fm7","Cm7", "Gsemi"]);
circle.push([ "G#maj7","D#maj7", "A#7","Fm7","Cm7","Gm7",  "Dsemi"]);
circle.push([ "D#maj7","A#maj7", "F7","Cm7", "Gm7","Dm7", "Asemi"]);
circle.push(["A#maj7","Fmaj7", "C7","Gm7",  "Dm7","Am7", "Esemi"]);
import {stato,cancel_stato} from "./canvas.js";
import {canvas  as canvas2,show_progression,change_progression} from "./canvas_progression.js";
import {ctx as ctx2}  from "./canvas_progression.js";
export var key_ = ["C","G","D","A","E","B","Gb/F#","Db/C#","Ab","Eb","Bb","F"];
export key_minor_arr=[];
export var degree= [];
var i=0;
var end=0;
var count;
export var flag=false;
import {scale_maj} from "./Keyboard_JS.js";
var change_scale=0;
var array_app=[];
var ciao=true;
$(document).ready(function() {$('#tonalità').prop('disabled', true);
});

export function findKey(c,vec1,vec2){
  for (var i=0; i<circle.length; i++){
    if(circle[i].includes(c))
    vec1[i]++;
  }
  var vec_max = Math.max.apply(Math,vec1);
  console.log("vec_max ",vec_max);
  if(vec2.length==4){

    var indexes = [], j = -1;
    var key_found = [];

    while ((j = vec1.indexOf(vec_max, j+1)) != -1){ //va a cercare nel vettore counter tutte le occorrenze dei valori massimi
        indexes.push(j);
    }

    //console.log("indici",indexes);
    for(var k=0; k<indexes.length; k++){
      var index= indexes[k];
      key_found.push(key_[index]);    //ci potrebbero essere molteplici tonalità
}

find_degrees(stato,indexes);
$('#tonalità').prop('disabled', true);

if(indexes.length>1){
  flag=true;
  //alert("Trovata più di una tonalità! Premere sul tasto per visualizzare i diversi percorsi");
  count= degree.length/indexes.length;
  split_array();

  return key_found;

}
show_progression(degree,degree[0]);
return key_found;
}

}


function find_degrees(state, indexes){
 for (var i=0; i<indexes.length; i++){
   for(var j=0; j<state.xy.length; j++){
     if(indexes[i]==state.xy[j][1]){
       degree.push(state.xy[j][0]);
     }
   }
 }
 console.log("modi",degree);
}


function split_array(){

if(end<degree.length){
  $('#tonalità').prop('disabled', true);
  end=end+count;
  var shallow= degree.slice(i,end);
  i=i+count;
  show_progression(shallow,shallow[0]);
}
else{
  i=0;
  end=0;
}

}


$(document).ready(function() {

  $("#tonalità").click(function () {

    for(var i=0; i<scale_maj[change_scale].length;i++){
            array_app=scale_maj[change_scale][i];
           $("#"+array_app).css("visibility", "hidden");
           array_app=[];
      }

      if(change_scale===scale_maj.length-1){

        change_scale=0;
        array_app=[];
        change_progression();
        split_array();
}else{
  change_scale++;
  array_app=[];

}
    //    if(ciao===true){
      for(var i=0; i<scale_maj[change_scale].length;i++){
          array_app=scale_maj[change_scale][i];
             $("#"+array_app).css("visibility", "visible");
             array_app=[];
        }
//}

  change_progression();
  split_array();

});

});


export function cancel_degrees(){
  cancel_stato();
  degree=[];
  for(var i=0; i<scale_maj[change_scale].length;i++){
          array_app=scale_maj[change_scale][i];
         $("#"+array_app).css("visibility", "hidden");

    }
    array_app=[];


}

function minor_relative(key_arr){

  for(var i=0; i<key_arr.length; i++){

  }
}
