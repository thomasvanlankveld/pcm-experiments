'use strict';

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var me = 'thomas';

console.log('Hi ' + me + '!');

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