// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blink = blink;
exports.cancel_stato = cancel_stato;
exports.stato = exports.my_gradient = exports.ctx = exports.canvas = void 0;
//Creo Canvas
var canvas = document.querySelector("#canvas");
exports.canvas = canvas;
var ctx = canvas.getContext("2d"); //creo una sfumatura lineare lungo y di 7 colori

exports.ctx = ctx;
var my_gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
exports.my_gradient = my_gradient;
my_gradient.addColorStop(1 / 7, "#E53935");
my_gradient.addColorStop(2 / 7, "#FFA726");
my_gradient.addColorStop(3 / 7, "#FFEB3B");
my_gradient.addColorStop(4 / 7, "#7CB342");
my_gradient.addColorStop(5 / 7, "#00796B");
my_gradient.addColorStop(6 / 7, "#0277BD");
my_gradient.addColorStop(7 / 7, "#0D47A1");
var matrix;

function createMatrix() {
  var stepx = canvas.width / 12;
  var stepy = canvas.height / 7;
  matrix = [[[0, 0], [stepx, 0], [stepx * 2, 0], [stepx * 3, 0], [stepx * 4, 0], [stepx * 5, 0], [stepx * 6, 0], [stepx * 7, 0], [stepx * 8, 0], [stepx * 9, 0], [stepx * 10, 0], [stepx * 11, 0]], [[0, stepy], [stepx, stepy], [stepx * 2, stepy], [stepx * 3, stepy], [stepx * 4, stepy], [stepx * 5, stepy], [stepx * 6, stepy], [stepx * 7, stepy], [stepx * 8, stepy], [stepx * 9, stepy], [stepx * 10, stepy], [stepx * 11, stepy]], [[0, stepy * 2], [stepx, stepy * 2], [stepx * 2, stepy * 2], [stepx * 3, stepy * 2], [stepx * 4, stepy * 2], [stepx * 5, stepy * 2], [stepx * 6, stepy * 2], [stepx * 7, stepy * 2], [stepx * 8, stepy * 2], [stepx * 9, stepy * 2], [stepx * 10, stepy * 2], [stepx * 11, stepy * 2]], [[0, stepy * 3], [stepx, stepy * 3], [stepx * 2, stepy * 3], [stepx * 3, stepy * 3], [stepx * 4, stepy * 3], [stepx * 5, stepy * 3], [stepx * 6, stepy * 3], [stepx * 7, stepy * 3], [stepx * 8, stepy * 3], [stepx * 9, stepy * 3], [stepx * 10, stepy * 3], [stepx * 11, stepy * 3]], [[0, stepy * 4], [stepx, stepy * 4], [stepx * 2, stepy * 4], [stepx * 3, stepy * 4], [stepx * 4, stepy * 4], [stepx * 5, stepy * 4], [stepx * 6, stepy * 4], [stepx * 7, stepy * 4], [stepx * 8, stepy * 4], [stepx * 9, stepy * 4], [stepx * 10, stepy * 4], [stepx * 11, stepy * 4]], [[0, stepy * 5], [stepx, stepy * 5], [stepx * 2, stepy * 5], [stepx * 3, stepy * 5], [stepx * 4, stepy * 5], [stepx * 5, stepy * 5], [stepx * 6, stepy * 5], [stepx * 7, stepy * 5], [stepx * 8, stepy * 5], [stepx * 9, stepy * 5], [stepx * 10, stepy * 5], [stepx * 11, stepy * 5]], [[0, stepy * 6], [stepx, stepy * 6], [stepx * 2, stepy * 6], [stepx * 3, stepy * 6], [stepx * 4, stepy * 6], [stepx * 5, stepy * 6], [stepx * 6, stepy * 6], [stepx * 7, stepy * 6], [stepx * 8, stepy * 6], [stepx * 9, stepy * 6], [stepx * 10, stepy * 6], [stepx * 11, stepy * 6]]];
}

createMatrix(); //creo e muovo il rect

var stato = {
  xy: [],
  alpha: []
};
exports.stato = stato;

function blink(arr) {
  for (var i = 0; i < arr.length; i++) {
    var x_canv = arr[i][1];
    var y_canv = arr[i][0];
    var alpha = arr[i][2];

    if (x_canv != stato.xy[i] && y_canv != stato.xy[i] && alpha != stato.alpha[i]) {
      stato.xy.push([x_canv, y_canv]);
      stato.alpha.push(alpha);
    } //ctx.clearRect(0,0,canvas.width,canvas.height);
    //ctx.fillRect(x, y, 100, 50);


    ctx.fillStyle = my_gradient;
    ctx.fillRect(matrix[x_canv][y_canv][0], matrix[x_canv][y_canv][1], 50, 30);
  }

  console.log("stato", stato.xy);
}

function cancel_stato() {
  stato.xy = [];
  stato.alpha = [];
  console.log(stato.xy);
}
},{}],"js/tonal/extensions/detect/node_modules/tonal-note/build/es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenize = tokenize;
exports.fromMidi = fromMidi;
exports.enharmonic = exports.simplify = exports.build = exports.from = exports.altToAcc = exports.stepToLetter = exports.oct = exports.chroma = exports.freqToMidi = exports.freq = exports.midiToFreq = exports.midi = exports.pc = exports.name = exports.props = exports.names = void 0;
var NAMES = "C C# Db D D# Eb E F F# Gb G G# Ab A A# Bb B".split(" ");

var names = function (accTypes) {
  return typeof accTypes !== "string" ? NAMES.slice() : NAMES.filter(function (n) {
    var acc = n[1] || " ";
    return accTypes.indexOf(acc) !== -1;
  });
};

exports.names = names;
var SHARPS = names(" #");
var FLATS = names(" b");
var REGEX = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;

function tokenize(str) {
  if (typeof str !== "string") str = "";
  var m = REGEX.exec(str);
  return [m[1].toUpperCase(), m[2].replace(/x/g, "##"), m[3], m[4]];
}

var NO_NOTE = Object.freeze({
  pc: null,
  name: null,
  step: null,
  alt: null,
  oct: null,
  octStr: null,
  chroma: null,
  midi: null,
  freq: null
});
var SEMI = [0, 2, 4, 5, 7, 9, 11];

var properties = function (str) {
  var tokens = tokenize(str);
  if (tokens[0] === "" || tokens[3] !== "") return NO_NOTE;
  var letter = tokens[0],
      acc = tokens[1],
      octStr = tokens[2];
  var p = {
    letter: letter,
    acc: acc,
    octStr: octStr,
    pc: letter + acc,
    name: letter + acc + octStr,
    step: (letter.charCodeAt(0) + 3) % 7,
    alt: acc[0] === "b" ? -acc.length : acc.length,
    oct: octStr.length ? +octStr : null,
    chroma: 0,
    midi: null,
    freq: null
  };
  p.chroma = (SEMI[p.step] + p.alt + 120) % 12;
  p.midi = p.oct !== null ? SEMI[p.step] + p.alt + 12 * (p.oct + 1) : null;
  p.freq = midiToFreq(p.midi);
  return Object.freeze(p);
};

var memo = function (fn, cache) {
  if (cache === void 0) {
    cache = {};
  }

  return function (str) {
    return cache[str] || (cache[str] = fn(str));
  };
};

var props = memo(properties);
exports.props = props;

var name = function (str) {
  return props(str).name;
};

exports.name = name;

var pc = function (str) {
  return props(str).pc;
};

exports.pc = pc;

var isMidiRange = function (m) {
  return m >= 0 && m <= 127;
};

var midi = function (note) {
  if (typeof note !== "number" && typeof note !== "string") {
    return null;
  }

  var midi = props(note).midi;
  var value = midi || midi === 0 ? midi : +note;
  return isMidiRange(value) ? value : null;
};

exports.midi = midi;

var midiToFreq = function (midi, tuning) {
  if (tuning === void 0) {
    tuning = 440;
  }

  return typeof midi === "number" ? Math.pow(2, (midi - 69) / 12) * tuning : null;
};

exports.midiToFreq = midiToFreq;

var freq = function (note) {
  return props(note).freq || midiToFreq(note);
};

exports.freq = freq;
var L2 = Math.log(2);
var L440 = Math.log(440);

var freqToMidi = function (freq) {
  var v = 12 * (Math.log(freq) - L440) / L2 + 69;
  return Math.round(v * 100) / 100;
};

exports.freqToMidi = freqToMidi;

var chroma = function (str) {
  return props(str).chroma;
};

exports.chroma = chroma;

var oct = function (str) {
  return props(str).oct;
};

exports.oct = oct;
var LETTERS = "CDEFGAB";

var stepToLetter = function (step) {
  return LETTERS[step];
};

exports.stepToLetter = stepToLetter;

var fillStr = function (s, n) {
  return Array(n + 1).join(s);
};

var numToStr = function (num, op) {
  return typeof num !== "number" ? "" : op(num);
};

var altToAcc = function (alt) {
  return numToStr(alt, function (alt) {
    return alt < 0 ? fillStr("b", -alt) : fillStr("#", alt);
  });
};

exports.altToAcc = altToAcc;

var from = function (fromProps, baseNote) {
  if (fromProps === void 0) {
    fromProps = {};
  }

  if (baseNote === void 0) {
    baseNote = null;
  }

  var _a = baseNote ? Object.assign({}, props(baseNote), fromProps) : fromProps,
      step = _a.step,
      alt = _a.alt,
      oct = _a.oct;

  if (typeof step !== "number") return null;
  var letter = stepToLetter(step);
  if (!letter) return null;
  var pc = letter + altToAcc(alt);
  return oct || oct === 0 ? pc + oct : pc;
};

exports.from = from;
var build = from;
exports.build = build;

function fromMidi(num, sharps) {
  if (sharps === void 0) {
    sharps = false;
  }

  num = Math.round(num);
  var pcs = sharps === true ? SHARPS : FLATS;
  var pc = pcs[num % 12];
  var o = Math.floor(num / 12) - 1;
  return pc + o;
}

var simplify = function (note, sameAcc) {
  if (sameAcc === void 0) {
    sameAcc = true;
  }

  var _a = props(note),
      alt = _a.alt,
      chroma = _a.chroma,
      midi = _a.midi;

  if (chroma === null) return null;
  var alteration = alt;
  var useSharps = sameAcc === false ? alteration < 0 : alteration > 0;
  return midi === null ? pc(fromMidi(chroma, useSharps)) : fromMidi(midi, useSharps);
};

exports.simplify = simplify;

var enharmonic = function (note) {
  return simplify(note, false);
};

