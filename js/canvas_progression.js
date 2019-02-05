import {degree,cancel_degrees,flag,check_key} from "./circleFifth.js";

export var canvas=document.querySelector("#canvas2");
export var ctx = canvas.getContext("2d");

var stepx = canvas.width/2;
var stepy = canvas.height/7;
//1-3-5-7-9-11-13
export var y0=0;
var x0 = stepx;
export var xf,yf;
var t=0;
var angle= Math.PI/3;
var g= 9.8;
export var difference= [];
export var velocity=[];
export var invert_sign= [];
export var k=0;
var radius=10;

var ciao=true;
/*ctx.beginPath();
ctx.rect(stepx-70/2, 0, 70, stepy);
ctx.fillStyle = "#E53935";
ctx.fill();

ctx.beginPath();
ctx.rect(stepx-70/2, stepy,70, stepy);
ctx.fillStyle = "#FFA726";
ctx.fill();

ctx.beginPath();
ctx.rect(stepx-70/2, stepy*2,70, stepy);
ctx.fillStyle = "#FFEB3B";
ctx.fill();

ctx.beginPath();
ctx.rect(stepx-70/2, stepy*3,70, stepy);
ctx.fillStyle = "#7CB342";
ctx.fill();

ctx.beginPath();
ctx.rect(stepx-70/2, stepy*4,70, stepy);
ctx.fillStyle = "#00796B";
ctx.fill();

ctx.beginPath();
ctx.rect(stepx-70/2, stepy*5,70, stepy);
ctx.fillStyle = "#0277BD";
ctx.fill();

ctx.beginPath();
ctx.rect(stepx-70/2, stepy*6,70, stepy);
ctx.fillStyle = "#0D47A1";
ctx.fill();
*/        //OLD VERSION

/*function drawBorder(xPos, yPos, width, height, thickness)
{
   ctx.beginPath();

  ctx.fillStyle='#FF4500';
  ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
}*/   //FUNZIONE TROVATA SU STACKOVERFLOW CHE DISEGNAVA DEI BORDI PER I RECT CHE FORMAVANO LA LINEA

function show_square(Ypos){
 if(Ypos>=0 && Ypos<stepy) {
   ctx.globalAlpha = 0.6;
   ctx.beginPath();
   ctx.rect(stepx-70/2, 0, 70, stepy);
   ctx.fillStyle = "#E53935";
   ctx.fill();
   ctx.font = "20px Arial";
   ctx.fillText("IV - Lydian", 10, stepy/2);
}
 if(Ypos>=stepy && Ypos<stepy*2) {
   ctx.globalAlpha = 0.6;
   ctx.beginPath();
   ctx.rect(stepx-70/2, stepy,70, stepy);
   ctx.fillStyle = "#FFA726";
   ctx.fill();
   ctx.font = "20px Arial";
   ctx.fillText("I - Ionian", 10, 3*stepy/2);
                                 }
 if(Ypos>=stepy*2 && Ypos<stepy*3) {
   ctx.globalAlpha = 0.6;
   ctx.beginPath();
   ctx.rect(stepx-70/2, stepy*2,70, stepy);
   ctx.fillStyle = "#FFEB3B";
   ctx.fill();
   ctx.font = "16px Arial";
   ctx.fillText("V - Misolydian", 10, 5*stepy/2);
 }
 if(Ypos>=stepy*3 && Ypos<stepy*4) {
   ctx.globalAlpha = 0.6;
   ctx.beginPath();
   ctx.rect(stepx-70/2, stepy*3,70, stepy);
   ctx.fillStyle = "#7CB342";
   ctx.fill();
   ctx.font = "20px Arial";
   ctx.fillText("II - Doric", 10, 7*stepy/2);
 }
 if(Ypos>=stepy*4 && Ypos<stepy*5) {
   ctx.globalAlpha = 0.6;
   ctx.beginPath();
   ctx.rect(stepx-70/2, stepy*4,70, stepy);
   ctx.fillStyle = "#00796B";
   ctx.fill();
   ctx.font = "20px Arial";
   ctx.fillText("VI - Aeolian", 10, 9*stepy/2);
}
 if(Ypos>=stepy*5 && Ypos<stepy*6) {
   ctx.globalAlpha = 0.6;
   ctx.beginPath();
   ctx.rect(stepx-70/2, stepy*5,70, stepy);
   ctx.fillStyle = "#0277BD";
   ctx.fill();
   ctx.font = "18px Arial";
   ctx.fillText("III - Phrygian", 10, 11*stepy/2);
 }
 if(Ypos>=stepy*6 && Ypos<canvas.height) {
   ctx.globalAlpha = 0.6;
   ctx.beginPath();
   ctx.rect(stepx-70/2, stepy*6,70, stepy);
   ctx.fillStyle = "#0D47A1";
   ctx.fill();
   ctx.font = "18px Arial";
   ctx.fillText("VII - Locrian", 10, 13*stepy/2);
 }
} //FUNZIONE CHE COMANDA L'APPARIZIONE DI UN QUADRATO IN BASE ALLA POSIZIONE RAGGIUNTA DALLA LINEA

