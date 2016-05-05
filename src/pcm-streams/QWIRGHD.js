import InvalidBitDepthError from './InvalidBitDepthError';
import { Readable } from 'stream';

export default class QWIRGHD extends Readable {
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
    var buffer = new Buffer(numSamples * blockAlign);

    this.push(buffer);

    this.samplesGenerated += numSamples;
    if (this.samplesGenerated >= this.sampleRate * this.duration) {
      // after generating "duration" second of audio, emit "end"
      this.push(null);
    }
  }
}