exports.enharmonic = enharmonic;
},{}],"js/tonal/extensions/detect/node_modules/tonal-dictionary/build/data/scales.json":[function(require,module,exports) {
module.exports = {
  "chromatic": ["1P 2m 2M 3m 3M 4P 4A 5P 6m 6M 7m 7M"],
  "lydian": ["1P 2M 3M 4A 5P 6M 7M"],
  "major": ["1P 2M 3M 4P 5P 6M 7M", ["ionian"]],
  "mixolydian": ["1P 2M 3M 4P 5P 6M 7m", ["dominant"]],
  "dorian": ["1P 2M 3m 4P 5P 6M 7m"],
  "aeolian": ["1P 2M 3m 4P 5P 6m 7m", ["minor"]],
  "phrygian": ["1P 2m 3m 4P 5P 6m 7m"],
  "locrian": ["1P 2m 3m 4P 5d 6m 7m"],
  "melodic minor": ["1P 2M 3m 4P 5P 6M 7M"],
  "melodic minor second mode": ["1P 2m 3m 4P 5P 6M 7m"],
  "lydian augmented": ["1P 2M 3M 4A 5A 6M 7M"],
  "lydian dominant": ["1P 2M 3M 4A 5P 6M 7m", ["lydian b7"]],
  "melodic minor fifth mode": [
    "1P 2M 3M 4P 5P 6m 7m",
    ["hindu", "mixolydian b6M"]
  ],
  "locrian #2": ["1P 2M 3m 4P 5d 6m 7m", ["half-diminished"]],
  "altered": [
    "1P 2m 3m 3M 5d 6m 7m",
    ["super locrian", "diminished whole tone", "pomeroy"]
  ],
  "harmonic minor": ["1P 2M 3m 4P 5P 6m 7M"],
  "phrygian dominant": ["1P 2m 3M 4P 5P 6m 7m", ["spanish", "phrygian major"]],
  "half-whole diminished": ["1P 2m 3m 3M 4A 5P 6M 7m", ["dominant diminished"]],
  "diminished": ["1P 2M 3m 4P 5d 6m 6M 7M", ["whole-half diminished"]],
  "major pentatonic": ["1P 2M 3M 5P 6M", ["pentatonic"]],
  "lydian pentatonic": ["1P 3M 4A 5P 7M", ["chinese"]],
  "mixolydian pentatonic": ["1P 3M 4P 5P 7m", ["indian"]],
  "locrian pentatonic": [
    "1P 3m 4P 5d 7m",
    ["minor seven flat five pentatonic"]
  ],
  "minor pentatonic": ["1P 3m 4P 5P 7m"],
  "minor six pentatonic": ["1P 3m 4P 5P 6M"],
  "minor hexatonic": ["1P 2M 3m 4P 5P 7M"],
  "flat three pentatonic": ["1P 2M 3m 5P 6M", ["kumoi"]],
  "flat six pentatonic": ["1P 2M 3M 5P 6m"],
  "major flat two pentatonic": ["1P 2m 3M 5P 6M"],
  "whole tone pentatonic": ["1P 3M 5d 6m 7m"],
  "ionian pentatonic": ["1P 3M 4P 5P 7M"],
  "lydian #5P pentatonic": ["1P 3M 4A 5A 7M"],
  "lydian dominant pentatonic": ["1P 3M 4A 5P 7m"],
  "minor #7M pentatonic": ["1P 3m 4P 5P 7M"],
  "super locrian pentatonic": ["1P 3m 4d 5d 7m"],
  "in-sen": ["1P 2m 4P 5P 7m"],
  "iwato": ["1P 2m 4P 5d 7m"],
  "hirajoshi": ["1P 2M 3m 5P 6m"],
  "kumoijoshi": ["1P 2m 4P 5P 6m"],
  "pelog": ["1P 2m 3m 5P 6m"],
  "vietnamese 1": ["1P 3m 4P 5P 6m"],
  "vietnamese 2": ["1P 3m 4P 5P 7m"],
  "prometheus": ["1P 2M 3M 4A 6M 7m"],
  "prometheus neopolitan": ["1P 2m 3M 4A 6M 7m"],
  "ritusen": ["1P 2M 4P 5P 6M"],
  "scriabin": ["1P 2m 3M 5P 6M"],
  "piongio": ["1P 2M 4P 5P 6M 7m"],
  "major blues": ["1P 2M 3m 3M 5P 6M"],
  "minor blues": ["1P 3m 4P 5d 5P 7m", ["blues"]],
  "composite blues": ["1P 2M 3m 3M 4P 5d 5P 6M 7m"],
  "augmented": ["1P 2A 3M 5P 5A 7M"],
  "augmented heptatonic": ["1P 2A 3M 4P 5P 5A 7M"],
  "dorian #4": ["1P 2M 3m 4A 5P 6M 7m"],
  "lydian diminished": ["1P 2M 3m 4A 5P 6M 7M"],
  "whole tone": ["1P 2M 3M 4A 5A 7m"],
  "leading whole tone": ["1P 2M 3M 4A 5A 7m 7M"],
  "lydian minor": ["1P 2M 3M 4A 5P 6m 7m"],
  "locrian major": ["1P 2M 3M 4P 5d 6m 7m", ["arabian"]],
  "neopolitan": ["1P 2m 3m 4P 5P 6m 7M"],
  "neopolitan minor": ["1P 2m 3m 4P 5P 6m 7M"],
  "neopolitan major": ["1P 2m 3m 4P 5P 6M 7M", ["dorian b2"]],
  "neopolitan major pentatonic": ["1P 3M 4P 5d 7m"],
  "romanian minor": ["1P 2M 3m 5d 5P 6M 7m"],
  "double harmonic lydian": ["1P 2m 3M 4A 5P 6m 7M"],
  "harmonic major": ["1P 2M 3M 4P 5P 6m 7M"],
  "double harmonic major": ["1P 2m 3M 4P 5P 6m 7M", ["gypsy"]],
  "egyptian": ["1P 2M 4P 5P 7m"],
  "hungarian minor": ["1P 2M 3m 4A 5P 6m 7M"],
  "hungarian major": ["1P 2A 3M 4A 5P 6M 7m"],
  "oriental": ["1P 2m 3M 4P 5d 6M 7m"],
  "spanish heptatonic": ["1P 2m 3m 3M 4P 5P 6m 7m"],
  "flamenco": ["1P 2m 3m 3M 4A 5P 7m"],
  "balinese": ["1P 2m 3m 4P 5P 6m 7M"],
  "todi raga": ["1P 2m 3m 4A 5P 6m 7M"],
  "malkos raga": ["1P 3m 4P 6m 7m"],
  "kafi raga": ["1P 3m 3M 4P 5P 6M 7m 7M"],
  "purvi raga": ["1P 2m 3M 4P 4A 5P 6m 7M"],
  "persian": ["1P 2m 3M 4P 5d 6m 7M"],
  "bebop": ["1P 2M 3M 4P 5P 6M 7m 7M"],
  "bebop dominant": ["1P 2M 3M 4P 5P 6M 7m 7M"],
  "bebop minor": ["1P 2M 3m 3M 4P 5P 6M 7m"],
  "bebop major": ["1P 2M 3M 4P 5P 5A 6M 7M"],
  "bebop locrian": ["1P 2m 3m 4P 5d 5P 6m 7m"],
  "minor bebop": ["1P 2M 3m 4P 5P 6m 7m 7M"],
  "mystery #1": ["1P 2m 3M 5d 6m 7m"],
  "enigmatic": ["1P 2m 3M 5d 6m 7m 7M"],
  "minor six diminished": ["1P 2M 3m 4P 5P 6m 6M 7M"],
  "ionian augmented": ["1P 2M 3M 4P 5A 6M 7M"],
  "lydian #9": ["1P 2m 3M 4A 5P 6M 7M"],
  "ichikosucho": ["1P 2M 3M 4P 5d 5P 6M 7M"],
  "six tone symmetric": ["1P 2m 3M 4P 5A 6M"]
}
;
},{}],"js/tonal/extensions/detect/node_modules/tonal-dictionary/build/data/chords.json":[function(require,module,exports) {
module.exports = {
  "4": ["1P 4P 7m 10m", ["quartal"]],
  "64": ["5P 8P 10M"],
  "5": ["1P 5P"],
  "M": ["1P 3M 5P", ["Major", ""]],
  "M#5": ["1P 3M 5A", ["augmented", "maj#5", "Maj#5", "+", "aug"]],
  "M#5add9": ["1P 3M 5A 9M", ["+add9"]],
  "M13": ["1P 3M 5P 7M 9M 13M", ["maj13", "Maj13"]],
  "M13#11": [
    "1P 3M 5P 7M 9M 11A 13M",
    ["maj13#11", "Maj13#11", "M13+4", "M13#4"]
  ],
  "M6": ["1P 3M 5P 13M", ["6"]],
  "M6#11": ["1P 3M 5P 6M 11A", ["M6b5", "6#11", "6b5"]],
  "M69": ["1P 3M 5P 6M 9M", ["69"]],
  "M69#11": ["1P 3M 5P 6M 9M 11A"],
  "M7#11": ["1P 3M 5P 7M 11A", ["maj7#11", "Maj7#11", "M7+4", "M7#4"]],
  "M7#5": ["1P 3M 5A 7M", ["maj7#5", "Maj7#5", "maj9#5", "M7+"]],
  "M7#5sus4": ["1P 4P 5A 7M"],
  "M7#9#11": ["1P 3M 5P 7M 9A 11A"],
  "M7add13": ["1P 3M 5P 6M 7M 9M"],
  "M7b5": ["1P 3M 5d 7M"],
  "M7b6": ["1P 3M 6m 7M"],
  "M7b9": ["1P 3M 5P 7M 9m"],
  "M7sus4": ["1P 4P 5P 7M"],
  "M9": ["1P 3M 5P 7M 9M", ["maj9", "Maj9"]],
  "M9#11": ["1P 3M 5P 7M 9M 11A", ["maj9#11", "Maj9#11", "M9+4", "M9#4"]],
  "M9#5": ["1P 3M 5A 7M 9M", ["Maj9#5"]],
  "M9#5sus4": ["1P 4P 5A 7M 9M"],
  "M9b5": ["1P 3M 5d 7M 9M"],
  "M9sus4": ["1P 4P 5P 7M 9M"],
  "Madd9": ["1P 3M 5P 9M", ["2", "add9", "add2"]],
  "Maj7": ["1P 3M 5P 7M", ["maj7", "M7"]],
  "Mb5": ["1P 3M 5d"],
  "Mb6": ["1P 3M 13m"],
  "Msus2": ["1P 2M 5P", ["add9no3", "sus2"]],
  "Msus4": ["1P 4P 5P", ["sus", "sus4"]],
  "Maddb9": ["1P 3M 5P 9m"],
  "7": ["1P 3M 5P 7m", ["Dominant", "Dom"]],
  "9": ["1P 3M 5P 7m 9M", ["79"]],
  "11": ["1P 5P 7m 9M 11P"],
  "13": ["1P 3M 5P 7m 9M 13M", ["13_"]],
  "11b9": ["1P 5P 7m 9m 11P"],
  "13#11": ["1P 3M 5P 7m 9M 11A 13M", ["13+4", "13#4"]],
  "13#9": ["1P 3M 5P 7m 9A 13M", ["13#9_"]],
  "13#9#11": ["1P 3M 5P 7m 9A 11A 13M"],
  "13b5": ["1P 3M 5d 6M 7m 9M"],
  "13b9": ["1P 3M 5P 7m 9m 13M"],
  "13b9#11": ["1P 3M 5P 7m 9m 11A 13M"],
  "13no5": ["1P 3M 7m 9M 13M"],
  "13sus4": ["1P 4P 5P 7m 9M 13M", ["13sus"]],
  "69#11": ["1P 3M 5P 6M 9M 11A"],
  "7#11": ["1P 3M 5P 7m 11A", ["7+4", "7#4", "7#11_", "7#4_"]],
  "7#11b13": ["1P 3M 5P 7m 11A 13m", ["7b5b13"]],
  "7#5": ["1P 3M 5A 7m", ["+7", "7aug", "aug7"]],
  "7#5#9": ["1P 3M 5A 7m 9A", ["7alt", "7#5#9_", "7#9b13_"]],
  "7#5b9": ["1P 3M 5A 7m 9m"],
  "7#5b9#11": ["1P 3M 5A 7m 9m 11A"],
  "7#5sus4": ["1P 4P 5A 7m"],
  "7#9": ["1P 3M 5P 7m 9A", ["7#9_"]],
  "7#9#11": ["1P 3M 5P 7m 9A 11A", ["7b5#9"]],
  "7#9#11b13": ["1P 3M 5P 7m 9A 11A 13m"],
  "7#9b13": ["1P 3M 5P 7m 9A 13m"],
  "7add6": ["1P 3M 5P 7m 13M", ["67", "7add13"]],
  "7b13": ["1P 3M 7m 13m"],
  "7b5": ["1P 3M 5d 7m"],
  "7b6": ["1P 3M 5P 6m 7m"],
  "7b9": ["1P 3M 5P 7m 9m"],
  "7b9#11": ["1P 3M 5P 7m 9m 11A", ["7b5b9"]],
  "7b9#9": ["1P 3M 5P 7m 9m 9A"],
  "7b9b13": ["1P 3M 5P 7m 9m 13m"],
  "7b9b13#11": ["1P 3M 5P 7m 9m 11A 13m", ["7b9#11b13", "7b5b9b13"]],
  "7no5": ["1P 3M 7m"],
  "7sus4": ["1P 4P 5P 7m", ["7sus"]],
  "7sus4b9": [
    "1P 4P 5P 7m 9m",
    ["susb9", "7susb9", "7b9sus", "7b9sus4", "phryg"]
  ],
  "7sus4b9b13": ["1P 4P 5P 7m 9m 13m", ["7b9b13sus4"]],
  "9#11": ["1P 3M 5P 7m 9M 11A", ["9+4", "9#4", "9#11_", "9#4_"]],
  "9#11b13": ["1P 3M 5P 7m 9M 11A 13m", ["9b5b13"]],
  "9#5": ["1P 3M 5A 7m 9M", ["9+"]],
  "9#5#11": ["1P 3M 5A 7m 9M 11A"],
  "9b13": ["1P 3M 7m 9M 13m"],
  "9b5": ["1P 3M 5d 7m 9M"],
  "9no5": ["1P 3M 7m 9M"],
  "9sus4": ["1P 4P 5P 7m 9M", ["9sus"]],
  "m": ["1P 3m 5P"],
  "m#5": ["1P 3m 5A", ["m+", "mb6"]],
  "m11": ["1P 3m 5P 7m 9M 11P", ["_11"]],
  "m11A 5": ["1P 3m 6m 7m 9M 11P"],
  "m11b5": ["1P 3m 7m 12d 2M 4P", ["h11", "_11b5"]],
  "m13": ["1P 3m 5P 7m 9M 11P 13M", ["_13"]],
  "m6": ["1P 3m 4P 5P 13M", ["_6"]],
  "m69": ["1P 3m 5P 6M 9M", ["_69"]],
  "m7": ["1P 3m 5P 7m", ["minor7", "_", "_7"]],
  "m7#5": ["1P 3m 6m 7m"],
  "m7add11": ["1P 3m 5P 7m 11P", ["m7add4"]],
  "m7b5": ["1P 3m 5d 7m", ["half-diminished", "h7", "_7b5"]],
  "m9": ["1P 3m 5P 7m 9M", ["_9"]],
  "m9#5": ["1P 3m 6m 7m 9M"],
  "m9b5": ["1P 3m 7m 12d 2M", ["h9", "-9b5"]],
  "mMaj7": ["1P 3m 5P 7M", ["mM7", "_M7"]],
  "mMaj7b6": ["1P 3m 5P 6m 7M", ["mM7b6"]],
  "mM9": ["1P 3m 5P 7M 9M", ["mMaj9", "-M9"]],
  "mM9b6": ["1P 3m 5P 6m 7M 9M", ["mMaj9b6"]],
  "mb6M7": ["1P 3m 6m 7M"],
  "mb6b9": ["1P 3m 6m 9m"],
  "o": ["1P 3m 5d", ["mb5", "dim"]],
  "o7": ["1P 3m 5d 13M", ["diminished", "m6b5", "dim7"]],
  "o7M7": ["1P 3m 5d 6M 7M"],
  "oM7": ["1P 3m 5d 7M"],
  "sus24": ["1P 2M 4P 5P", ["sus4add9"]],
  "+add#9": ["1P 3M 5A 9A"],
  "madd4": ["1P 3m 4P 5P"],
  "madd9": ["1P 3m 5P 9M"]
}
;
},{}],"js/tonal/extensions/detect/node_modules/tonal-interval/build/es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.props = props;
exports.fromSemitones = exports.invert = exports.simplify = exports.build = exports.ic = exports.chroma = exports.semitones = exports.name = exports.num = exports.altToQ = exports.qToAlt = exports.tokenize = exports.names = void 0;
var IVL_TNL = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})";
var IVL_STR = "(AA|A|P|M|m|d|dd)([-+]?\\d+)";
var REGEX = new RegExp("^" + IVL_TNL + "|" + IVL_STR + "$");
var SIZES = [0, 2, 4, 5, 7, 9, 11];
var TYPES = "PMMPPMM";
var CLASSES = [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
var NAMES = "1P 2m 2M 3m 3M 4P 5P 6m 6M 7m 7M 8P".split(" ");

var names = function (types) {
  return typeof types !== "string" ? NAMES.slice() : NAMES.filter(function (n) {
    return types.indexOf(n[1]) !== -1;
  });
};

exports.names = names;

var tokenize = function (str) {
  var m = REGEX.exec("" + str);
  if (m === null) return null;
  return m[1] ? [m[1], m[2]] : [m[4], m[3]];
};

exports.tokenize = tokenize;
var NO_IVL = Object.freeze({
  name: null,
  num: null,
  q: null,
  step: null,
  alt: null,
  dir: null,
  type: null,
  simple: null,
  semitones: null,
  chroma: null,
  oct: null
});

var fillStr = function (s, n) {
  return Array(Math.abs(n) + 1).join(s);
};

var qToAlt = function (type, q) {
  if (q === "M" && type === "M") return 0;
  if (q === "P" && type === "P") return 0;
  if (q === "m" && type === "M") return -1;
  if (/^A+$/.test(q)) return q.length;
  if (/^d+$/.test(q)) return type === "P" ? -q.length : -q.length - 1;
  return null;
};

exports.qToAlt = qToAlt;

var altToQ = function (type, alt) {
  if (alt === 0) return type === "M" ? "M" : "P";else if (alt === -1 && type === "M") return "m";else if (alt > 0) return fillStr("A", alt);else if (alt < 0) return fillStr("d", type === "P" ? alt : alt + 1);else return null;
};

exports.altToQ = altToQ;

var numToStep = function (num) {
  return (Math.abs(num) - 1) % 7;
};

var properties = function (str) {
  var t = tokenize(str);
  if (t === null) return NO_IVL;
  var p = {
    num: 0,
    q: "d",
    name: "",
    type: "M",
    step: 0,
    dir: -1,
    simple: 1,
    alt: 0,
    oct: 0,
    semitones: 0,
    chroma: 0,
    ic: 0
  };
  p.num = +t[0];
  p.q = t[1];
  p.step = numToStep(p.num);
  p.type = TYPES[p.step];
  if (p.type === "M" && p.q === "P") return NO_IVL;
  p.name = "" + p.num + p.q;
  p.dir = p.num < 0 ? -1 : 1;
  p.simple = p.num === 8 || p.num === -8 ? p.num : p.dir * (p.step + 1);
  p.alt = qToAlt(p.type, p.q);
  p.oct = Math.floor((Math.abs(p.num) - 1) / 7);
  p.semitones = p.dir * (SIZES[p.step] + p.alt + 12 * p.oct);
  p.chroma = (p.dir * (SIZES[p.step] + p.alt) % 12 + 12) % 12;
  return Object.freeze(p);
};

var cache = {};

function props(str) {
  if (typeof str !== "string") return NO_IVL;
  return cache[str] || (cache[str] = properties(str));
}

var num = function (str) {
  return props(str).num;
};

exports.num = num;

var name = function (str) {
  return props(str).name;
};

exports.name = name;

var semitones = function (str) {
  return props(str).semitones;
};

exports.semitones = semitones;

var chroma = function (str) {
  return props(str).chroma;
};

exports.chroma = chroma;

var ic = function (ivl) {
  if (typeof ivl === "string") ivl = props(ivl).chroma;
  return typeof ivl === "number" ? CLASSES[ivl % 12] : null;
};

exports.ic = ic;

var build = function (_a) {
  var _b = _a === void 0 ? {} : _a,
      num = _b.num,
      step = _b.step,
      alt = _b.alt,
      _c = _b.oct,
      oct = _c === void 0 ? 1 : _c,
      dir = _b.dir;

  if (step !== undefined) num = step + 1 + 7 * oct;
  if (num === undefined) return null;
  if (typeof alt !== "number") return null;
  var d = typeof dir !== "number" ? "" : dir < 0 ? "-" : "";
  var type = TYPES[numToStep(num)];
  return d + num + altToQ(type, alt);
};

exports.build = build;

var simplify = function (str) {
  var p = props(str);
  if (p === NO_IVL) return null;
  var intervalProps = p;
  return intervalProps.simple + intervalProps.q;
};

exports.simplify = simplify;

var invert = function (str) {
  var p = props(str);
  if (p === NO_IVL) return null;
  var intervalProps = p;
  var step = (7 - intervalProps.step) % 7;
  var alt = intervalProps.type === "P" ? -intervalProps.alt : -(intervalProps.alt + 1);
  return build({
    step: step,
    alt: alt,
    oct: intervalProps.oct,
    dir: intervalProps.dir
  });
};

exports.invert = invert;
var IN = [1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7];
var IQ = "P m M m M P d P m M m M".split(" ");

var fromSemitones = function (num) {
  var d = num < 0 ? -1 : 1;
  var n = Math.abs(num);
  var c = n % 12;
  var o = Math.floor(n / 12);
  return d * (IN[c] + 7 * o) + IQ[c];
};

exports.fromSemitones = fromSemitones;
},{}],"js/tonal/extensions/detect/node_modules/tonal-dictionary/node_modules/tonal-array/build/es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;
exports.rotate = rotate;
exports.sort = sort;
exports.unique = unique;
exports.permutations = exports.shuffle = exports.compact = void 0;

var _tonalNote = require("tonal-note");

/**
 * [![npm version](https://img.shields.io/npm/v/tonal-array.svg?style=flat-square)](https://www.npmjs.com/package/tonal-array)
 *
 * Tonal array utilities. Create ranges, sort notes, ...
 *
 * @example
 * import * as Array;
 * Array.sort(["f", "a", "c"]) // => ["C", "F", "A"]
 *
 * @example
 * const Array = require("tonal-array")
 * Array.range(1, 4) // => [1, 2, 3, 4]
 *
 * @module Array
 */
// ascending range
function ascR(b, n) {
  for (var a = []; n--; a[n] = n + b) {
    ;
  }

  return a;
} // descending range


function descR(b, n) {
  for (var a = []; n--; a[n] = b - n) {
    ;
  }

  return a;
}
/**
 * Create a numeric range
 *
 * @param {Number} from
 * @param {Number} to
 * @return {Array}
 *
 * @example
 * Array.range(-2, 2) // => [-2, -1, 0, 1, 2]
 * Array.range(2, -2) // => [2, 1, 0, -1, -2]
 */


function range(a, b) {
  return a === null || b === null ? [] : a < b ? ascR(a, b - a + 1) : descR(a, a - b + 1);
}
/**
 *
 * Rotates a list a number of times. It"s completly agnostic about the
 * contents of the list.
 *
 * @param {Integer} times - the number of rotations
 * @param {Array} array
 * @return {Array} the rotated array
 * @example
 * Array.rotate(1, [1, 2, 3]) // => [2, 3, 1]
 */


function rotate(times, arr) {
  var len = arr.length;
  var n = (times % len + len) % len;
  return arr.slice(n, len).concat(arr.slice(0, n));
}
/**
 * Return a copy of the array with the null values removed
 * @function
 * @param {Array} array
 * @return {Array}
 *
 * @example
 * Array.compact(["a", "b", null, "c"]) // => ["a", "b", "c"]
 */


