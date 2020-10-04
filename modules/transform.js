const fs = require('fs');
const { pipeline } = require('stream');
const TransformStream = require('./TransformStream');
const endOfLine = require('os').EOL;

function transform ({ shift, action, input, output }) {
  const readStream = input ? fs.createReadStream(input) : process.stdin;
  const writeStream = output ? fs.createWriteStream(output) : process.stdout;
  const transformStream = new TransformStream(shift, action === 'encode');

  pipeline(
    readStream,
    transformStream,
    writeStream,
    (err) => {
      if (err) {
        process.stderr.write(`Error: ${err.message}` + endOfLine);
        process.exit(1);
      }
    }
  );
}

module.exports = transform;
