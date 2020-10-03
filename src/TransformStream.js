const { transformChar } = require('./caesar');
const { Transform } = require('stream');

class TransformStream extends Transform {
  // TODO: remove shift. this.shift before or after const???
  constructor(shift = 0) {
    super();
    this.shift = shift;
  }

  _transform(chunk, env, done) {
    const strChunk = chunk.toString();
    let res = '';
    for (let i = 0; i < strChunk.length; i++) {
      res += transformChar(strChunk, i, this.shift);
    }
    this.push(res);
    done();
  }
}

module.exports = TransformStream;