var compact = function (arr) {
  return arr.filter(function (n) {
    return n === 0 || n;
  });
}; // a function that get note heights (with negative number for pitch classes)


exports.compact = compact;

var height = function (name) {
  var m = (0, _tonalNote.props)(name).midi;
  return m !== null ? m : (0, _tonalNote.props)(name + "-100").midi;
};
/**
 * Sort an array of notes in ascending order
 *
 * @param {String|Array} notes
 * @return {Array} sorted array of notes
 */


function sort(src) {
  return compact(src.map(_tonalNote.name)).sort(function (a, b) {
    return height(a) > height(b);
  });
}
/**
 * Get sorted notes with duplicates removed
 *
 * @function
 * @param {Array} notes
 */


function unique(arr) {
  return sort(arr).filter(function (n, i, a) {
    return i === 0 || n !== a[i - 1];
  });
}
/**
 * Randomizes the order of the specified array in-place, using the Fisher–Yates shuffle.
 *
 * @private
 * @function
 * @param {Array|String} arr - the array
 * @return {Array} the shuffled array
 *
 * @example
 * Array.shuffle(["C", "D", "E", "F"])
 */


var shuffle = function (arr, rnd) {
  if (rnd === void 0) rnd = Math.random;
  var i, t;
  var m = arr.length;

  while (m) {
    i = rnd() * m-- | 0;
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
};
/**
 * Get all permutations of an array
 * http://stackoverflow.com/questions/9960908/permutations-in-javascript
 *
 * @param {Array} array - the array
 * @return {Array<Array>} an array with all the permutations
 */


exports.shuffle = shuffle;

var permutations = function (arr) {
  if (arr.length === 0) {
    return [[]];
  }

  return permutations(arr.slice(1)).reduce(function (acc, perm) {
    return acc.concat(arr.map(function (e, pos) {
      var newPerm = perm.slice();
      newPerm.splice(pos, 0, arr[0]);
      return newPerm;
    }));
  }, []);
};

exports.permutations = permutations;
},{"tonal-note":"js/tonal/extensions/detect/node_modules/tonal-note/build/es6.js"}],"js/tonal/extensions/detect/node_modules/tonal-dictionary/node_modules/tonal-pcset/build/es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chroma = chroma;
exports.chromas = chromas;
exports.modes = modes;
exports.isChroma = isChroma;
exports.intervals = intervals;
exports.isEqual = isEqual;
exports.isSubsetOf = isSubsetOf;
exports.isSupersetOf = isSupersetOf;
exports.includes = includes;
exports.filter = filter;

var _tonalNote = require("tonal-note");

var _tonalInterval = require("tonal-interval");

var _tonalArray = require("tonal-array");

/**
 * [![npm version](https://img.shields.io/npm/v/tonal-pcset.svg?style=flat-square)](https://www.npmjs.com/package/tonal-pcset)
 * [![tonal](https://img.shields.io/badge/tonal-pcset-yellow.svg?style=flat-square)](https://www.npmjs.com/browse/keyword/tonal)
 *
 * `tonal-pcset` is a collection of functions to work with pitch class sets, oriented
 * to make comparations (isEqual, isSubset, isSuperset)
 *
 * This is part of [tonal](https://www.npmjs.com/package/tonal) music theory library.
 *
 * You can install via npm: `npm i --save tonal-pcset`
 *
 * ```js
 * // es6
 * import PcSet from "tonal-pcset"
 * var PcSet = require("tonal-pcset")
 *
 * PcSet.isEqual("c2 d5 e6", "c6 e3 d1") // => true
 * ```
 *
 * ## API documentation
 *
 * @module PcSet
 */
var chr = function (str) {
  return (0, _tonalNote.chroma)(str) || (0, _tonalInterval.chroma)(str) || 0;
};

var pcsetNum = function (set) {
  return parseInt(chroma(set), 2);
};

var clen = function (chroma) {
  return chroma.replace(/0/g, "").length;
};
/**
 * Get chroma of a pitch class set. A chroma identifies each set uniquely.
 * It"s a 12-digit binary each presenting one semitone of the octave.
 *
 * Note that this function accepts a chroma as parameter and return it
 * without modification.
 *
 * @param {Array|String} set - the pitch class set
 * @return {String} a binary representation of the pitch class set
 * @example
 * PcSet.chroma(["C", "D", "E"]) // => "1010100000000"
 */


function chroma(set) {
  if (isChroma(set)) {
    return set;
  }

  if (!Array.isArray(set)) {
    return "";
  }

  var b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  set.map(chr).forEach(function (i) {
    b[i] = 1;
  });
  return b.join("");
}

var all = null;
/**
 * Get a list of all possible chromas (all possible scales)
 * More information: http://allthescales.org/
 * @return {Array} an array of possible chromas from '10000000000' to '11111111111'
 *
 */

function chromas(n) {
  all = all || (0, _tonalArray.range)(2048, 4095).map(function (n) {
    return n.toString(2);
  });
  return typeof n === "number" ? all.filter(function (chroma) {
    return clen(chroma) === n;
  }) : all.slice();
}
/**
 * Given a a list of notes or a pcset chroma, produce the rotations
 * of the chroma discarding the ones that starts with "0"
 *
 * This is used, for example, to get all the modes of a scale.
 *
 * @param {Array|String} set - the list of notes or pitchChr of the set
 * @param {Boolean} normalize - (Optional, true by default) remove all
 * the rotations that starts with "0"
 * @return {Array<String>} an array with all the modes of the chroma
 *
 * @example
 * PcSet.modes(["C", "D", "E"]).map(PcSet.intervals)
 */


function modes(set, normalize) {
  normalize = normalize !== false;
  var binary = chroma(set).split("");
  return (0, _tonalArray.compact)(binary.map(function (_, i) {
    var r = (0, _tonalArray.rotate)(i, binary);
    return normalize && r[0] === "0" ? null : r.join("");
  }));
}

var REGEX = /^[01]{12}$/;
/**
 * Test if the given string is a pitch class set chroma.
 * @param {String} chroma - the pitch class set chroma
 * @return {Boolean} true if its a valid pcset chroma
 * @example
 * PcSet.isChroma("101010101010") // => true
 * PcSet.isChroma("101001") // => false
 */

function isChroma(set) {
  return REGEX.test(set);
}

var IVLS = "1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M".split(" ");
/**
 * Given a pcset (notes or chroma) return it"s intervals
 * @param {String|Array} pcset - the pitch class set (notes or chroma)
 * @return {Array} intervals or empty array if not valid pcset
 * @example
 * PcSet.intervals("1010100000000") => ["1P", "2M", "3M"]
 */

function intervals(set) {
  if (!isChroma(set)) {
    return [];
  }

  return (0, _tonalArray.compact)(set.split("").map(function (d, i) {
    return d === "1" ? IVLS[i] : null;
  }));
}
/**
 * Test if two pitch class sets are identical
 *
 * @param {Array|String} set1 - one of the pitch class sets
 * @param {Array|String} set2 - the other pitch class set
 * @return {Boolean} true if they are equal
 * @example
 * PcSet.isEqual(["c2", "d3"], ["c5", "d2"]) // => true
 */


function isEqual(s1, s2) {
  if (arguments.length === 1) {
    return function (s) {
      return isEqual(s1, s);
    };
  }

  return chroma(s1) === chroma(s2);
}
/**
 * Create a function that test if a collection of notes is a
 * subset of a given set
 *
 * The function can be partially applied
 *
 * @param {Array|String} set - an array of notes or a chroma set string to test against
 * @param {Array|String} notes - an array of notes or a chroma set
 * @return {boolean} true if notes is a subset of set, false otherwise
 * @example
 * const inCMajor = PcSet.isSubsetOf(["C", "E", "G"])
 * inCMajor(["e6", "c4"]) // => true
 * inCMajor(["e6", "c4", "d3"]) // => false
 */


function isSubsetOf(set, notes) {
  if (arguments.length > 1) {
    return isSubsetOf(set)(notes);
  }

  set = pcsetNum(set);
  return function (notes) {
    notes = pcsetNum(notes);
    return notes !== set && (notes & set) === notes;
  };
}
/**
 * Create a function that test if a collectio of notes is a
 * superset of a given set (it contains all notes and at least one more)
 *
 * @param {Array|String} set - an array of notes or a chroma set string to test against
 * @param {Array|String} notes - an array of notes or a chroma set
 * @return {boolean} true if notes is a superset of set, false otherwise
 * @example
 * const extendsCMajor = PcSet.isSupersetOf(["C", "E", "G"])
 * extendsCMajor(["e6", "a", "c4", "g2"]) // => true
 * extendsCMajor(["c6", "e4", "g3"]) // => false
 */


function isSupersetOf(set, notes) {
  if (arguments.length > 1) {
    return isSupersetOf(set)(notes);
  }

  set = pcsetNum(set);
  return function (notes) {
    notes = pcsetNum(notes);
    return notes !== set && (notes | set) === notes;
  };
}
/**
 * Test if a given pitch class set includes a note
 * @param {Array|String} set - the base set to test against
 * @param {String|Pitch} note - the note to test
 * @return {Boolean} true if the note is included in the pcset
 * @example
 * PcSet.includes(["C", "D", "E"], "C4") // => true
 * PcSet.includes(["C", "D", "E"], "C#4") // => false
 */


function includes(set, note) {
  if (arguments.length > 1) {
    return includes(set)(note);
  }

  set = chroma(set);
  return function (note) {
    return set[chr(note)] === "1";
  };
}
/**
 * Filter a list with a pitch class set
 *
 * @param {Array|String} set - the pitch class set notes
 * @param {Array|String} notes - the note list to be filtered
 * @return {Array} the filtered notes
 *
 * @example
 * PcSet.filter(["C", "D", "E"], ["c2", "c#2", "d2", "c3", "c#3", "d3"]) // => [ "c2", "d2", "c3", "d3" ])
 * PcSet.filter(["C2"], ["c2", "c#2", "d2", "c3", "c#3", "d3"]) // => [ "c2", "c3" ])
 */


function filter(set, notes) {
  if (arguments.length === 1) {
    return function (n) {
      return filter(set, n);
    };
  }

  return notes.filter(includes(set));
}
},{"tonal-note":"js/tonal/extensions/detect/node_modules/tonal-note/build/es6.js","tonal-interval":"js/tonal/extensions/detect/node_modules/tonal-interval/build/es6.js","tonal-array":"js/tonal/extensions/detect/node_modules/tonal-dictionary/node_modules/tonal-array/build/es6.js"}],"js/tonal/extensions/detect/node_modules/tonal-dictionary/build/es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pcset = exports.chord = exports.scale = exports.combine = exports.dictionary = void 0;

var _scales = _interopRequireDefault(require("./data/scales.json"));

var _chords = _interopRequireDefault(require("./data/chords.json"));

var _tonalPcset = require("tonal-pcset");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [![npm version](https://img.shields.io/npm/v/tonal-dictionary.svg)](https://www.npmjs.com/package/tonal-dictionary)
 *
 * `tonal-dictionary` contains a dictionary of musical scales and chords
 *
 * This is part of [tonal](https://www.npmjs.com/package/tonal) music theory library.
 *
 * @example
 * // es6
 * import * as Dictionary from "tonal-dictionary"
 * // es5
 * const Dictionary = require("tonal-dictionary")
 *
 * @example
 * Dictionary.chord("Maj7") // => ["1P", "3M", "5P", "7M"]
 *
 * @module Dictionary
 */
var dictionary = function (raw) {
  var keys = Object.keys(raw).sort();
  var data = [];
  var index = [];

  var add = function (name, ivls, chroma) {
    data[name] = ivls;
    index[chroma] = index[chroma] || [];
    index[chroma].push(name);
  };

  keys.forEach(function (key) {
    var ivls = raw[key][0].split(" ");
    var alias = raw[key][1];
    var chr = (0, _tonalPcset.chroma)(ivls);
    add(key, ivls, chr);

    if (alias) {
      alias.forEach(function (a) {
        return add(a, ivls, chr);
      });
    }
  });
  var allKeys = Object.keys(data).sort();

  var dict = function (name) {
    return data[name];
  };

  dict.names = function (p) {
    if (typeof p === "string") {
      return (index[p] || []).slice();
    } else {
      return (p === true ? allKeys : keys).slice();
    }
  };

  return dict;
};

exports.dictionary = dictionary;

var combine = function (a, b) {
  var dict = function (name) {
    return a(name) || b(name);
  };

  dict.names = function (p) {
    return a.names(p).concat(b.names(p));
  };

  return dict;
};
/**
 * A dictionary of scales: a function that given a scale name (without tonic)
 * returns an array of intervals
 *
 * @function
 * @param {String} name
 * @return {Array} intervals
 * @example
 * import { scale } from "tonal-dictionary"
 * scale("major") // => ["1P", "2M", ...]
 * scale.names(); // => ["major", ...]
 */


exports.combine = combine;
var scale = dictionary(_scales.default);
/**
 * A dictionary of chords: a function that given a chord type
 * returns an array of intervals
 *
 * @function
 * @param {String} type
 * @return {Array} intervals
 * @example
 * import { chord } from "tonal-dictionary"
 * chord("Maj7") // => ["1P", "3M", ...]
 * chord.names(); // => ["Maj3", ...]
 */

exports.scale = scale;
var chord = dictionary(_chords.default);
exports.chord = chord;
var pcset = combine(scale, chord);
exports.pcset = pcset;
},{"./data/scales.json":"js/tonal/extensions/detect/node_modules/tonal-dictionary/build/data/scales.json","./data/chords.json":"js/tonal/extensions/detect/node_modules/tonal-dictionary/build/data/chords.json","tonal-pcset":"js/tonal/extensions/detect/node_modules/tonal-dictionary/node_modules/tonal-pcset/build/es6.js"}],"js/tonal/extensions/detect/node_modules/tonal-array/build/es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;
exports.rotate = rotate;
exports.sort = sort;
exports.unique = unique;
exports.permutations = exports.shuffle = exports.compact = void 0;

var _tonalNote = require("tonal-note");

/**
 * [![npm version](https://img.shields.io/npm/v/tonal-array.svg?style=flat-square)](https://www.npmjs.com/package/tonal-array)
 *
 * Tonal array utilities. Create ranges, sort notes, ...
 *
 * @example
 * import * as Array;
 * Array.sort(["f", "a", "c"]) // => ["C", "F", "A"]
 *
 * @example
 * const Array = require("tonal-array")
 * Array.range(1, 4) // => [1, 2, 3, 4]
 *
 * @module Array
 */
// ascending range
function ascR(b, n) {
  for (var a = []; n--; a[n] = n + b) {
    ;
  }

  return a;
} // descending range


function descR(b, n) {
  for (var a = []; n--; a[n] = b - n) {
    ;
  }

  return a;
}
/**
 * Create a numeric range
 *
 * @param {Number} from
 * @param {Number} to
 * @return {Array}
 *
 * @example
 * Array.range(-2, 2) // => [-2, -1, 0, 1, 2]
 * Array.range(2, -2) // => [2, 1, 0, -1, -2]
 */


function range(a, b) {
  return a === null || b === null ? [] : a < b ? ascR(a, b - a + 1) : descR(a, a - b + 1);
}
/**
 *
 * Rotates a list a number of times. It"s completly agnostic about the
 * contents of the list.
 *
 * @param {Integer} times - the number of rotations
 * @param {Array} array
 * @return {Array} the rotated array
 * @example
 * Array.rotate(1, [1, 2, 3]) // => [2, 3, 1]
 */


function rotate(times, arr) {
  var len = arr.length;
  var n = (times % len + len) % len;
  return arr.slice(n, len).concat(arr.slice(0, n));
}
/**
 * Return a copy of the array with the null values removed
 * @function
 * @param {Array} array
 * @return {Array}
 *
 * @example
 * Array.compact(["a", "b", null, "c"]) // => ["a", "b", "c"]
 */


var compact = function (arr) {
  return arr.filter(function (n) {
    return n === 0 || n;
  });
}; // a function that get note heights (with negative number for pitch classes)


exports.compact = compact;

var height = function (name) {
  var m = (0, _tonalNote.props)(name).midi;
  return m !== null ? m : (0, _tonalNote.props)(name + "-100").midi;
};
/**
 * Sort an array of notes in ascending order
 *
 * @param {String|Array} notes
 * @return {Array} sorted array of notes
 */


function sort(src) {
  return compact(src.map(_tonalNote.name)).sort(function (a, b) {
    return height(a) > height(b);
  });
}
/**
 * Get sorted notes with duplicates removed
 *
 * @function
 * @param {Array} notes
 */


function unique(arr) {
  return sort(arr).filter(function (n, i, a) {
    return i === 0 || n !== a[i - 1];
  });
}
/**
 * Randomizes the order of the specified array in-place, using the Fisher–Yates shuffle.
 *
 * @private
 * @function
 * @param {Array|String} arr - the array
 * @return {Array} the shuffled array
 *
 * @example
 * Array.shuffle(["C", "D", "E", "F"])
 */


var shuffle = function (arr, rnd) {
  if (rnd === void 0) rnd = Math.random;
  var i, t;
  var m = arr.length;

  while (m) {
    i = rnd() * m-- | 0;
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
};
/**
 * Get all permutations of an array
 * http://stackoverflow.com/questions/9960908/permutations-in-javascript
 *
 * @param {Array} array - the array
 * @return {Array<Array>} an array with all the permutations
 */


exports.shuffle = shuffle;

var permutations = function (arr) {
  if (arr.length === 0) {
    return [[]];
  }

  return permutations(arr.slice(1)).reduce(function (acc, perm) {
    return acc.concat(arr.map(function (e, pos) {
      var newPerm = perm.slice();
      newPerm.splice(pos, 0, arr[0]);
      return newPerm;
    }));
  }, []);
};

exports.permutations = permutations;
},{"tonal-note":"js/tonal/extensions/detect/node_modules/tonal-note/build/es6.js"}],"js/tonal/extensions/detect/node_modules/tonal-pcset/build/es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chroma = chroma;
exports.chromas = chromas;
exports.modes = modes;
exports.isChroma = isChroma;
exports.intervals = intervals;
exports.isEqual = isEqual;
exports.isSubsetOf = isSubsetOf;
exports.isSupersetOf = isSupersetOf;
exports.includes = includes;
exports.filter = filter;

