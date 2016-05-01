const Readable = require('stream').Readable;
const Speaker = require('speaker');
const fs = require('fs');

// console.log(`ohai ${process.argv[2]}`);


class SineReadable extends Readable {
  constructor({ bitDepth = 16, channels = 2, sampleRate = 44100, frequency, duration } = {}) {
    super();
    Object.assign(this, {
      bitDepth,
      channels,
      sampleRate,
      samplesGenerated: 0,
      frequency,
      duration,
    });
  }

  _read(n) {
    var sampleSize = this.bitDepth / 8;
    var blockAlign = sampleSize * this.channels;
    var numSamples = n / blockAlign | 0;
    var buffer = new Buffer(numSamples * blockAlign);
    var amplitude = 32760; // Max amplitude for 16-bit audio
    // var amplitude = Math.pow(2, this.bitDepth) / 2; // Max amplitude for 16-bit audio

    // the "angle" used in the function, adjusted for the number of
    // channels and sample rate. This value is like the period of the wave.
    var t = (Math.PI * 2 * this.frequency) / this.sampleRate;

    for (var i = 0; i < numSamples; i++) {
      // fill with a simple sine wave at max amplitude
      for (var channel = 0; channel < this.channels; channel++) {
        var s = this.samplesGenerated + i;
        var val = Math.round(amplitude * Math.sin(t * s)); // sine wave
        var offset = (i * sampleSize * this.channels) + (channel * sampleSize);
        buffer[`writeInt${this.bitDepth}LE`](val, offset);
      }
    }

    this.push(buffer);

    this.samplesGenerated += numSamples;
    if (this.samplesGenerated >= this.sampleRate * this.duration) {
      // after generating "duration" second of audio, emit "end"
      this.push(null);
    }
  }
}

const sine = new SineReadable({
  frequency: process.argv[2] || 440.0,
  duration: process.argv[3] || 2.0,
});

const writeStream = fs.createWriteStream('./files/sine.pcm');

sine.pipe(new Speaker());
sine.pipe(writeStream);
