const fs = require('fs');
const { pipeline } = require('stream');
const TransformStream = require('./TransformStream');

function transform ({ shift, action, input, output }) {
  const readStream = input ? fs.createReadStream(input) : process.stdin;
  const writeStream = output ? fs.createWriteStream(output) : process.stdout;
  const transformStream = new TransformStream(shift, action === 'encode');

  pipeline(
    readStream,
    transformStream,
    writeStream,
    () => {}
  );
}

module.exports = transform;