function choose_color(Ypos){
 var color;
 if(Ypos>=0 && Ypos<stepy) color='#E53935';
 if(Ypos>=stepy && Ypos<stepy*2) color='#FFA726';
 if(Ypos>=stepy*2 && Ypos<stepy*3) color='#FFEB3B';
 if(Ypos>=stepy*3 && Ypos<stepy*4) color='#7CB342';
 if(Ypos>=stepy*4 && Ypos<stepy*5) color='#00796B';
 if(Ypos>=stepy*5 && Ypos<stepy*6) color='#0277BD';
 if(Ypos>=stepy*6 && Ypos<canvas.height) color='#0D47A1';
return color;
} //FUNZIONE CHE COMANDA IL CAMBIO DI COLORE DELLA LINEA IN BASE ALLA SUA POSIZIONE

function choose_position(value){
    switch(value){
        case 0:
        y0=stepy/2;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
        ctx.lineWidth=5;
        ctx.strokeStyle='magenta';
        ctx.stroke();
        ctx.rect(stepx-70/2, 0, 70, stepy);
        ctx.fillStyle = "#E53935";
        ctx.fill();
        ctx.font = "20px Arial";
        ctx.fillText("IV - Lydian", 10, stepy/2);
        break;

        case 1:
        y0=3*stepy/2;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
        ctx.lineWidth=5;
        ctx.strokeStyle='magenta';
        ctx.stroke();
        ctx.rect(stepx-70/2, stepy, 70, stepy);
        ctx.fillStyle = "#FFA726";
        ctx.fill();
        ctx.font = "20px Arial";
        ctx.fillText("I - Ionian", 10, 3*stepy/2);
        break;

        case 2:
        y0=5*stepy/2;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
        ctx.lineWidth=5;
        ctx.strokeStyle='magenta';
        ctx.stroke();
        ctx.rect(stepx-70/2, stepy*2, 70, stepy);
        ctx.fillStyle = "#FFEB3B";
        ctx.fill();
        ctx.font = "16px Arial";
        ctx.fillText("V - Misolydian", 10, 5*stepy/2);
        break;

        case 3:
        y0=7*stepy/2;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
        ctx.lineWidth=5;
        ctx.strokeStyle='magenta';
        ctx.stroke();
        ctx.rect(stepx-70/2, stepy*3, 70, stepy);
        ctx.fillStyle = "#7CB342";
        ctx.fill();
        ctx.font = "20px Arial";
        ctx.fillText("II - Doric", 10, 7*stepy/2);
        break;

        case 4:
        y0=9*stepy/2;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
        ctx.lineWidth=5;
        ctx.strokeStyle='magenta';
        ctx.stroke();
        ctx.rect(stepx-70/2, stepy*4, 70, stepy);
        ctx.fillStyle = "#00796B";
        ctx.fill();
        ctx.font = "20px Arial";
        ctx.fillText("VI - Aeolian", 10, 9*stepy/2);
    //    console.log('dovrei aver disegnato il quadrato a ', stepx,stepy, y0);
        break;

        case 5:
        y0=11*stepy/2;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
        ctx.lineWidth=5;
        ctx.strokeStyle='magenta';
        ctx.stroke();
        ctx.rect(stepx-70/2, stepy*5, 70, stepy);
        ctx.fillStyle = "#0277BD";
        ctx.fill();
        ctx.font = "18px Arial";
        ctx.fillText("III - Phrygian", 10, 11*stepy/2);
        break;

		    case 6:
        y0=13*stepy/2;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
        ctx.lineWidth=5;
        ctx.strokeStyle='magenta';
        ctx.stroke();
        ctx.rect(stepx-70/2, stepy*6, 70, stepy);
        ctx.fillStyle = "#0D47A1";
        ctx.fill();
        ctx.font = "18px Arial";
        ctx.fillText("VII - Locrian", 10, 13*stepy/2);
        break;

		}
} //QUESTA FUNZIONE NON SOLO DECIDE IL PUNTO INIZIALE DA CUI FAR PARTIRE LA LINEA, MA DECIDE ANCHE QUALE QUADRATO FARE APPARIRE PER PRIMO

