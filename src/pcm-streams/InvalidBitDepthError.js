import util from 'util';

export default function InvalidBitDepthError(message = '') {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
}

util.inherits(InvalidBitDepthError, Error);
