import request from 'request-promise';
import fs from 'fs';

const me = 'thomas';

console.log(`Hi ${me}!`);

console.log(process.argv);

// async function printWav() {
//   const response = await request({
//     uri: 'http://www.nch.com.au/acm/11k16bitpcm.wav',
//     resolveWithFullResponse: true,
//   });
//
//   // console.log(Object.keys(response));
//   fs.writeFile('./files/11k16bitpcm.wav', response.body, () => console.log('written!'));
// }

printWav();
