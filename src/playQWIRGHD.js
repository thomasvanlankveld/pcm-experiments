import { QWIRGHD } from './pcm-streams';
import Speaker from 'speaker';
import fs from 'fs';

const qWIRGHD = new QWIRGHD({
  frequency: process.argv[2] || 440.0,
  duration: process.argv[3] || 2.0,
});

const writeStream = fs.createWriteStream('./files/qWIRGHD.pcm');

qWIRGHD.pipe(new Speaker());
qWIRGHD.pipe(writeStream);