var _tonalNote = require("tonal-note");

var _tonalInterval = require("tonal-interval");

var _tonalArray = require("tonal-array");

/**
 * [![npm version](https://img.shields.io/npm/v/tonal-pcset.svg?style=flat-square)](https://www.npmjs.com/package/tonal-pcset)
 * [![tonal](https://img.shields.io/badge/tonal-pcset-yellow.svg?style=flat-square)](https://www.npmjs.com/browse/keyword/tonal)
 *
 * `tonal-pcset` is a collection of functions to work with pitch class sets, oriented
 * to make comparations (isEqual, isSubset, isSuperset)
 *
 * This is part of [tonal](https://www.npmjs.com/package/tonal) music theory library.
 *
 * You can install via npm: `npm i --save tonal-pcset`
 *
 * ```js
 * // es6
 * import PcSet from "tonal-pcset"
 * var PcSet = require("tonal-pcset")
 *
 * PcSet.isEqual("c2 d5 e6", "c6 e3 d1") // => true
 * ```
 *
 * ## API documentation
 *
 * @module PcSet
 */
var chr = function (str) {
  return (0, _tonalNote.chroma)(str) || (0, _tonalInterval.chroma)(str) || 0;
};

var pcsetNum = function (set) {
  return parseInt(chroma(set), 2);
};

var clen = function (chroma) {
  return chroma.replace(/0/g, "").length;
};
/**
 * Get chroma of a pitch class set. A chroma identifies each set uniquely.
 * It"s a 12-digit binary each presenting one semitone of the octave.
 *
 * Note that this function accepts a chroma as parameter and return it
 * without modification.
 *
 * @param {Array|String} set - the pitch class set
 * @return {String} a binary representation of the pitch class set
 * @example
 * PcSet.chroma(["C", "D", "E"]) // => "1010100000000"
 */


function chroma(set) {
  if (isChroma(set)) {
    return set;
  }

  if (!Array.isArray(set)) {
    return "";
  }

  var b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  set.map(chr).forEach(function (i) {
    b[i] = 1;
  });
  return b.join("");
}

var all = null;
/**
 * Get a list of all possible chromas (all possible scales)
 * More information: http://allthescales.org/
 * @return {Array} an array of possible chromas from '10000000000' to '11111111111'
 *
 */

function chromas(n) {
  all = all || (0, _tonalArray.range)(2048, 4095).map(function (n) {
    return n.toString(2);
  });
  return typeof n === "number" ? all.filter(function (chroma) {
    return clen(chroma) === n;
  }) : all.slice();
}
/**
 * Given a a list of notes or a pcset chroma, produce the rotations
 * of the chroma discarding the ones that starts with "0"
 *
 * This is used, for example, to get all the modes of a scale.
 *
 * @param {Array|String} set - the list of notes or pitchChr of the set
 * @param {Boolean} normalize - (Optional, true by default) remove all
 * the rotations that starts with "0"
 * @return {Array<String>} an array with all the modes of the chroma
 *
 * @example
 * PcSet.modes(["C", "D", "E"]).map(PcSet.intervals)
 */


function modes(set, normalize) {
  normalize = normalize !== false;
  var binary = chroma(set).split("");
  return (0, _tonalArray.compact)(binary.map(function (_, i) {
    var r = (0, _tonalArray.rotate)(i, binary);
    return normalize && r[0] === "0" ? null : r.join("");
  }));
}

var REGEX = /^[01]{12}$/;
/**
 * Test if the given string is a pitch class set chroma.
 * @param {String} chroma - the pitch class set chroma
 * @return {Boolean} true if its a valid pcset chroma
 * @example
 * PcSet.isChroma("101010101010") // => true
 * PcSet.isChroma("101001") // => false
 */

function isChroma(set) {
  return REGEX.test(set);
}

var IVLS = "1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M".split(" ");
/**
 * Given a pcset (notes or chroma) return it"s intervals
 * @param {String|Array} pcset - the pitch class set (notes or chroma)
 * @return {Array} intervals or empty array if not valid pcset
 * @example
 * PcSet.intervals("1010100000000") => ["1P", "2M", "3M"]
 */

function intervals(set) {
  if (!isChroma(set)) {
    return [];
  }

  return (0, _tonalArray.compact)(set.split("").map(function (d, i) {
    return d === "1" ? IVLS[i] : null;
  }));
}
/**
 * Test if two pitch class sets are identical
 *
 * @param {Array|String} set1 - one of the pitch class sets
 * @param {Array|String} set2 - the other pitch class set
 * @return {Boolean} true if they are equal
 * @example
 * PcSet.isEqual(["c2", "d3"], ["c5", "d2"]) // => true
 */


function isEqual(s1, s2) {
  if (arguments.length === 1) {
    return function (s) {
      return isEqual(s1, s);
    };
  }

  return chroma(s1) === chroma(s2);
}
/**
 * Create a function that test if a collection of notes is a
 * subset of a given set
 *
 * The function can be partially applied
 *
 * @param {Array|String} set - an array of notes or a chroma set string to test against
 * @param {Array|String} notes - an array of notes or a chroma set
 * @return {boolean} true if notes is a subset of set, false otherwise
 * @example
 * const inCMajor = PcSet.isSubsetOf(["C", "E", "G"])
 * inCMajor(["e6", "c4"]) // => true
 * inCMajor(["e6", "c4", "d3"]) // => false
 */


function isSubsetOf(set, notes) {
  if (arguments.length > 1) {
    return isSubsetOf(set)(notes);
  }

  set = pcsetNum(set);
  return function (notes) {
    notes = pcsetNum(notes);
    return notes !== set && (notes & set) === notes;
  };
}
/**
 * Create a function that test if a collectio of notes is a
 * superset of a given set (it contains all notes and at least one more)
 *
 * @param {Array|String} set - an array of notes or a chroma set string to test against
 * @param {Array|String} notes - an array of notes or a chroma set
 * @return {boolean} true if notes is a superset of set, false otherwise
 * @example
 * const extendsCMajor = PcSet.isSupersetOf(["C", "E", "G"])
 * extendsCMajor(["e6", "a", "c4", "g2"]) // => true
 * extendsCMajor(["c6", "e4", "g3"]) // => false
 */


function isSupersetOf(set, notes) {
  if (arguments.length > 1) {
    return isSupersetOf(set)(notes);
  }

  set = pcsetNum(set);
  return function (notes) {
    notes = pcsetNum(notes);
    return notes !== set && (notes | set) === notes;
  };
}
/**
 * Test if a given pitch class set includes a note
 * @param {Array|String} set - the base set to test against
 * @param {String|Pitch} note - the note to test
 * @return {Boolean} true if the note is included in the pcset
 * @example
 * PcSet.includes(["C", "D", "E"], "C4") // => true
 * PcSet.includes(["C", "D", "E"], "C#4") // => false
 */


function includes(set, note) {
  if (arguments.length > 1) {
    return includes(set)(note);
  }

  set = chroma(set);
  return function (note) {
    return set[chr(note)] === "1";
  };
}
/**
 * Filter a list with a pitch class set
 *
 * @param {Array|String} set - the pitch class set notes
 * @param {Array|String} notes - the note list to be filtered
 * @return {Array} the filtered notes
 *
 * @example
 * PcSet.filter(["C", "D", "E"], ["c2", "c#2", "d2", "c3", "c#3", "d3"]) // => [ "c2", "d2", "c3", "d3" ])
 * PcSet.filter(["C2"], ["c2", "c#2", "d2", "c3", "c#3", "d3"]) // => [ "c2", "c3" ])
 */


function filter(set, notes) {
  if (arguments.length === 1) {
    return function (n) {
      return filter(set, n);
    };
  }

  return notes.filter(includes(set));
}
},{"tonal-note":"js/tonal/extensions/detect/node_modules/tonal-note/build/es6.js","tonal-interval":"js/tonal/extensions/detect/node_modules/tonal-interval/build/es6.js","tonal-array":"js/tonal/extensions/detect/node_modules/tonal-array/build/es6.js"}],"js/tonal/extensions/detect/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detector = detector;
exports.pcset = exports.scale = exports.chord = void 0;

var _tonalNote = require("tonal-note");

var Dictionary = _interopRequireWildcard(require("tonal-dictionary"));

var _tonalArray = require("tonal-array");