function choose_velocity(degree){
for(var i=0;i<degree.length-1;i++){

 difference.push(Math.abs(degree[i+1]-degree[i]));
 if(degree[i+1]-degree[i]>=0){
  invert_sign[i]=false;
 }
 else{
  invert_sign[i]=true;
 }
// console.log(difference)

}
for(var j=0; j<difference.length; j++){
  if(difference[j]===0){velocity[j]=0;}
 if(difference[j]===1){velocity[j]=25;}
 if(difference[j]===2){velocity[j]=36;}
 if(difference[j]===3){velocity[j]=44;}
 if(difference[j]===4){velocity[j]=51;}
 if(difference[j]===5){velocity[j]=57;}
 if(difference[j]===6){velocity[j]=62;}

 }

} //FUNZIONE CHE GESTISCE IL CAMBIO DI VELOCITA' IN BASE AL MODO, INFATTI LE DISTANZE VENGONO RAGGIUNTE IN BASE ALLE VELOCITA' INIZIALI CHE SONO STATE MAPPATE IN BASE ALLE DIMENSIONI DEL CANVAS

function render_prog(time,value,sign){ //FUNZIONE CHE REGOLA IL MOTO PARABOLICO DELLE LINEE

 if(sign==true){  //DAL BASSO VERSO L'ALTO
  yf= y0 - velocity[k]*Math.cos(angle)*time;
  xf= ((-1/2)*g*(Math.pow(time, 2))) + (velocity[k]*Math.sin(angle)*time) +x0;
}
 else{  //DALL'ALTO VERSO IL BASSO
  yf= y0 + velocity[k]*Math.cos(angle)*time;
  xf= ((-1/2)*g*(Math.pow(time, 2))) + (velocity[k]*Math.sin(angle)*time) +x0;
 }

 //drawBorder(xf, yf, 1, 1,1);
ctx.beginPath();                    //VENGONO DISEGNATI TANTI QUADRATI PICCOLI PER FORMARE LA LINEA
ctx.rect(xf,yf,3,3);
ctx.fillStyle= choose_color(y0);
ctx.fill();

ctx.lineWidth = 0.2;              //DISEGNA I BORDI DEI QUADRATINI(RENDE LE LINEE PIù LUMINOSE)
ctx.strokeStyle= 'white';
ctx.stroke();

var tg=(2*velocity[k]*Math.sin(angle))/g;  //TEMPO CHE OGNI LINEA IMPIEGA PER RAGGIUNGERE IL PUNTO D'ARRIVO
//console.log("cappa",k);
 if(time>tg){                             //CONTROLLO CHE FERMA LA LINEA AL PUNTO FINALE E AGGIORNA IL NUOVO PUNTO INIZIALE CON QUELLO FINALE PRECEDENTE
    k=k+1;
    clearInterval(value);
    t=0;
    y0=yf;
    ctx.fillStyle= choose_color(y0);
    show_square(y0);
  if(k<invert_sign.length){             //CONTROLLO CHE PER FORTUNA PUO' ESSERE USATO PER DIRE CHE DEVE ESSERE INIZIALE UN NUOVO PERCORSO
    var clear = setInterval(function(){
  render_prog(t+=0.03, clear,invert_sign[k]);
},0.2);
  }
   else{
     if(flag===true){
     $('#tonalità').prop('disabled', false);
   }      //SI ESCE DALLA FUNZIONE E QUINDI IL PERCORSO E' FINITO.
    return;
   }
  }
}


export function show_progression(degree_arr,value){       //FUNZIONE CHE FA COMINCIARE IL TUTTO

  ctx.clearRect(0,0,canvas.width,canvas.height);
  choose_position(value);             //VIENE SETTATA LA POSIZIONE INIZIALE
  choose_velocity(degree_arr);                //VENGONO SETTATE LE VELOCITA'
  var clear= setInterval(function(){              //TRIGGER INIZIALE DELLA FUNZIONE RENDER
    render_prog(t+=0.03, clear,invert_sign[k]);
  },0.2);

}

export function reset_canvas2(){              //FUNZIONE CHE RESETTA IL TUTTO PER RINIZIARE TUTTO DA CAPO

  difference=[];
  velocity=[];
  invert_sign=[];
  k=0;
  y0=0;
  xf=0;
  yf=0;
  $('#tonalità').prop('disabled', true);

  cancel_degrees();                         //FUNZIONE IMPORTATA PERCHE' NON POSSONO ESSERE SVUOTATI VETTORI IMPORTATI DA ALTRI MODULI, QUINDI QUESTO VIENE FATTO NEL MODULO DI APPARTENENZA (VEDERE GLI IMPORT/EXPORT)
}

export function change_progression(){

  difference=[];
  velocity=[];
  invert_sign=[];
  k=0;
  y0=0;
  xf=0;
  yf=0;
}
