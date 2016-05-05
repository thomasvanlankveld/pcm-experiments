import { Square } from './pcm-streams';
import Speaker from 'speaker';
import fs from 'fs';

const square = new Square({
  frequency: process.argv[2] || 440.0,
  duration: process.argv[3] || 2.0,
});

const writeStream = fs.createWriteStream('./files/square.pcm');

square.pipe(new Speaker());
square.pipe(writeStream);