var _tonalPcset = require("tonal-pcset");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * [![npm version](https://img.shields.io/npm/v/tonal-detect.svg?style=flat-square)](https://www.npmjs.com/package/tonal-detect)
 *
 * Find chord and scale names from a collection of notes or pitch classes
 *
 * This is part of [tonal](https://www.npmjs.com/package/tonal) music theory library.
 *
 * @example
 * import { chord } from "tonal-detect"
 * chord(["C", "E", "G", "A"]) // => ["CM6", "Am7"]
 *
 * @example
 * const Detect = require("tonal-detect")
 * Detect.chord(["C", "E", "G", "A"]) // => ["CM6", "Am7"]
 *
 * @module Detect
 */
function detector(dictionary, defaultBuilder) {
  defaultBuilder = defaultBuilder || function (tonic, names) {
    return [tonic, names];
  };

  return function (notes, builder) {
    builder = builder || defaultBuilder;
    notes = (0, _tonalArray.sort)(notes.map(_tonalNote.pc));
    return (0, _tonalPcset.modes)(notes).map(function (mode, i) {
      var tonic = (0, _tonalNote.name)(notes[i]);
      var names = dictionary.names(mode);
      return names.length ? builder(tonic, names) : null;
    }).filter(function (x) {
      return x;
    });
  };
}
/**
 * Given a collection of notes or pitch classes, try to find the chord name
 * @function
 * @param {Array<String>} notes
 * @return {Array<String>} chord names or empty array
 * @example
 * Detect.chord(["C", "E", "G", "A"]) // => ["CM6", "Am7"]
 */


var chord = detector(Dictionary.chord, function (tonic, names) {
  return tonic + names[0];
});
/**
 * Given a collection of notes or pitch classes, try to find the scale names
 * @function
 * @param {Array<String>} notes
 * @return {Array<String>} scale names or empty array
 * @example
 * Detect.scale(["f3", "a", "c5", "e2", "d", "g2", "b6"]) // => [
 * "C major",
 * "D dorian",
 * "E phrygian",
 * "F lydian",
 * "G mixolydian",
 * "A aeolian",
 * "B locrian"
 * ]
 */

exports.chord = chord;
var scale = detector(Dictionary.scale, function (tonic, names) {
  return tonic + " " + names[0];
});
exports.scale = scale;
var pcset = detector(Dictionary.pcset);
exports.pcset = pcset;
},{"tonal-note":"js/tonal/extensions/detect/node_modules/tonal-note/build/es6.js","tonal-dictionary":"js/tonal/extensions/detect/node_modules/tonal-dictionary/build/es6.js","tonal-array":"js/tonal/extensions/detect/node_modules/tonal-array/build/es6.js","tonal-pcset":"js/tonal/extensions/detect/node_modules/tonal-pcset/build/es6.js"}],"js/tonal/dist/tonal.min.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (n, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(n.Tonal = {});
}(this, function (n) {
  "use strict";

  function t(n) {
    "string" != typeof n && (n = "");
    var t = I.exec(n);
    return [t[1].toUpperCase(), t[2].replace(/x/g, "##"), t[3], t[4]];
  }

  function r(n, t) {
    return void 0 === t && (t = !1), n = Math.round(n), (!0 === t ? F : G)[n % 12] + (Math.floor(n / 12) - 1);
  }

  function e(n, t) {
    for (var r = []; t--; r[t] = t + n) {
      ;
    }

    return r;
  }

  function m(n, t) {
    for (var r = []; t--; r[t] = n - t) {
      ;
    }

    return r;
  }

  function i(n, t) {
    return null === n || null === t ? [] : n < t ? e(n, t - n + 1) : m(n, n - t + 1);
  }

  function u(n, t) {
    var r = t.length,
        e = (n % r + r) % r;
    return t.slice(e, r).concat(t.slice(0, e));
  }

  function o(n) {
    return an(n.map(Q)).sort(function (n, t) {
      return ln(n) > ln(t);
    });
  }

  function P(n) {
    return o(n).filter(function (n, t, r) {
      return 0 === t || n !== r[t - 1];
    });
  }

  function M(n) {
    return "string" != typeof n ? gn : qn[n] || (qn[n] = _n(n));
  }

  function a(n) {
    var t = (n + 1) % 7;
    return t < 0 ? 7 + t : t;
  }

  function l(n, t) {
    if (1 === arguments.length) return function (t) {
      return l(n, t);
    };
    var r = Kn(n),
        e = Vn(t);
    if (null === r || null === e) return null;
    var m = 1 === r.length ? [r[0] + e[0]] : [r[0] + e[0], r[1] + e[1]];
    return un(Un(m[0], m[1]));
  }

  function c(n, t) {
    if (1 === arguments.length) return function (t) {
      return c(n, t);
    };
    var r = Kn(n);
    return null === r ? null : un(Un(r[0] + t));
  }

  function s(n, t) {
    if (1 === arguments.length) return function (t) {
      return s(n, t);
    };
    var r = Kn(n),
        e = Kn(t);
    return null === e || null === r ? null : e[0] - r[0];
  }

  function f(n, t) {
    return 1 === arguments.length ? function (t) {
      return l(t, n);
    } : l(t, n);
  }

  function d(n, t, r) {
    var e = Vn(n),
        m = Vn(t);
    if (null === e || null === m) return null;
    var i = [e[0] + r * m[0], e[1] + r * m[1]];
    return En(Xn(i));
  }

  function p(n, t) {
    return 1 === arguments.length ? function (t) {
      return p(n, t);
    } : d(n, t, 1);
  }

  function b(n, t) {
    return 1 === arguments.length ? function (t) {
      return p(n, t);
    } : d(n, t, -1);
  }

  function h(n, t) {
    if (1 === arguments.length) return function (t) {
      return h(n, t);
    };
    var r = Kn(n),
        e = Kn(t);
    if (null === r || null === e || r.length !== e.length) return null;
    var m = 1 === r.length ? [e[0] - r[0], -Math.floor(7 * (e[0] - r[0]) / 12)] : [e[0] - r[0], e[1] - r[1]];
    return En(Xn(m));
  }

  function v(n, t) {
    if (1 === arguments.length) return function (t) {
      return v(n, t);
    };
    var r = L(n),
        e = L(t);
    return null !== r.midi && null !== e.midi ? e.midi - r.midi : null !== r.chroma && null !== e.chroma ? (e.chroma - r.chroma + 12) % 12 : null;
  }

  function A(n) {
    if (j(n)) return n;
    if (!Array.isArray(n)) return "";
    var t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    return n.map(tt).forEach(function (n) {
      t[n] = 1;
    }), t.join("");
  }

  function g(n) {
    return mt = mt || i(2048, 4095).map(function (n) {
      return n.toString(2);
    }), "number" == typeof n ? mt.filter(function (t) {
      return et(t) === n;
    }) : mt.slice();
  }

  function y(n, t) {
    t = !1 !== t;
    var r = A(n).split("");
    return an(r.map(function (n, e) {
      var m = u(e, r);
      return t && "0" === m[0] ? null : m.join("");
    }));
  }

  function j(n) {
    return it.test(n);
  }

  function O(n) {
    return j(n) ? an(n.split("").map(function (n, t) {
      return "1" === n ? ut[t] : null;
    })) : [];
  }

  function x(n, t) {
    return 1 === arguments.length ? function (t) {
      return x(n, t);
    } : A(n) === A(t);
  }

  function _(n, t) {
    return arguments.length > 1 ? _(n)(t) : (n = rt(n), function (t) {
      return (t = rt(t)) !== n && (t & n) === t;
    });
  }

  function q(n, t) {
    return arguments.length > 1 ? q(n)(t) : (n = rt(n), function (t) {
      return (t = rt(t)) !== n && (t | n) === t;
    });
  }

  function z(n, t) {
    return arguments.length > 1 ? z(n)(t) : (n = A(n), function (t) {
      return "1" === n[tt(t)];
    });
  }

  function k(n, t) {
    return 1 === arguments.length ? function (t) {
      return k(n, t);
    } : t.filter(z(n));
  }

  function w(n, t) {
    var r = D(n);
    return t = t || r[1], bt(t).map(l(r[0]));
  }

  function S(n) {
    var t = D(n);
    return void 0 !== at(t[1]);
  }

  function D(n) {
    if ("string" != typeof n) return ["", ""];
    var t = n.indexOf(" "),
        r = Q(n.substring(0, t)) || Q(n) || "",
        e = "" !== r ? n.substring(r.length + 1) : n;
    return [r, e.length ? e : ""];
  }

  function E(n, t) {
    if (t) return _t(t).intervals.map(l(n));
    var r = C(n),
        e = r[0],
        m = r[1];
    return _t(m).intervals.map(l(e));
  }

  function C(n) {
    var r = t(n);
    return "" === r[0] ? ["", n] : "A" === r[0] && "ug" === r[3] ? ["", "aug"] : St.test(r[2]) ? [r[0] + r[1], r[2] + r[3]] : [r[0] + r[1] + r[2], r[3]];
  }

  var T = "C C# Db D D# Eb E F F# Gb G G# Ab A A# Bb B".split(" "),
      $ = function $(n) {
    return "string" != typeof n ? T.slice() : T.filter(function (t) {
      var r = t[1] || " ";
      return -1 !== n.indexOf(r);
    });
  },
      F = $(" #"),
      G = $(" b"),
      I = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/,
      B = Object.freeze({
    pc: null,
    name: null,
    step: null,
    alt: null,
    oct: null,
    octStr: null,
    chroma: null,
    midi: null,
    freq: null
  }),
      N = [0, 2, 4, 5, 7, 9, 11],
      L = function (n, t) {
    return void 0 === t && (t = {}), function (r) {
      return t[r] || (t[r] = n(r));
    };
  }(function (n) {
    var r = t(n);
    if ("" === r[0] || "" !== r[3]) return B;
    var e = r[0],
        m = r[1],
        i = r[2],
        u = {
      letter: e,
      acc: m,
      octStr: i,
      pc: e + m,
      name: e + m + i,
      step: (e.charCodeAt(0) + 3) % 7,
      alt: "b" === m[0] ? -m.length : m.length,
      oct: i.length ? +i : null,
      chroma: 0,
      midi: null,
      freq: null
    };
    return u.chroma = (N[u.step] + u.alt + 120) % 12, u.midi = null !== u.oct ? N[u.step] + u.alt + 12 * (u.oct + 1) : null, u.freq = J(u.midi), Object.freeze(u);
  }),
      Q = function Q(n) {
    return L(n).name;
  },
      R = function R(n) {
    return L(n).pc;
  },
      U = function U(n) {
    return n >= 0 && n <= 127;
  },
      H = function H(n) {
    if ("number" != typeof n && "string" != typeof n) return null;
    var t = L(n).midi,
        r = t || 0 === t ? t : +n;
    return U(r) ? r : null;
  },
      J = function J(n, t) {
    return void 0 === t && (t = 440), "number" == typeof n ? Math.pow(2, (n - 69) / 12) * t : null;
  },
      K = function K(n) {
    return L(n).freq || J(n);
  },
      V = Math.log(2),
      W = Math.log(440),
      X = function X(n) {
    var t = 12 * (Math.log(n) - W) / V + 69;
    return Math.round(100 * t) / 100;
  },
      Y = function Y(n) {
    return L(n).chroma;
  },
      Z = function Z(n) {
    return L(n).oct;
  },
      nn = function nn(n) {
    return "CDEFGAB"[n];
  },
      tn = function tn(n, t) {
    return Array(t + 1).join(n);
  },
      rn = function rn(n, t) {
    return "number" != typeof n ? "" : t(n);
  },
      en = function en(n) {
    return rn(n, function (n) {
      return n < 0 ? tn("b", -n) : tn("#", n);
    });
  },
      mn = function mn(n, t) {
    void 0 === n && (n = {}), void 0 === t && (t = null);
    var r = t ? Object.assign({}, L(t), n) : n,
        e = r.step,
        m = r.alt,
        i = r.oct;
    if ("number" != typeof e) return null;
    var u = nn(e);
    if (!u) return null;
    var o = u + en(m);
    return i || 0 === i ? o + i : o;
  },
      un = mn,
      on = function on(n, t) {
    void 0 === t && (t = !0);
    var e = L(n),
        m = e.alt,
        i = e.chroma,
        u = e.midi;
    if (null === i) return null;
    var o = m,
        P = !1 === t ? o < 0 : o > 0;
    return null === u ? R(r(i, P)) : r(u, P);
  },
      Pn = function Pn(n) {
    return on(n, !1);
  },
      Mn = Object.freeze({
    names: $,
    tokenize: t,
    props: L,
    name: Q,
    pc: R,
    midi: H,
    midiToFreq: J,
    freq: K,
    freqToMidi: X,
    chroma: Y,
    oct: Z,
    stepToLetter: nn,
    altToAcc: en,
    from: mn,
    build: un,
    fromMidi: r,
    simplify: on,
    enharmonic: Pn
  }),
      an = function an(n) {
    return n.filter(function (n) {
      return 0 === n || n;
    });
  },
      ln = function ln(n) {
    var t = L(n).midi;
    return null !== t ? t : L(n + "-100").midi;
  },
      cn = function cn(n, t) {
    void 0 === t && (t = Math.random);

    for (var r, e, m = n.length; m;) {
      r = t() * m-- | 0, e = n[m], n[m] = n[r], n[r] = e;
    }

    return n;
  },
      sn = function sn(n) {
    return 0 === n.length ? [[]] : sn(n.slice(1)).reduce(function (t, r) {
      return t.concat(n.map(function (t, e) {
        var m = r.slice();
        return m.splice(e, 0, n[0]), m;
      }));
    }, []);
  },
      fn = Object.freeze({
    range: i,
    rotate: u,
    compact: an,
    sort: o,
    unique: P,
    shuffle: cn,
    permutations: sn
  }),
      dn = new RegExp("^([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})|(AA|A|P|M|m|d|dd)([-+]?\\d+)$"),
      pn = [0, 2, 4, 5, 7, 9, 11],
      bn = [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1],
      hn = "1P 2m 2M 3m 3M 4P 5P 6m 6M 7m 7M 8P".split(" "),
      vn = function vn(n) {
    return "string" != typeof n ? hn.slice() : hn.filter(function (t) {
      return -1 !== n.indexOf(t[1]);
    });
  },
      An = function An(n) {
    var t = dn.exec("" + n);
    return null === t ? null : t[1] ? [t[1], t[2]] : [t[4], t[3]];
  },
      gn = Object.freeze({
    name: null,
    num: null,
    q: null,
    step: null,
    alt: null,
    dir: null,
    type: null,
    simple: null,
    semitones: null,
    chroma: null,
    oct: null
  }),
      yn = function yn(n, t) {
    return Array(Math.abs(t) + 1).join(n);
  },
      jn = function jn(n, t) {
    return "M" === t && "M" === n ? 0 : "P" === t && "P" === n ? 0 : "m" === t && "M" === n ? -1 : /^A+$/.test(t) ? t.length : /^d+$/.test(t) ? "P" === n ? -t.length : -t.length - 1 : null;
  },
      On = function On(n, t) {
    return 0 === t ? "M" === n ? "M" : "P" : -1 === t && "M" === n ? "m" : t > 0 ? yn("A", t) : t < 0 ? yn("d", "P" === n ? t : t + 1) : null;
  },
      xn = function xn(n) {
    return (Math.abs(n) - 1) % 7;
  },
      _n = function _n(n) {
    var t = An(n);
    if (null === t) return gn;
    var r = {
      num: 0,
      q: "d",
      name: "",
      type: "M",
      step: 0,
      dir: -1,
      simple: 1,
      alt: 0,
      oct: 0,
      semitones: 0,
      chroma: 0,
      ic: 0
    };
    return r.num = +t[0], r.q = t[1], r.step = xn(r.num), r.type = "PMMPPMM"[r.step], "M" === r.type && "P" === r.q ? gn : (r.name = "" + r.num + r.q, r.dir = r.num < 0 ? -1 : 1, r.simple = 8 === r.num || -8 === r.num ? r.num : r.dir * (r.step + 1), r.alt = jn(r.type, r.q), r.oct = Math.floor((Math.abs(r.num) - 1) / 7), r.semitones = r.dir * (pn[r.step] + r.alt + 12 * r.oct), r.chroma = (r.dir * (pn[r.step] + r.alt) % 12 + 12) % 12, Object.freeze(r));
  },
      qn = {},
      zn = function zn(n) {
    return M(n).num;
  },
      kn = function kn(n) {
    return M(n).name;
  },
      wn = function wn(n) {
    return M(n).semitones;
  },
      Sn = function Sn(n) {
    return M(n).chroma;
  },
      Dn = function Dn(n) {
    return "string" == typeof n && (n = M(n).chroma), "number" == typeof n ? bn[n % 12] : null;
  },
      En = function En(n) {
    var t = void 0 === n ? {} : n,
        r = t.num,
        e = t.step,
        m = t.alt,
        i = t.oct,
        u = void 0 === i ? 1 : i,
        o = t.dir;
    if (void 0 !== e && (r = e + 1 + 7 * u), void 0 === r) return null;
    if ("number" != typeof m) return null;
    var P = "number" != typeof o ? "" : o < 0 ? "-" : "",
        M = "PMMPPMM"[xn(r)];
    return P + r + On(M, m);
  },
      Cn = function Cn(n) {
    var t = M(n);
    if (t === gn) return null;
    var r = t;
    return r.simple + r.q;
  },
      Tn = function Tn(n) {
    var t = M(n);
    if (t === gn) return null;
    var r = t,
        e = (7 - r.step) % 7,
        m = "P" === r.type ? -r.alt : -(r.alt + 1);
    return En({
      step: e,
      alt: m,
      oct: r.oct,
      dir: r.dir
    });
  },
      $n = [1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7],
      Fn = "P m M m M P d P m M m M".split(" "),
      Gn = function Gn(n) {
    var t = n < 0 ? -1 : 1,
        r = Math.abs(n),
        e = r % 12,
        m = Math.floor(r / 12);
    return t * ($n[e] + 7 * m) + Fn[e];
  },
      In = Object.freeze({
    names: vn,
    tokenize: An,
    qToAlt: jn,
    altToQ: On,
    props: M,
    num: zn,
    name: kn,
    semitones: wn,
    chroma: Sn,
    ic: Dn,
    build: En,
    simplify: Cn,
    invert: Tn,
    fromSemitones: Gn
  }),
      Bn = [0, 2, 4, -1, 1, 3, 5],
      Nn = function Nn(n) {
    return Math.floor(7 * n / 12);
  },
      Ln = Bn.map(Nn),
      Qn = function Qn(n) {
    var t = n.step,
        r = n.alt,
        e = n.oct,
        m = n.dir;
    void 0 === m && (m = 1);
    var i = Bn[t] + 7 * r;
    return null === e ? [m * i] : [m * i, m * (e - Ln[t] - 4 * r)];
  },
      Rn = [3, 0, 4, 1, 5, 2, 6],
      Un = function Un(n, t, r) {
    var e = Rn[a(n)],
        m = Math.floor((n + 1) / 7);
    return void 0 === t ? {
      step: e,
      alt: m,
      dir: r
    } : {
      step: e,
      alt: m,
      oct: t + 4 * m + Ln[e],
      dir: r
    };
  },
      Hn = function Hn(n, t) {
    return void 0 === t && (t = {}), function (r) {
      return t[r] || (t[r] = n(r));
    };
  },
      Jn = function Jn(n) {
    return Hn(function (t) {
      var r = n(t);
      return null === r.name ? null : Qn(r);
    });
  },
      Kn = Jn(L),
      Vn = Jn(M),
      Wn = function Wn(n) {
    return 7 * n[0] + 12 * n[1] < 0;
  },
      Xn = function Xn(n) {
    return Wn(n) ? Un(-n[0], -n[1], -1) : Un(n[0], n[1], 1);
  },
      Yn = Object.freeze({
    transpose: l,
    trFifths: c,
    fifths: s,
    transposeBy: f,
    addIntervals: d,
    add: p,
    subtract: b,
    interval: h,
    semitones: v
  }),
      Zn = {
    chromatic: ["1P 2m 2M 3m 3M 4P 4A 5P 6m 6M 7m 7M"],
    lydian: ["1P 2M 3M 4A 5P 6M 7M"],
    major: ["1P 2M 3M 4P 5P 6M 7M", ["ionian"]],
    mixolydian: ["1P 2M 3M 4P 5P 6M 7m", ["dominant"]],
    dorian: ["1P 2M 3m 4P 5P 6M 7m"],
    aeolian: ["1P 2M 3m 4P 5P 6m 7m", ["minor"]],
    phrygian: ["1P 2m 3m 4P 5P 6m 7m"],
    locrian: ["1P 2m 3m 4P 5d 6m 7m"],
    "melodic minor": ["1P 2M 3m 4P 5P 6M 7M"],
    "melodic minor second mode": ["1P 2m 3m 4P 5P 6M 7m"],
    "lydian augmented": ["1P 2M 3M 4A 5A 6M 7M"],
    "lydian dominant": ["1P 2M 3M 4A 5P 6M 7m", ["lydian b7"]],
    "melodic minor fifth mode": ["1P 2M 3M 4P 5P 6m 7m", ["hindu", "mixolydian b6M"]],
    "locrian #2": ["1P 2M 3m 4P 5d 6m 7m", ["half-diminished"]],
    altered: ["1P 2m 3m 3M 5d 6m 7m", ["super locrian", "diminished whole tone", "pomeroy"]],
    "harmonic minor": ["1P 2M 3m 4P 5P 6m 7M"],
    "phrygian dominant": ["1P 2m 3M 4P 5P 6m 7m", ["spanish", "phrygian major"]],
    "half-whole diminished": ["1P 2m 3m 3M 4A 5P 6M 7m", ["dominant diminished"]],
    diminished: ["1P 2M 3m 4P 5d 6m 6M 7M", ["whole-half diminished"]],
    "major pentatonic": ["1P 2M 3M 5P 6M", ["pentatonic"]],
    "lydian pentatonic": ["1P 3M 4A 5P 7M", ["chinese"]],
    "mixolydian pentatonic": ["1P 3M 4P 5P 7m", ["indian"]],
    "locrian pentatonic": ["1P 3m 4P 5d 7m", ["minor seven flat five pentatonic"]],
    "minor pentatonic": ["1P 3m 4P 5P 7m"],
    "minor six pentatonic": ["1P 3m 4P 5P 6M"],
    "minor hexatonic": ["1P 2M 3m 4P 5P 7M"],
    "flat three pentatonic": ["1P 2M 3m 5P 6M", ["kumoi"]],
    "flat six pentatonic": ["1P 2M 3M 5P 6m"],
    "major flat two pentatonic": ["1P 2m 3M 5P 6M"],
    "whole tone pentatonic": ["1P 3M 5d 6m 7m"],
    "ionian pentatonic": ["1P 3M 4P 5P 7M"],
    "lydian #5P pentatonic": ["1P 3M 4A 5A 7M"],
    "lydian dominant pentatonic": ["1P 3M 4A 5P 7m"],
    "minor #7M pentatonic": ["1P 3m 4P 5P 7M"],
    "super locrian pentatonic": ["1P 3m 4d 5d 7m"],
    "in-sen": ["1P 2m 4P 5P 7m"],
    iwato: ["1P 2m 4P 5d 7m"],
    hirajoshi: ["1P 2M 3m 5P 6m"],
    kumoijoshi: ["1P 2m 4P 5P 6m"],
    pelog: ["1P 2m 3m 5P 6m"],
    "vietnamese 1": ["1P 3m 4P 5P 6m"],
    "vietnamese 2": ["1P 3m 4P 5P 7m"],
    prometheus: ["1P 2M 3M 4A 6M 7m"],
    "prometheus neopolitan": ["1P 2m 3M 4A 6M 7m"],
    ritusen: ["1P 2M 4P 5P 6M"],
    scriabin: ["1P 2m 3M 5P 6M"],
    piongio: ["1P 2M 4P 5P 6M 7m"],
    "major blues": ["1P 2M 3m 3M 5P 6M"],
    "minor blues": ["1P 3m 4P 5d 5P 7m", ["blues"]],
    "composite blues": ["1P 2M 3m 3M 4P 5d 5P 6M 7m"],
    augmented: ["1P 2A 3M 5P 5A 7M"],
    "augmented heptatonic": ["1P 2A 3M 4P 5P 5A 7M"],
    "dorian #4": ["1P 2M 3m 4A 5P 6M 7m"],
    "lydian diminished": ["1P 2M 3m 4A 5P 6M 7M"],
    "whole tone": ["1P 2M 3M 4A 5A 7m"],
    "leading whole tone": ["1P 2M 3M 4A 5A 7m 7M"],
    "lydian minor": ["1P 2M 3M 4A 5P 6m 7m"],
    "locrian major": ["1P 2M 3M 4P 5d 6m 7m", ["arabian"]],
    neopolitan: ["1P 2m 3m 4P 5P 6m 7M"],
    "neopolitan minor": ["1P 2m 3m 4P 5P 6m 7M"],
    "neopolitan major": ["1P 2m 3m 4P 5P 6M 7M", ["dorian b2"]],
    "neopolitan major pentatonic": ["1P 3M 4P 5d 7m"],
    "romanian minor": ["1P 2M 3m 5d 5P 6M 7m"],
    "double harmonic lydian": ["1P 2m 3M 4A 5P 6m 7M"],
    "harmonic major": ["1P 2M 3M 4P 5P 6m 7M"],
    "double harmonic major": ["1P 2m 3M 4P 5P 6m 7M", ["gypsy"]],
    egyptian: ["1P 2M 4P 5P 7m"],
    "hungarian minor": ["1P 2M 3m 4A 5P 6m 7M"],
    "hungarian major": ["1P 2A 3M 4A 5P 6M 7m"],
    oriental: ["1P 2m 3M 4P 5d 6M 7m"],
    "spanish heptatonic": ["1P 2m 3m 3M 4P 5P 6m 7m"],
    flamenco: ["1P 2m 3m 3M 4A 5P 7m"],
    balinese: ["1P 2m 3m 4P 5P 6m 7M"],
    "todi raga": ["1P 2m 3m 4A 5P 6m 7M"],
    "malkos raga": ["1P 3m 4P 6m 7m"],
    "kafi raga": ["1P 3m 3M 4P 5P 6M 7m 7M"],
    "purvi raga": ["1P 2m 3M 4P 4A 5P 6m 7M"],
    persian: ["1P 2m 3M 4P 5d 6m 7M"],
    bebop: ["1P 2M 3M 4P 5P 6M 7m 7M"],
    "bebop dominant": ["1P 2M 3M 4P 5P 6M 7m 7M"],
    "bebop minor": ["1P 2M 3m 3M 4P 5P 6M 7m"],
    "bebop major": ["1P 2M 3M 4P 5P 5A 6M 7M"],
    "bebop locrian": ["1P 2m 3m 4P 5d 5P 6m 7m"],
    "minor bebop": ["1P 2M 3m 4P 5P 6m 7m 7M"],
    "mystery #1": ["1P 2m 3M 5d 6m 7m"],
    enigmatic: ["1P 2m 3M 5d 6m 7m 7M"],
    "minor six diminished": ["1P 2M 3m 4P 5P 6m 6M 7M"],
    "ionian augmented": ["1P 2M 3M 4P 5A 6M 7M"],
    "lydian #9": ["1P 2m 3M 4A 5P 6M 7M"],
    ichikosucho: ["1P 2M 3M 4P 5d 5P 6M 7M"],
    "six tone symmetric": ["1P 2m 3M 4P 5A 6M"]
  },
      nt = {
    4: ["1P 4P 7m 10m", ["quartal"]],
    5: ["1P 5P"],
    7: ["1P 3M 5P 7m", ["Dominant", "Dom"]],
    9: ["1P 3M 5P 7m 9M", ["79"]],
    11: ["1P 5P 7m 9M 11P"],
    13: ["1P 3M 5P 7m 9M 13M", ["13_"]],
    64: ["5P 8P 10M"],
    M: ["1P 3M 5P", ["Major", ""]],
    "M#5": ["1P 3M 5A", ["augmented", "maj#5", "Maj#5", "+", "aug"]],
    "M#5add9": ["1P 3M 5A 9M", ["+add9"]],
    M13: ["1P 3M 5P 7M 9M 13M", ["maj13", "Maj13"]],
    "M13#11": ["1P 3M 5P 7M 9M 11A 13M", ["maj13#11", "Maj13#11", "M13+4", "M13#4"]],
    M6: ["1P 3M 5P 13M", ["6"]],
    "M6#11": ["1P 3M 5P 6M 11A", ["M6b5", "6#11", "6b5"]],
    M69: ["1P 3M 5P 6M 9M", ["69"]],
    "M69#11": ["1P 3M 5P 6M 9M 11A"],
    "M7#11": ["1P 3M 5P 7M 11A", ["maj7#11", "Maj7#11", "M7+4", "M7#4"]],
    "M7#5": ["1P 3M 5A 7M", ["maj7#5", "Maj7#5", "maj9#5", "M7+"]],
    "M7#5sus4": ["1P 4P 5A 7M"],
    "M7#9#11": ["1P 3M 5P 7M 9A 11A"],
    M7add13: ["1P 3M 5P 6M 7M 9M"],
    M7b5: ["1P 3M 5d 7M"],
    M7b6: ["1P 3M 6m 7M"],
    M7b9: ["1P 3M 5P 7M 9m"],
    M7sus4: ["1P 4P 5P 7M"],
    M9: ["1P 3M 5P 7M 9M", ["maj9", "Maj9"]],
    "M9#11": ["1P 3M 5P 7M 9M 11A", ["maj9#11", "Maj9#11", "M9+4", "M9#4"]],
    "M9#5": ["1P 3M 5A 7M 9M", ["Maj9#5"]],
    "M9#5sus4": ["1P 4P 5A 7M 9M"],
    M9b5: ["1P 3M 5d 7M 9M"],
    M9sus4: ["1P 4P 5P 7M 9M"],
    Madd9: ["1P 3M 5P 9M", ["2", "add9", "add2"]],
    Maj7: ["1P 3M 5P 7M", ["maj7", "M7"]],
    Mb5: ["1P 3M 5d"],
    Mb6: ["1P 3M 13m"],
    Msus2: ["1P 2M 5P", ["add9no3", "sus2"]],
    Msus4: ["1P 4P 5P", ["sus", "sus4"]],
    Maddb9: ["1P 3M 5P 9m"],
    "11b9": ["1P 5P 7m 9m 11P"],
    "13#11": ["1P 3M 5P 7m 9M 11A 13M", ["13+4", "13#4"]],
    "13#9": ["1P 3M 5P 7m 9A 13M", ["13#9_"]],
    "13#9#11": ["1P 3M 5P 7m 9A 11A 13M"],
    "13b5": ["1P 3M 5d 6M 7m 9M"],
    "13b9": ["1P 3M 5P 7m 9m 13M"],
    "13b9#11": ["1P 3M 5P 7m 9m 11A 13M"],
    "13no5": ["1P 3M 7m 9M 13M"],
    "13sus4": ["1P 4P 5P 7m 9M 13M", ["13sus"]],
    "69#11": ["1P 3M 5P 6M 9M 11A"],
    "7#11": ["1P 3M 5P 7m 11A", ["7+4", "7#4", "7#11_", "7#4_"]],
    "7#11b13": ["1P 3M 5P 7m 11A 13m", ["7b5b13"]],
    "7#5": ["1P 3M 5A 7m", ["+7", "7aug", "aug7"]],
    "7#5#9": ["1P 3M 5A 7m 9A", ["7alt", "7#5#9_", "7#9b13_"]],
    "7#5b9": ["1P 3M 5A 7m 9m"],
    "7#5b9#11": ["1P 3M 5A 7m 9m 11A"],
    "7#5sus4": ["1P 4P 5A 7m"],
    "7#9": ["1P 3M 5P 7m 9A", ["7#9_"]],
    "7#9#11": ["1P 3M 5P 7m 9A 11A", ["7b5#9"]],
    "7#9#11b13": ["1P 3M 5P 7m 9A 11A 13m"],
    "7#9b13": ["1P 3M 5P 7m 9A 13m"],
    "7add6": ["1P 3M 5P 7m 13M", ["67", "7add13"]],
    "7b13": ["1P 3M 7m 13m"],
    "7b5": ["1P 3M 5d 7m"],
    "7b6": ["1P 3M 5P 6m 7m"],
    "7b9": ["1P 3M 5P 7m 9m"],
    "7b9#11": ["1P 3M 5P 7m 9m 11A", ["7b5b9"]],
    "7b9#9": ["1P 3M 5P 7m 9m 9A"],
    "7b9b13": ["1P 3M 5P 7m 9m 13m"],
    "7b9b13#11": ["1P 3M 5P 7m 9m 11A 13m", ["7b9#11b13", "7b5b9b13"]],
    "7no5": ["1P 3M 7m"],
    "7sus4": ["1P 4P 5P 7m", ["7sus"]],
    "7sus4b9": ["1P 4P 5P 7m 9m", ["susb9", "7susb9", "7b9sus", "7b9sus4", "phryg"]],
    "7sus4b9b13": ["1P 4P 5P 7m 9m 13m", ["7b9b13sus4"]],
    "9#11": ["1P 3M 5P 7m 9M 11A", ["9+4", "9#4", "9#11_", "9#4_"]],
    "9#11b13": ["1P 3M 5P 7m 9M 11A 13m", ["9b5b13"]],
    "9#5": ["1P 3M 5A 7m 9M", ["9+"]],
    "9#5#11": ["1P 3M 5A 7m 9M 11A"],
    "9b13": ["1P 3M 7m 9M 13m"],
    "9b5": ["1P 3M 5d 7m 9M"],
    "9no5": ["1P 3M 7m 9M"],
    "9sus4": ["1P 4P 5P 7m 9M", ["9sus"]],
    m: ["1P 3m 5P"],
    "m#5": ["1P 3m 5A", ["m+", "mb6"]],
    m11: ["1P 3m 5P 7m 9M 11P", ["_11"]],
    "m11A 5": ["1P 3m 6m 7m 9M 11P"],
    m11b5: ["1P 3m 7m 12d 2M 4P", ["h11", "_11b5"]],
    m13: ["1P 3m 5P 7m 9M 11P 13M", ["_13"]],
    m6: ["1P 3m 4P 5P 13M", ["_6"]],
    m69: ["1P 3m 5P 6M 9M", ["_69"]],
    m7: ["1P 3m 5P 7m", ["minor7", "_", "_7"]],
    "m7#5": ["1P 3m 6m 7m"],
    m7add11: ["1P 3m 5P 7m 11P", ["m7add4"]],
    m7b5: ["1P 3m 5d 7m", ["half-diminished", "h7", "_7b5"]],
    m9: ["1P 3m 5P 7m 9M", ["_9"]],
    "m9#5": ["1P 3m 6m 7m 9M"],
    m9b5: ["1P 3m 7m 12d 2M", ["h9", "-9b5"]],
    mMaj7: ["1P 3m 5P 7M", ["mM7", "_M7"]],
    mMaj7b6: ["1P 3m 5P 6m 7M", ["mM7b6"]],
    mM9: ["1P 3m 5P 7M 9M", ["mMaj9", "-M9"]],
    mM9b6: ["1P 3m 5P 6m 7M 9M", ["mMaj9b6"]],
    mb6M7: ["1P 3m 6m 7M"],
    mb6b9: ["1P 3m 6m 9m"],
    o: ["1P 3m 5d", ["mb5", "dim"]],
    o7: ["1P 3m 5d 13M", ["diminished", "m6b5", "dim7"]],
    o7M7: ["1P 3m 5d 6M 7M"],
    oM7: ["1P 3m 5d 7M"],
    sus24: ["1P 2M 4P 5P", ["sus4add9"]],
    "+add#9": ["1P 3M 5A 9A"],
    madd4: ["1P 3m 4P 5P"],
    madd9: ["1P 3m 5P 9M"]
  },
      tt = function tt(n) {
    return Y(n) || Sn(n) || 0;
  },
      rt = function rt(n) {
    return parseInt(A(n), 2);
  },
      et = function et(n) {
    return n.replace(/0/g, "").length;
  },
      mt = null,
      it = /^[01]{12}$/,
      ut = "1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M".split(" "),
      ot = Object.freeze({
    chroma: A,
    chromas: g,
    modes: y,
    isChroma: j,
    intervals: O,
    isEqual: x,
    isSubsetOf: _,
    isSupersetOf: q,
    includes: z,
    filter: k
  }),
      Pt = function Pt(n) {
    var t = Object.keys(n).sort(),
        r = [],
        e = [],
        m = function m(n, t, _m) {
      r[n] = t, e[_m] = e[_m] || [], e[_m].push(n);
    };

    t.forEach(function (t) {
      var r = n[t][0].split(" "),
          e = n[t][1],
          i = A(r);
      m(t, r, i), e && e.forEach(function (n) {
        return m(n, r, i);
      });
    });

    var i = Object.keys(r).sort(),
        u = function u(n) {
      return r[n];
    };

    return u.names = function (n) {
      return "string" == typeof n ? (e[n] || []).slice() : (!0 === n ? i : t).slice();
    }, u;
  },
      Mt = function Mt(n, t) {
    var r = function r(_r) {
      return n(_r) || t(_r);
    };

    return r.names = function (r) {
      return n.names(r).concat(t.names(r));
    }, r;
  },
      at = Pt(Zn),
      lt = Pt(nt),
      ct = Mt(at, lt),
      st = Object.freeze({
    dictionary: Pt,
    combine: Mt,
    scale: at,
    chord: lt,
    pcset: ct
  }),
      ft = Object.freeze({
    name: null,
    intervals: [],
    names: [],
    chroma: null,
    setnum: null
  }),
      dt = function (n, t) {
    return function (r) {
      return t[r] || (t[r] = n(r));
    };
  }(function (n) {
    var t = at(n);
    if (!t) return ft;
    var r = {
      intervals: t,
      name: n
    };
    return r.chroma = A(t), r.setnum = parseInt(r.chroma, 2), r.names = at.names(r.chroma), Object.freeze(r);
  }, {}),
      pt = at.names,
      bt = function bt(n) {
    var t = D(n);
    return dt(t[1]).intervals;
  },
      ht = function ht(n) {
    var t = bt(n),
        r = w(n);
    return y(t).map(function (n, e) {
      var m = at.names(n)[0];
      if (m) return [r[e] || t[e], m];
    }).filter(function (n) {
      return n;
    });
  },
      vt = function vt(n) {
    var t = _(bt(n));

    return lt.names().filter(function (n) {
      return t(lt(n));
    });
  },
      At = function At(n) {
    var t = an(n.map(R));
    if (!t.length) return t;
    var r = t[0],
        e = P(t);
    return u(e.indexOf(r), e);
  },
      gt = function gt(n) {
    if (!bt(n).length) return [];
    var t = q(bt(n));
    return at.names().filter(function (n) {
      return t(at(n));
    });
  },
      yt = function yt(n) {
    var t = _(bt(n));

    return at.names().filter(function (n) {
      return t(at(n));
    });
  },
      jt = Object.freeze({
    props: dt,
    names: pt,
    intervals: bt,
    notes: w,
    exists: S,
    tokenize: D,
    modeNames: ht,
    chords: vt,
    toScale: At,
    supersets: gt,
    subsets: yt
  }),
      Ot = lt.names,
      xt = Object.freeze({
    name: null,
    names: [],
    intervals: [],
    chroma: null,
    setnum: null
  }),
      _t = function (n, t) {
    return void 0 === t && (t = {}), function (r) {
      return t[r] || (t[r] = n(r));
    };
  }(function (n) {
    var t = lt(n);
    if (!t) return xt;
    var r = {
      intervals: t,
      name: n
    };
    return r.chroma = A(t), r.setnum = parseInt(r.chroma, 2), r.names = lt.names(r.chroma), r;
  }),
      qt = function qt(n) {
    return _t(C(n)[1]).intervals;
  },
      zt = function zt(n) {
    return void 0 !== lt(C(n)[1]);
  },
      kt = function kt(n) {
    if (!qt(n).length) return [];
    var t = q(qt(n));
    return lt.names().filter(function (n) {
      return t(lt(n));
    });
  },
      wt = function wt(n) {
    var t = _(qt(n));

    return lt.names().filter(function (n) {
      return t(lt(n));
    });
  },
      St = /^(6|64|7|9|11|13)$/,
      Dt = Object.freeze({
    names: Ot,
    props: _t,
    intervals: qt,
    notes: E,
    exists: zt,
    supersets: kt,
    subsets: wt,
    tokenize: C
  }),
      Et = l,
      Ct = h,
      Tt = L,
      $t = H,
      Ft = K,
      Gt = lt,
      It = at;

  n.Array = fn, n.Note = Mn, n.Interval = In, n.Distance = Yn, n.Scale = jt, n.Chord = Dt, n.PcSet = ot, n.Dictionary = st, n.transpose = Et, n.interval = Ct, n.note = Tt, n.midi = $t, n.freq = Ft, n.chord = Gt, n.scale = It, Object.defineProperty(n, "__esModule", {
    value: !0
  });
});
},{}],"js/dizionario.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dizionario = void 0;
var dizionario = {
  "Cmaj7": ["C", "E", "G", "B"],
  //majors
  "C#maj7": ["C#", "F", "G#", "C"],
  "Dmaj7": ["D", "F#", "A", "C#"],
  "D#maj7": ["D#", "G", "A#", "D"],
  "Emaj7": ["E", "G#", "B", "D#"],
  "Fmaj7": ["F", "A", "C", "E"],
  "F#maj7": ["F#", "A#", "C#", "F"],
  "Gmaj7": ["G", "B", "D", "F#"],
  "G#maj7": ["G#", "C", "D#", "G"],
  "Amaj7": ["A", "C#", "E", "G#"],
  "A#maj7": ["A#", "D", "F", "A"],
  "Bmaj7": ["B", "D#", "F#", "A#"],
  "Cm7": ["C", "D#", "G", "A#"],
  //minors
  "C#m7": ["C#", "E", "G#", "B"],
  "Dm7": ["D", "F", "A", "C"],
  "D#m7": ["D#", "F#", "A#", "C#"],
  "Em7": ["E", "G", "B", "D"],
  "Fm7": ["F", "G#", "C", "D#"],
  "F#m7": ["F#", "A", "C#", "E"],
  "Gm7": ["G", "A#", "D", "F"],
  "G#m7": ["G#", "B", "D#", "F#"],
  "Am7": ["A", "C", "E", "G"],
  "A#m7": ["A#", "C#", "F", "G#"],
  "Bm7": ["B", "D", "F#", "A"],
  "C7": ["C", "E", "G", "A#"],
  //dominant 7th
  "C#7": ["C#", "F", "G#", "B"],
  "D7": ["D", "F#", "A", "C"],
  "D#7": ["D#", "G", "A#", "C#"],
  "E7": ["E", "G#", "B", "D"],
  "F7": ["F", "A", "C", "D#"],
  "F#7": ["F#", "A#", "C#", "E"],
  "G7": ["G", "B", "D", "F"],
  "G#7": ["G#", "C", "D#", "F#"],
  "A7": ["A", "C#", "E", "G"],
  "A#7": ["A#", "D", "F", "G#"],
  "B7": ["B", "D#", "F#", "A"],
  "Csemi": ["C", "D#", "F#", "A#"],
  //semidiminished
  "C#semi": ["C", "E", "G", "B"],
  "Dsemi": ["D", "F", "G#", "C"],
  "D#semi": ["D#", "F#", "A", "C#"],
  "Esemi": ["E", "G", "A#", "D"],
  "Fsemi": ["F", "G#", "B", "D#"],
  "F#semi": ["F#", "A", "C", "E"],
  "Gsemi": ["G", "A#", "C#", "F"],
  "G#semi": ["G#", "B", "D", "F#"],
  "Asemi": ["A", "C", "D#", "G"],
  "A#semi": ["A#", "C#", "E", "G#"],
  "Bsemi": ["B", "D", "F", "A"]
};
exports.dizionario = dizionario;
},{}],"js/Keyboard_JS.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scale_maj = void 0;

