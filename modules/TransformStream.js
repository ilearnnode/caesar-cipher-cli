const { Transform } = require('stream');
const transformChar = require('./transformChar');

class TransformStream extends Transform {
  constructor(shift, encode) {
    super();
    this.shift = shift;
    this.encode = encode;
  }

  _transform(chunk, env, done) {
    const strChunk = chunk.toString();
    let res = '';
    for (let i = 0; i < strChunk.length; i++) {
      res += transformChar(strChunk, i, this.shift, this.encode);
    }
    this.push(res);
    done();
  }
}

module.exports = TransformStream;
