import { Sine } from './pcm-streams';
import Speaker from 'speaker';
import fs from 'fs';

// console.log(`ohai ${process.argv[2]}`);

const sine = new Sine({
  bitDepth: 32,
  frequency: process.argv[2] || 440.0,
  duration: process.argv[3] || 2.0,
});

const writeStream = fs.createWriteStream('./files/sine.pcm');

sine.pipe(new Speaker());
sine.pipe(writeStream);