var _index = require("./tonal/extensions/detect/index.js");

var _tonal = require("./tonal");

var _canvas = require("./canvas.js");

var _canvas_progression = require("./canvas_progression.js");

var _circleFifth = require("./circleFifth.js");

var _dizionario = require("./dizionario.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//AGGIORNAMENTO: ALLO STATO ATTUALE IL CODICE FUNZIONA ANCHE CON UNA TASTIERA MIDI, TESTATO E FUNZIONANTE
var key = "q2w3er5t6y7uzsxdcvgbhnjm";
var midi;
var c = new AudioContext();
var analyser = c.createAnalyser();
var volume_master = c.createGain();
volume_master.connect(c.destination);
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
var gain_vec = [];
var chord_; //VARIABILE CHE IDENTIFICA UN SINGOLO ACCORDO E CHE VIENE SOVRASCRITTA OGNI VOLTA

var chords_vec = []; //VETTORE DI ACCORDI

var midi_vec = []; //VETTORE DI NUMERI MIDI (PER GESTIRE I RIVOLTI)

var note_vec = []; //VETTORE DI NOTE (PER IL RICONOSCIMENTO DELL'ACCORDO)

var collect_note = [[]]; //VETTORE CONTENTE VETTORI DI NOTE

var collect_midi = [[]]; //VETTORE CONTENENTE VETTORI DI NUMERI MIDI (IDEA PER LOOP MAYBE)

var i = 0;
var counter = new Array(_circleFifth.circle.length).fill(0);
var octave_step = 0;
var color_chord = [];
var maj_scale = [2, 2, 1, 2, 2, 2, 1];
var scale_maj = [];
exports.scale_maj = scale_maj;
var chromatic_scale = ["C", "Db/C#", "D", "Eb", "E", "F", "Gb/F#", "G", "Ab", "A", "Bb", "B"];
var change_scale = 0; //--------------FUNCTION FOR THE DICTIONARY---------------------------------------------------------------------//

var canvas3 = document.querySelector("#canvas3");
var context = canvas3.getContext("2d");

//var getKey = (obj,val) => Object.keys(obj).find(key => obj[key].length === val.length && obj[key].every((kn) => val.includes(kn)));
function getKey(obj, arr) {
  // Grab the key from the first object that satisfies the condition...
  var _Object$entries$find = Object.entries(obj).find(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        notes = _ref2[1];

    // ...that all the notes in the object are included in the
    // array that was passed in. As long as the notes array and the
    // query array are the same length, the notes can be in any order
    return arr.length === notes.length && arr.every(function (note) {
      return notes.includes(note);
    });
  }),
      _Object$entries$find2 = _slicedToArray(_Object$entries$find, 1),
      key = _Object$entries$find2[0]; // Return that key


  return key;
} //console.log(dict["Dmaj7"])
//console.log(getKey(dict,["C","E","G","B"]));
//------------------------------------------------------------------------------------------------------------------//


