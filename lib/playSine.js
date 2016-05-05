'use strict';

var _pcmStreams = require('./pcm-streams');

var _speaker = require('speaker');

var _speaker2 = _interopRequireDefault(_speaker);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// console.log(`ohai ${process.argv[2]}`);

var sine = new _pcmStreams.Sine({
  frequency: process.argv[2] || 440.0,
  duration: process.argv[3] || 2.0
});

var writeStream = _fs2['default'].createWriteStream('./files/sine.pcm-streams');

sine.pipe(new _speaker2['default']());
sine.pipe(writeStream);