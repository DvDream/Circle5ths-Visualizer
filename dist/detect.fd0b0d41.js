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
})({"js/tonal/extensions/detect/node_modules/tonal-note/build/es6.js":[function(require,module,exports) {
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
},{"tonal-note":"js/tonal/extensions/detect/node_modules/tonal-note/build/es6.js","tonal-dictionary":"js/tonal/extensions/detect/node_modules/tonal-dictionary/build/es6.js","tonal-array":"js/tonal/extensions/detect/node_modules/tonal-array/build/es6.js","tonal-pcset":"js/tonal/extensions/detect/node_modules/tonal-pcset/build/es6.js"}],"../../../Public/Roaming/nvm/v11.3.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../../../Public/Roaming/nvm/v11.3.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/tonal/extensions/detect/index.js"], null)
//# sourceMappingURL=/detect.fd0b0d41.map