function render(vec, key) {
  //console.log(key);
  var y = document.getElementsByClassName("Key");
  var x = document.getElementsByClassName("chord");
  x[i].innerHTML = vec[i];
  x[i].style.color = "#14fdce";
  x[i].style.textAlign = "center";
  x[i].style.top = "50px";
  x[i].style.fontWeight = "900";
  x[i].style.verticalAlign = 'middle';
  x[i].style.fontFamily = 'Prompt';

  if (chords_vec.length == 4) {
    y[0].innerHTML = key;
    y[0].style.color = "#14fdce";
    y[0].style.textAlign = "center";
    y[0].style.top = "50px";
    y[0].style.fontWeight = "900";
    y[0].style.verticalAlign = 'middle';
    y[0].style.fontFamily = 'Prompt';
  }

  note_vec = [];
  midi_vec = [];
  chord_ = null;
  i = i + 1;
} //FUNZIONE DI TIMEOUT SE NON VIENE PREMUTA SUBITO UN'ALTRA NOTA------------------------//


function timeOut() {
  note_vec = [];
  midi_vec = [];
} //-----------------------FUNZIONE MOSTRA TASTI DELLA TASTIERA-----------------------//


document.getElementById("button").onclick = function () {
  for (var i = 0; i < key.length; i++) {
    document.getElementsByClassName("keyboard")[i].classList.toggle("keyboard_grey");
  }
}; //--------------------------VOLUME MASTER HANDLER---------------------------------//


document.getElementById("slider").addEventListener("input", changeVol);

function changeVol() {
  volume_master.gain.value = parseFloat(document.getElementById("slider").value);
  console.log(volume_master.gain.value);
} //-------------------------FUNZIONE DI RESET--------------------------------------//


document.getElementById("reset").onclick = function () {
  for (var j = 0; j < chords_vec.length; j++) {
    var x = document.getElementsByClassName("chord");
    x[j].innerHTML = "";
  }

  document.getElementsByClassName("Key")[0].innerHTML = "";
  i = 0;
  chords_vec = [];
  counter.fill(0);
  console.log(chords_vec);
  color_chord = [];

  _canvas.ctx.clearRect(0, 0, _canvas.canvas.width, _canvas.canvas.height);

  _canvas_progression.ctx.clearRect(0, 0, _canvas_progression.canvas.width, _canvas_progression.canvas.height);

  (0, _canvas_progression.reset_canvas2)();
  exports.scale_maj = scale_maj = [];
}; //console.log($("#highlight").position().left/ $("#highlight").parent().width() * 100);
//----------------------------OCTAVE CHANGES....................................//


$(document).ready(function () {
  $('#min_oct').click(function () {
    octave_step = octave_step - 12;

    if (octave_step < -36) {
      //controllo che impedisce l'aumento dell'ottava anche se il riquadro sta fermo
      octave_step = -36;
    }

    console.log(octave_step);

    switch (octave_step) {
      case 12:
        document.getElementById("C-first").innerHTML = "C5";
        document.getElementById("C-second").innerHTML = "C6";
        break;

      case 0:
        document.getElementById("C-first").innerHTML = "C4";
        document.getElementById("C-second").innerHTML = "C5";
        break;

      case -12:
        document.getElementById("C-first").innerHTML = "C3";
        document.getElementById("C-second").innerHTML = "C4";
        break;

      case -24:
        document.getElementById("C-first").innerHTML = "C2";
        document.getElementById("C-second").innerHTML = "C3";
        break;

      case -36:
        document.getElementById("C-first").innerHTML = "C1";
        document.getElementById("C-second").innerHTML = "C2";
        break;
    }

    var containerWidth = $(".mini_keyboard").width();
    var left = parseFloat($('.highlighted').css('left')); //console.log(left);

    var step = containerWidth * 0.145;

    if (left < step) {
      $('.highlighted').css('left', left);
    } else {
      left = left - step;
      $('.highlighted').css('left', left);
    }
  });
});
$(document).ready(function () {
  $('#plus_oct').click(function () {
    if (octave_step == 24) {
      //controllo che impedisce l'aumento dell'ottava anche se il riquadro sta fermo
      octave_step = octave_step - 12;
    }

    octave_step = octave_step + 12;
    console.log(octave_step);

    switch (octave_step) {
      case 0:
        document.getElementById("C-first").innerHTML = "C4";
        document.getElementById("C-second").innerHTML = "C5";
        break;

      case 12:
        document.getElementById("C-first").innerHTML = "C5";
        document.getElementById("C-second").innerHTML = "C6";
        break;

      case 24:
        document.getElementById("C-first").innerHTML = "C6";
        document.getElementById("C-second").innerHTML = "C7";
        break;

      case -24:
        document.getElementById("C-first").innerHTML = "C2";
        document.getElementById("C-second").innerHTML = "C3";
        break;

      case -12:
        document.getElementById("C-first").innerHTML = "C3";
        document.getElementById("C-second").innerHTML = "C4";
        break;
    }

    var containerWidth = $(".mini_keyboard").width();
    var left = parseFloat($('.highlighted').css('left')); //  console.log(left);

    var step = containerWidth * 0.145;

    if (left > containerWidth - 2 * step) {
      $('.highlighted').css('left', left);
    } else {
      left = left + step;
      $('.highlighted').css('left', left);
    }
  });
}); //--------------------------------------------------------------------------------//

document.onkeydown = function (e) {
  if (!e.repeat) {
    //  console.log("Hai premuto", key.indexOf(e.key) )
    var keypressed = key.indexOf(e.key); //  console.log(keypressed)

    document.getElementById(keypressed).classList.toggle("clicked");
    playNote(Math.pow(2, (keypressed - 9 + octave_step) / 12) * 440, 144);
    setTimeout(timeOut, 2000);
    var midi_num = [keypressed + octave_step + 60];
    detect_chord(midi_num);
  }
}; // -45,-33,-21,-9,3,15,27


document.onkeyup = function (e) {
  if (!e.repeat) {
    //    console.log("Hai rilasciato", key.indexOf(e.key) )
    var keypressed = key.indexOf(e.key);
    document.getElementById(keypressed).classList.toggle("clicked");
    playNote(Math.pow(2, (keypressed - 9 + octave_step) / 12) * 440, 128);
  }
}; //GESTIONE TASTIERA MOUSECLICK
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
  playNote(Math.pow(2, (id - 9 + octave_step) / 12) * 440, 144);
}

function clickOffRect(data) {
  //console.log(data)
  var id = data.path[0].id;
  document.getElementById(id).classList.toggle("clicked");
  playNote(Math.pow(2, (id - 9 + octave_step) / 12) * 440, 128);
} //GESTIONE MIDI IN INGRESSO


if (navigator.requestMIDIAccess) {
  console.log('This browser supports WebMIDI!');
  navigator.requestMIDIAccess().then(onMIDISuccess);
} else {
  console.log('WebMIDI is not supported in this browser.');
}

function onMIDISuccess(midiAccess) {
  midi = midiAccess; //  console.log(midi.inputs)

  var allInputs = midi.inputs.values(); //loop attorno a tutti gli input per trovare qualsiasi MIDI input

  for (var input = allInputs.next(); input && !input.done; input = allInputs.next()) {
    // Quando ricevo un MIDI chiamo la funzione onMIDIMessage
    input.value.onmidimessage = getMIDImessage;
  }
}

function getMIDImessage(midiMessage) {
  var on_off = midiMessage.data[0];
  var midi_number = midiMessage.data[1];
  console.log(midi_number); //console.log(on_off);

  var f = Math.pow(2, (midi_number - 69) / 12) * 440;
  document.getElementById(midi_number - 60 - octave_step).classList.toggle("clicked");
  playNote(f, on_off);
  setTimeout(timeOut, 2000);

  if (on_off == 144) {
    detect_chord(midi_number);
  } else {//midi_vec=[];
  }
}

function playNote(freq, on_off) {
  switch (on_off) {
    case 144:
      var o = c.createOscillator();
      var g = c.createGain();
      o.type = "triangle";
      o.connect(g);
      g.connect(volume_master);
      volume_master.connect(analyser);
      o.frequency.value = freq;
      g.gain.value = 0; //g.gain.setValueAtTime(0, c.currentTime);

      g.gain.linearRampToValueAtTime(1, c.currentTime + 0.5); //Problematica: se il testo viene premuto e rilasciato subito, il suono continua all'infinito. AGGIUSTARE QUEST'ASPETTO

      g.gain.linearRampToValueAtTime(0.6, c.currentTime + 0.4);
      o.start();
      gain_vec[freq] = g;
      drawSamples();
      break;

    case 128:
      releaseNote(freq);
      break;
  }
}

function releaseNote(f) {
  gain_vec[f].gain.linearRampToValueAtTime(0, c.currentTime + 0.5);
} //-------------DETECTION CHORD FUNCTION-----------------//


function detect_chord(midi_num) {
  midi_vec.push(midi_num);
  note_vec.push(_tonal.Note.pc(_tonal.Note.fromMidi(midi_num, true))); //  console.log(note_vec);

  if (note_vec.length == 4 && midi_vec.length == 4 && chords_vec.length < 4) {
    collect_midi.push(midi_vec); //  console.log(collect_midi);

    collect_note.push(note_vec);
    var min_midi = Math.min.apply(Math, midi_vec);

    var bass_note = _tonal.Note.fromMidi(min_midi);

    var accordo = getKey(_dizionario.dizionario, note_vec);
    chord_ = getKey(_dizionario.dizionario, note_vec) + "/" + bass_note;
    chords_vec.push(chord_);
    find_indexes(accordo);
    (0, _canvas.blink)(color_chord);
    var chiave = (0, _circleFifth.findKey)(accordo, counter, chords_vec);
    console.log(chiave);
    render(chords_vec, chiave); //VISUALIZZA SULLO SCHERMO

    scale(chiave);
    console.log(chords_vec);
  }
}

function find_indexes(chord) {
  for (var i = 0; i < _circleFifth.circle.length; i++) {
    for (var j = 0; j < _circleFifth.circle[i].length; j++) {
      if (_circleFifth.circle[i][j] == chord) {
        color_chord.push([i, j, 0]); //       console.log("found " + chord + " at (" + i + ", " + j + ")");
      }
    }
  }

  console.log("color chord", color_chord);
}

function scale(key_arr) {
  var appoggio;

  for (var j = 0; j < key_arr.length; j++) {
    var arr = [];
    var index_maj = chromatic_scale.indexOf(key_arr[j]);

    if (chromatic_scale[index_maj].includes("#")) {
      appoggio = chromatic_scale[index_maj].replace("/", "_");
      arr.push(appoggio.replace("#", "sharp"));
    } else {
      arr.push(chromatic_scale[index_maj]);
    }

    for (i = 0; i < maj_scale.length; i++) {
      index_maj = index_maj + maj_scale[i];

      if (index_maj >= chromatic_scale.length) {
        index_maj = index_maj % chromatic_scale.length;
      }

      console.log(index_maj);

      if (chromatic_scale[index_maj].includes("#")) {
        appoggio = chromatic_scale[index_maj].replace("/", "_");
        arr.push(appoggio.replace("#", "sharp"));
      } else {
        arr.push(chromatic_scale[index_maj]);
      }
    }

    scale_maj.push(arr);
    console.log(scale_maj);
    arr = []; //    console.log(scale_min);
  }

  for (var i = 0; i < scale_maj[change_scale].length; i++) {
    $("#" + scale_maj[change_scale][i]).css("visibility", "visible");
  }

  console.log(scale_maj);
}

function drawSamples() {
  analyser.getByteFrequencyData(dataArray);
  context.clearRect(0, 0, canvas3.width, canvas3.height);
  context.beginPath();

  for (var i = 0; i < canvas3.width; i++) {
    context.lineTo(dataArray[i], i);
  }

  context.stroke();
  context.strokeStyle = "white";
  requestAnimationFrame(drawSamples);
}
},{"./tonal/extensions/detect/index.js":"js/tonal/extensions/detect/index.js","./tonal":"js/tonal/dist/tonal.min.js","./canvas.js":"js/canvas.js","./canvas_progression.js":"js/canvas_progression.js","./circleFifth.js":"js/circleFifth.js","./dizionario.js":"js/dizionario.js"}],"js/circleFifth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findKey = findKey;
exports.cancel_degrees = cancel_degrees;
exports.flag = exports.degree = exports.key_ = exports.circle = void 0;

var _canvas = require("./canvas.js");

var _canvas_progression = require("./canvas_progression.js");

var _Keyboard_JS = require("./Keyboard_JS.js");

var circle = [];
exports.circle = circle;
circle.push(["Fmaj7", "Cmaj7", "G7", "Dm7", "Am7", "Em7", "Bsemi"]);
circle.push(["Cmaj7", "Gmaj7", "D7", "Am7", "Em7", "Bm7", "F#semi"]);
circle.push(["Gmaj7", "Dmaj7", "A7", "Em7", "Bm7", "F#m7", "C#semi"]);
circle.push(["Dmaj7", "Amaj7", "E7", "Bm7", "F#m7", "C#m7", "G#semi"]);
circle.push(["Amaj7", "Emaj7", "B7", "F#m7", "C#m7", "G#m7", "D#semi"]);
circle.push(["Emaj7", "Bmaj7", "F#7", "C#m7", "G#m7", "D#m7", "A#semi"]);
circle.push(["Bmaj7", "F#maj7", "C#7", "G#m7", "D#m7", "A#m7", "Fsemi"]);
circle.push(["F#maj7", "C#maj7", "G#7", "D#m7", "A#m7", "Fm7", "Csemi"]);
circle.push(["C#maj7", "G#maj7", "D#7", "A#m7", "Fm7", "Cm7", "Gsemi"]);
circle.push(["G#maj7", "D#maj7", "A#7", "Fm7", "Cm7", "Gm7", "Dsemi"]);
circle.push(["D#maj7", "A#maj7", "F7", "Cm7", "Gm7", "Dm7", "Asemi"]);
circle.push(["A#maj7", "Fmaj7", "C7", "Gm7", "Dm7", "Am7", "Esemi"]);
var key_ = ["C", "G", "D", "A", "E", "B", "Gb/F#", "Db/C#", "Ab", "Eb", "Bb", "F"];
exports.key_ = key_;
var degree = [];
exports.degree = degree;
var i = 0;
var end = 0;
var count;
var flag = false;
exports.flag = flag;
var change_scale = 0;
var array_app = [];
var ciao = true;
$(document).ready(function () {
  $('#tonalità').prop('disabled', true);
});

