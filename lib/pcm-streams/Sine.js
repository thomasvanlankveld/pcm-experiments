'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Readable = require('stream').Readable;

var Sine = exports.Sine = function (_Readable) {
  _inherits(Sine, _Readable);

  function Sine() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$bitDepth = _ref.bitDepth;
    var bitDepth = _ref$bitDepth === undefined ? 16 : _ref$bitDepth;
    var _ref$channels = _ref.channels;
    var channels = _ref$channels === undefined ? 2 : _ref$channels;
    var _ref$sampleRate = _ref.sampleRate;
    var sampleRate = _ref$sampleRate === undefined ? 44100 : _ref$sampleRate;
    var frequency = _ref.frequency;
    var duration = _ref.duration;

    _classCallCheck(this, Sine);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sine).call(this));

    Object.assign(_this, {
      bitDepth: bitDepth,
      channels: channels,
      sampleRate: sampleRate,
      samplesGenerated: 0,
      frequency: frequency,
      duration: duration
    });
    return _this;
  }

  _createClass(Sine, [{
    key: '_read',
    value: function () {
      function _read(n) {
        var sampleSize = this.bitDepth / 8;
        var blockAlign = sampleSize * this.channels;
        var numSamples = n / blockAlign | 0;
        var buffer = new Buffer(numSamples * blockAlign);
        var amplitude = 32760; // Max amplitude for 16-bit audio
        // var amplitude = Math.pow(2, this.bitDepth) / 2; // Max amplitude for 16-bit audio

        // the "angle" used in the function, adjusted for the number of
        // channels and sample rate. This value is like the period of the wave.
        var t = Math.PI * 2 * this.frequency / this.sampleRate;

        for (var i = 0; i < numSamples; i++) {
          // fill with a simple sine wave at max amplitude
          for (var channel = 0; channel < this.channels; channel++) {
            var s = this.samplesGenerated + i;
            var val = Math.round(amplitude * Math.sin(t * s)); // sine wave
            var offset = i * sampleSize * this.channels + channel * sampleSize;
            buffer['writeInt' + String(this.bitDepth) + 'LE'](val, offset);
          }
        }

        this.push(buffer);

        this.samplesGenerated += numSamples;
        if (this.samplesGenerated >= this.sampleRate * this.duration) {
          // after generating "duration" second of audio, emit "end"
          this.push(null);
        }
      }

      return _read;
    }()
  }]);

  return Sine;
}(Readable);