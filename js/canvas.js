
//Creo Canvas
export var canvas=document.querySelector("#canvas");
export var ctx = canvas.getContext("2d");
import {chords_vec} from "./Keyboard_JS.js"
var coord_arr=[];
//creo una sfumatura lineare lungo y di 7 colori
export var my_gradient = ctx.createLinearGradient(0,0,0,canvas.height);
my_gradient.addColorStop(1/7,"#E53935");
my_gradient.addColorStop(2/7,"#FFA726");
my_gradient.addColorStop(3/7,"#FFEB3B");
my_gradient.addColorStop(4/7,"#7CB342");
my_gradient.addColorStop(5/7,"#00796B");
my_gradient.addColorStop(6/7,"#0277BD");
my_gradient.addColorStop(7/7,"#0D47A1");
var matrix;

function createMatrix(){
  var stepx = canvas.width/12;
  var stepy = canvas.height/7;
  matrix = [[[0,0,"Fmaj7"],[stepx,0,"Cmaj7"],[stepx*2,0, "Gmaj7"],[stepx*3,0, "Dmaj7"],[stepx*4,0, "Amaj7"],[stepx*5,0, "Emaj7"],[stepx*6,0, "Bmaj7"],[stepx*7,0, "F#maj7"],[stepx*8,0, "C#maj7"],[stepx*9,0, "G#maj7"],[stepx*10,0, "D#maj7"],[stepx*11,0, "A#maj7"]],
                [[0, stepy,"Cmaj7"],[stepx,stepy, "Gmaj7"],[stepx*2,stepy, "Dmaj7"],[stepx*3,stepy, "Amaj7"],[stepx*4,stepy, "Emaj7"],[stepx*5,stepy, "Bmaj7"],[stepx*6,stepy, "F#maj7"],[stepx*7,stepy, "C#maj7"],[stepx*8,stepy, "G#maj7"],[stepx*9,stepy, "D#maj7"],[stepx*10,stepy, "A#maj7"],[stepx*11,stepy, "Fmaj7"]],
                [[0, stepy*2,"G7"],[stepx,stepy*2, "D7"],[stepx*2,stepy*2, "A7"],[stepx*3,stepy*2, "E7"],[stepx*4,stepy*2, "B7"],[stepx*5,stepy*2, "F#7"],[stepx*6,stepy*2, "C#7"],[stepx*7,stepy*2, "Ab7"],[stepx*8,stepy*2, "Eb7"],[stepx*9,stepy*2, "A#7"],[stepx*10,stepy*2, "F7"],[stepx*11,stepy*2, "C7"]],
                [[0, stepy*3, "Dm7"],[stepx,stepy*3, "Am7"],[stepx*2,stepy*3, "Em7"],[stepx*3,stepy*3, "Bm7"],[stepx*4,stepy*3, "F#m7"],[stepx*5,stepy*3, "C#m7"],[stepx*6,stepy*3, "G#m7"],[stepx*7,stepy*3, "D#m7"],[stepx*8,stepy*3, "A#m7"],[stepx*9,stepy*3, "Fm7"],[stepx*10,stepy*3, "Cm7"],[stepx*11,stepy*3, "Gm7"]],
                [[0, stepy*4, "Am7"],[stepx,stepy*4, "Em7"],[stepx*2,stepy*4, "Bm7"],[stepx*3,stepy*4, "F#m7"],[stepx*4,stepy*4, "C#m7"],[stepx*5,stepy*4, "G#m7"],[stepx*6,stepy*4, "D#m7"],[stepx*7,stepy*4, "A#m7"],[stepx*8,stepy*4, "Fm7"],[stepx*9,stepy*4, "Cm7"],[stepx*10,stepy*4, "Gm7"],[stepx*11,stepy*4, "Dm7"]],
                [[0, stepy*5, "Em7"],[stepx,stepy*5, "Bm7"],[stepx*2,stepy*5, "F#m7"],[stepx*3,stepy*5, "C#m7"],[stepx*4,stepy*5, "G#m7"],[stepx*5,stepy*5, "D#m7"],[stepx*6,stepy*5, "A#m7"],[stepx*7,stepy*5, "Fm7"],[stepx*8,stepy*5, "Cm7"],[stepx*9,stepy*5, "Gm7"],[stepx*10,stepy*5, "Dm7"],[stepx*11,stepy*5, "Am7"]],
                [[0, stepy*6, "Bsemi"],[stepx,stepy*6, "F#semi"],[stepx*2,stepy*6, "C#semi"],[stepx*3,stepy*6, "G#semi"],[stepx*4,stepy*6, "D#semi"],[stepx*5,stepy*6, "A#semi"],[stepx*6,stepy*6, "Fsemi"],[stepx*7,stepy*6, "Csemi"],[stepx*8,stepy*6, "Gsemi"],[stepx*9,stepy*6, "Dsemi"],[stepx*10,stepy*6, "Asemi"],[stepx*11,stepy*6, "Esemi"]]]

  }

  createMatrix();
  //creo e muovo il rect

export var stato= {
    xy:[],
    alpha:[]
  };

export function blink(arr, chords_vec){
  for(var i=0; i<arr.length; i++){
    var x_canv = arr[i][1];
    var y_canv =arr[i][0];
    var alpha= arr[i][2];

    if(x_canv!=stato.xy[i] && y_canv!=stato.xy[i] && alpha!=stato.alpha[i]){
      stato.xy.push([x_canv,y_canv]);
      stato.alpha.push(alpha);
    }

    ctx.fillStyle=my_gradient;
    ctx.fillRect(matrix[x_canv][y_canv][0],matrix[x_canv][y_canv][1],50,30);

    ctx.fillStyle="black";
    ctx.font = "20px VT323"
    ctx.fillText(matrix[x_canv][y_canv][2], matrix[x_canv][y_canv][0]+5,matrix[x_canv][y_canv][1]+18);
    //console.log("CHORDS_VEC",matrix[0][0][2]);

    }

//console.log("stato", stato.xy);
}

export function cancel_stato(){
  stato.xy= [];
  stato.alpha=[]
//  console.log(stato.xy);
}