function findKey(c, vec1, vec2) {
  for (var i = 0; i < circle.length; i++) {
    if (circle[i].includes(c)) vec1[i]++;
  }

  var vec_max = Math.max.apply(Math, vec1);
  console.log("vec_max ", vec_max);

  if (vec2.length == 4) {
    var indexes = [],
        j = -1;
    var key_found = [];

    while ((j = vec1.indexOf(vec_max, j + 1)) != -1) {
      //va a cercare nel vettore counter tutte le occorrenze dei valori massimi
      indexes.push(j);
    } //console.log("indici",indexes);


    for (var k = 0; k < indexes.length; k++) {
      var index = indexes[k];
      key_found.push(key_[index]); //ci potrebbero essere molteplici tonalità
    }

    find_degrees(_canvas.stato, indexes);
    $('#tonalità').prop('disabled', true);

    if (indexes.length > 1) {
      exports.flag = flag = true; //alert("Trovata più di una tonalità! Premere sul tasto per visualizzare i diversi percorsi");

      count = degree.length / indexes.length;
      split_array();
      return key_found;
    }

    (0, _canvas_progression.show_progression)(degree, degree[0]);
    return key_found;
  }
}

function find_degrees(state, indexes) {
  for (var i = 0; i < indexes.length; i++) {
    for (var j = 0; j < state.xy.length; j++) {
      if (indexes[i] == state.xy[j][1]) {
        degree.push(state.xy[j][0]);
      }
    }
  }

  console.log("modi", degree);
}

function split_array() {
  if (end < degree.length) {
    $('#tonalità').prop('disabled', true);
    end = end + count;
    var shallow = degree.slice(i, end);
    i = i + count;
    (0, _canvas_progression.show_progression)(shallow, shallow[0]);
  } else {
    i = 0;
    end = 0;
  }
}

$(document).ready(function () {
  $("#tonalità").click(function () {
    for (var i = 0; i < _Keyboard_JS.scale_maj[change_scale].length; i++) {
      array_app = _Keyboard_JS.scale_maj[change_scale][i];
      $("#" + array_app).css("visibility", "hidden");
      array_app = [];
    }

    if (change_scale === _Keyboard_JS.scale_maj.length - 1) {
      change_scale = 0;
      array_app = [];
      (0, _canvas_progression.change_progression)();
      split_array();
    } else {
      change_scale++;
      array_app = [];
    } //    if(ciao===true){


    for (var i = 0; i < _Keyboard_JS.scale_maj[change_scale].length; i++) {
      array_app = _Keyboard_JS.scale_maj[change_scale][i];
      $("#" + array_app).css("visibility", "visible");
      array_app = [];
    } //}


    (0, _canvas_progression.change_progression)();
    split_array();
  });
});

function cancel_degrees() {
  (0, _canvas.cancel_stato)();
  exports.degree = degree = [];

  for (var i = 0; i < _Keyboard_JS.scale_maj[change_scale].length; i++) {
    array_app = _Keyboard_JS.scale_maj[change_scale][i];
    $("#" + array_app).css("visibility", "hidden");
  }

  array_app = [];
}
},{"./canvas.js":"js/canvas.js","./canvas_progression.js":"js/canvas_progression.js","./Keyboard_JS.js":"js/Keyboard_JS.js"}],"js/canvas_progression.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.show_progression = show_progression;
exports.reset_canvas2 = reset_canvas2;
exports.change_progression = change_progression;
exports.k = exports.invert_sign = exports.velocity = exports.difference = exports.yf = exports.xf = exports.y0 = exports.ctx = exports.canvas = void 0;

var _circleFifth = require("./circleFifth.js");

var canvas = document.querySelector("#canvas2");
exports.canvas = canvas;
var ctx = canvas.getContext("2d");
exports.ctx = ctx;
var stepx = canvas.width / 2;
var stepy = canvas.height / 7; //1-3-5-7-9-11-13

var y0 = 0;
exports.y0 = y0;
var x0 = stepx;
var xf, yf;
exports.yf = yf;
exports.xf = xf;
var t = 0;
var angle = Math.PI / 3;
var g = 9.8;
var difference = [];
exports.difference = difference;
var velocity = [];
exports.velocity = velocity;
var invert_sign = [];
exports.invert_sign = invert_sign;
var k = 0;
exports.k = k;
var radius = 10;
var ciao = true;
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
*/
//OLD VERSION

/*function drawBorder(xPos, yPos, width, height, thickness)
{
   ctx.beginPath();

  ctx.fillStyle='#FF4500';
  ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
}*/
//FUNZIONE TROVATA SU STACKOVERFLOW CHE DISEGNAVA DEI BORDI PER I RECT CHE FORMAVANO LA LINEA

function show_square(Ypos) {
  if (Ypos >= 0 && Ypos < stepy) {
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.rect(stepx - 70 / 2, 0, 70, stepy);
    ctx.fillStyle = "#E53935";
    ctx.fill();
    ctx.font = "20px Arial";
    ctx.fillText("IV - Lydian", 10, stepy / 2);
  }

  if (Ypos >= stepy && Ypos < stepy * 2) {
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.rect(stepx - 70 / 2, stepy, 70, stepy);
    ctx.fillStyle = "#FFA726";
    ctx.fill();
    ctx.font = "20px Arial";
    ctx.fillText("I - Ionian", 10, 3 * stepy / 2);
  }

  if (Ypos >= stepy * 2 && Ypos < stepy * 3) {
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.rect(stepx - 70 / 2, stepy * 2, 70, stepy);
    ctx.fillStyle = "#FFEB3B";
    ctx.fill();
    ctx.font = "16px Arial";
    ctx.fillText("V - Misolydian", 10, 5 * stepy / 2);
  }

  if (Ypos >= stepy * 3 && Ypos < stepy * 4) {
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.rect(stepx - 70 / 2, stepy * 3, 70, stepy);
    ctx.fillStyle = "#7CB342";
    ctx.fill();
    ctx.font = "20px Arial";
    ctx.fillText("II - Doric", 10, 7 * stepy / 2);
  }

  if (Ypos >= stepy * 4 && Ypos < stepy * 5) {
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.rect(stepx - 70 / 2, stepy * 4, 70, stepy);
    ctx.fillStyle = "#00796B";
    ctx.fill();
    ctx.font = "20px Arial";
    ctx.fillText("VI - Aeolian", 10, 9 * stepy / 2);
  }

  if (Ypos >= stepy * 5 && Ypos < stepy * 6) {
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.rect(stepx - 70 / 2, stepy * 5, 70, stepy);
    ctx.fillStyle = "#0277BD";
    ctx.fill();
    ctx.font = "18px Arial";
    ctx.fillText("III - Phrygian", 10, 11 * stepy / 2);
  }

  if (Ypos >= stepy * 6 && Ypos < canvas.height) {
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.rect(stepx - 70 / 2, stepy * 6, 70, stepy);
    ctx.fillStyle = "#0D47A1";
    ctx.fill();
    ctx.font = "18px Arial";
    ctx.fillText("VII - Locrian", 10, 13 * stepy / 2);
  }
} //FUNZIONE CHE COMANDA L'APPARIZIONE DI UN QUADRATO IN BASE ALLA POSIZIONE RAGGIUNTA DALLA LINEA


function choose_color(Ypos) {
  var color;
  if (Ypos >= 0 && Ypos < stepy) color = '#E53935';
  if (Ypos >= stepy && Ypos < stepy * 2) color = '#FFA726';
  if (Ypos >= stepy * 2 && Ypos < stepy * 3) color = '#FFEB3B';
  if (Ypos >= stepy * 3 && Ypos < stepy * 4) color = '#7CB342';
  if (Ypos >= stepy * 4 && Ypos < stepy * 5) color = '#00796B';
  if (Ypos >= stepy * 5 && Ypos < stepy * 6) color = '#0277BD';
  if (Ypos >= stepy * 6 && Ypos < canvas.height) color = '#0D47A1';
  return color;
} //FUNZIONE CHE COMANDA IL CAMBIO DI COLORE DELLA LINEA IN BASE ALLA SUA POSIZIONE


function choose_position(value) {
  switch (value) {
    case 0:
      exports.y0 = y0 = stepy / 2;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'magenta';
      ctx.stroke();
      ctx.rect(stepx - 70 / 2, 0, 70, stepy);
      ctx.fillStyle = "#E53935";
      ctx.fill();
      ctx.font = "20px Arial";
      ctx.fillText("IV - Lydian", 10, stepy / 2);
      break;

    case 1:
      exports.y0 = y0 = 3 * stepy / 2;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'magenta';
      ctx.stroke();
      ctx.rect(stepx - 70 / 2, stepy, 70, stepy);
      ctx.fillStyle = "#FFA726";
      ctx.fill();
      ctx.font = "20px Arial";
      ctx.fillText("I - Ionian", 10, 3 * stepy / 2);
      break;

    case 2:
      exports.y0 = y0 = 5 * stepy / 2;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'magenta';
      ctx.stroke();
      ctx.rect(stepx - 70 / 2, stepy * 2, 70, stepy);
      ctx.fillStyle = "#FFEB3B";
      ctx.fill();
      ctx.font = "16px Arial";
      ctx.fillText("V - Misolydian", 10, 5 * stepy / 2);
      break;

    case 3:
      exports.y0 = y0 = 7 * stepy / 2;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'magenta';
      ctx.stroke();
      ctx.rect(stepx - 70 / 2, stepy * 3, 70, stepy);
      ctx.fillStyle = "#7CB342";
      ctx.fill();
      ctx.font = "20px Arial";
      ctx.fillText("II - Doric", 10, 7 * stepy / 2);
      break;

    case 4:
      exports.y0 = y0 = 9 * stepy / 2;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'magenta';
      ctx.stroke();
      ctx.rect(stepx - 70 / 2, stepy * 4, 70, stepy);
      ctx.fillStyle = "#00796B";
      ctx.fill();
      ctx.font = "20px Arial";
      ctx.fillText("VI - Aeolian", 10, 9 * stepy / 2);
      console.log('dovrei aver disegnato il quadrato a ', stepx, stepy, y0);
      break;

    case 5:
      exports.y0 = y0 = 11 * stepy / 2;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'magenta';
      ctx.stroke();
      ctx.rect(stepx - 70 / 2, stepy * 5, 70, stepy);
      ctx.fillStyle = "#0277BD";
      ctx.fill();
      ctx.font = "18px Arial";
      ctx.fillText("III - Phrygian", 10, 11 * stepy / 2);
      break;

    case 6:
      exports.y0 = y0 = 13 * stepy / 2;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(stepx, y0, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'magenta';
      ctx.stroke();
      ctx.rect(stepx - 70 / 2, stepy * 6, 70, stepy);
      ctx.fillStyle = "#0D47A1";
      ctx.fill();
      ctx.font = "18px Arial";
      ctx.fillText("VII - Locrian", 10, 13 * stepy / 2);
      break;
  }
} //QUESTA FUNZIONE NON SOLO DECIDE IL PUNTO INIZIALE DA CUI FAR PARTIRE LA LINEA, MA DECIDE ANCHE QUALE QUADRATO FARE APPARIRE PER PRIMO


function choose_velocity(degree) {
  for (var i = 0; i < degree.length - 1; i++) {
    difference.push(Math.abs(degree[i + 1] - degree[i]));

    if (degree[i + 1] - degree[i] >= 0) {
      invert_sign[i] = false;
    } else {
      invert_sign[i] = true;
    } // console.log(difference)

  }

  for (var j = 0; j < difference.length; j++) {
    if (difference[j] === 0) {
      velocity[j] = 0;
    }

    if (difference[j] === 1) {
      velocity[j] = 25;
    }

    if (difference[j] === 2) {
      velocity[j] = 36;
    }

    if (difference[j] === 3) {
      velocity[j] = 44;
    }

    if (difference[j] === 4) {
      velocity[j] = 51;
    }

    if (difference[j] === 5) {
      velocity[j] = 57;
    }

    if (difference[j] === 6) {
      velocity[j] = 62;
    }
  }
} //FUNZIONE CHE GESTISCE IL CAMBIO DI VELOCITA' IN BASE AL MODO, INFATTI LE DISTANZE VENGONO RAGGIUNTE IN BASE ALLE VELOCITA' INIZIALI CHE SONO STATE MAPPATE IN BASE ALLE DIMENSIONI DEL CANVAS


function render_prog(time, value, sign) {
  //FUNZIONE CHE REGOLA IL MOTO PARABOLICO DELLE LINEE
  if (sign == true) {
    //DAL BASSO VERSO L'ALTO
    exports.yf = yf = y0 - velocity[k] * Math.cos(angle) * time;
    exports.xf = xf = -1 / 2 * g * Math.pow(time, 2) + velocity[k] * Math.sin(angle) * time + x0;
  } else {
    //DALL'ALTO VERSO IL BASSO
    exports.yf = yf = y0 + velocity[k] * Math.cos(angle) * time;
    exports.xf = xf = -1 / 2 * g * Math.pow(time, 2) + velocity[k] * Math.sin(angle) * time + x0;
  } //drawBorder(xf, yf, 1, 1,1);


  ctx.beginPath(); //VENGONO DISEGNATI TANTI QUADRATI PICCOLI PER FORMARE LA LINEA

  ctx.rect(xf, yf, 3, 3);
  ctx.fillStyle = choose_color(y0);
  ctx.fill();
  ctx.lineWidth = 0.2; //DISEGNA I BORDI DEI QUADRATINI(RENDE LE LINEE PIù LUMINOSE)

  ctx.strokeStyle = 'white';
  ctx.stroke();
  var tg = 2 * velocity[k] * Math.sin(angle) / g; //TEMPO CHE OGNI LINEA IMPIEGA PER RAGGIUNGERE IL PUNTO D'ARRIVO

  console.log("cappa", k);

  if (time > tg) {
    //CONTROLLO CHE FERMA LA LINEA AL PUNTO FINALE E AGGIORNA IL NUOVO PUNTO INIZIALE CON QUELLO FINALE PRECEDENTE
    exports.k = k = k + 1;
    clearInterval(value);
    t = 0;
    exports.y0 = y0 = yf;
    ctx.fillStyle = choose_color(y0);
    show_square(y0);

    if (k < invert_sign.length) {
      //CONTROLLO CHE PER FORTUNA PUO' ESSERE USATO PER DIRE CHE DEVE ESSERE INIZIALE UN NUOVO PERCORSO
      var clear = setInterval(function () {
        render_prog(t += 0.03, clear, invert_sign[k]);
      }, 0.2);
    } else {
      if (_circleFifth.flag === true) {
        $('#tonalità').prop('disabled', false);
      } //SI ESCE DALLA FUNZIONE E QUINDI IL PERCORSO E' FINITO.


      return;
    }
  }
}

function show_progression(degree_arr, value) {
  //FUNZIONE CHE FA COMINCIARE IL TUTTO
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  choose_position(value); //VIENE SETTATA LA POSIZIONE INIZIALE

  choose_velocity(degree_arr); //VENGONO SETTATE LE VELOCITA'

  var clear = setInterval(function () {
    //TRIGGER INIZIALE DELLA FUNZIONE RENDER
    render_prog(t += 0.03, clear, invert_sign[k]);
  }, 0.2);
}

function reset_canvas2() {
  //FUNZIONE CHE RESETTA IL TUTTO PER RINIZIARE TUTTO DA CAPO
  exports.difference = difference = [];
  exports.velocity = velocity = [];
  exports.invert_sign = invert_sign = [];
  exports.k = k = 0;
  exports.y0 = y0 = 0;
  exports.xf = xf = 0;
  exports.yf = yf = 0;
  $('#tonalità').prop('disabled', true);
  (0, _circleFifth.cancel_degrees)(); //FUNZIONE IMPORTATA PERCHE' NON POSSONO ESSERE SVUOTATI VETTORI IMPORTATI DA ALTRI MODULI, QUINDI QUESTO VIENE FATTO NEL MODULO DI APPARTENENZA (VEDERE GLI IMPORT/EXPORT)
}

function change_progression() {
  exports.difference = difference = [];
  exports.velocity = velocity = [];
  exports.invert_sign = invert_sign = [];
  exports.k = k = 0;
  exports.y0 = y0 = 0;
  exports.xf = xf = 0;
  exports.yf = yf = 0;
}
},{"./circleFifth.js":"js/circleFifth.js"}],"../../../Public/Roaming/nvm/v11.3.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50814" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../Public/Roaming/nvm/v11.3.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/canvas_progression.js"], null)
//# sourceMappingURL=/canvas_progression.14662de1.map