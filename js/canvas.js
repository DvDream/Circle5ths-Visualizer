
//Creo Canvas
export var canvas=document.querySelector("#canvas");
export var ctx = canvas.getContext("2d")

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
  matrix = [[[0,0],[stepx,0],[stepx*2,0],[stepx*3,0],[stepx*4,0],[stepx*5,0],[stepx*6,0],[stepx*7,0],[stepx*8,0],[stepx*9,0],[stepx*10,0],[stepx*11,0]],
                [[0, stepy],[stepx,stepy],[stepx*2,stepy],[stepx*3,stepy],[stepx*4,stepy],[stepx*5,stepy],[stepx*6,stepy],[stepx*7,stepy],[stepx*8,stepy],[stepx*9,stepy],[stepx*10,stepy],[stepx*11,stepy]],
                [[0, stepy*2],[stepx,stepy*2],[stepx*2,stepy*2],[stepx*3,stepy*2],[stepx*4,stepy*2],[stepx*5,stepy*2],[stepx*6,stepy*2],[stepx*7,stepy*2],[stepx*8,stepy*2],[stepx*9,stepy*2],[stepx*10,stepy*2],[stepx*11,stepy*2]],
                [[0, stepy*3],[stepx,stepy*3],[stepx*2,stepy*3],[stepx*3,stepy*3],[stepx*4,stepy*3],[stepx*5,stepy*3],[stepx*6,stepy*3],[stepx*7,stepy*3],[stepx*8,stepy*3],[stepx*9,stepy*3],[stepx*10,stepy*3],[stepx*11,stepy*3]],
                [[0, stepy*4],[stepx,stepy*4],[stepx*2,stepy*4],[stepx*3,stepy*4],[stepx*4,stepy*4],[stepx*5,stepy*4],[stepx*6,stepy*4],[stepx*7,stepy*4],[stepx*8,stepy*4],[stepx*9,stepy*4],[stepx*10,stepy*4],[stepx*11,stepy*4]],
                [[0, stepy*5],[stepx,stepy*5],[stepx*2,stepy*5],[stepx*3,stepy*5],[stepx*4,stepy*5],[stepx*5,stepy*5],[stepx*6,stepy*5],[stepx*7,stepy*5],[stepx*8,stepy*5],[stepx*9,stepy*5],[stepx*10,stepy*5],[stepx*11,stepy*5]],
                [[0, stepy*6],[stepx,stepy*6],[stepx*2,stepy*6],[stepx*3,stepy*6],[stepx*4,stepy*6],[stepx*5,stepy*6],[stepx*6,stepy*6],[stepx*7,stepy*6],[stepx*8,stepy*6],[stepx*9,stepy*6],[stepx*10,stepy*6],[stepx*11,stepy*6]]]

  }

  createMatrix();
  //creo e muovo il rect

export var stato= {
    xy:[],
    alpha:[]
  };

export function blink(arr){
  for(var i=0; i<arr.length; i++){
    var x_canv = arr[i][1];
    var y_canv =arr[i][0];
    var alpha= arr[i][2];

    if(x_canv!=stato.xy[i] && y_canv!=stato.xy[i] && alpha!=stato.alpha[i]){
      stato.xy.push([x_canv,y_canv]);
      stato.alpha.push(alpha);
    }
  //ctx.clearRect(0,0,canvas.width,canvas.height);
  //ctx.fillRect(x, y, 100, 50);
    ctx.fillStyle=my_gradient;
    ctx.fillRect(matrix[x_canv][y_canv][0],matrix[x_canv][y_canv][1],50,30);

  }
console.log("stato", stato.xy);
}

export function cancel_stato(){
  stato.xy= [];
  stato.alpha=[]
  console.log(stato.xy);
}
