import InvalidBitDepthError from './InvalidBitDepthError';
import { Readable } from 'stream';

export default class Square extends Readable {
  constructor({ bitDepth = 16, channels = 2, sampleRate = 44100, frequency, duration } = {}) {
    if (bitDepth !== 16 && bitDepth !== 32) throw new InvalidBitDepthError(`bitDepth must be 16 or 32, got ${bitDepth}`);
    if (!frequency) throw new ReferenceError('frequency is not defined');
    if (!duration) throw new ReferenceError('duration is not defined');
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
    var buffer = Buffer.alloc(numSamples * blockAlign);
    var maxAmplitude = (Math.pow(2, this.bitDepth) / 2) - 1; // Max amplitude

    // This value is like the period of the wave.
    var t = this.sampleRate/ this.frequency;

    for (var i = 0; i < numSamples; i++) {
      // fill with a simple square wave at max amplitude
      var s = this.samplesGenerated + i;
      const isHigh = (s % t) <= (t / 2);
      var val = isHigh ? maxAmplitude : -maxAmplitude; // sine wave

      for (var channel = 0; channel < this.channels; channel++) {
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
