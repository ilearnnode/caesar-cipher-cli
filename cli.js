const getParams = require('./modules/getParams');
const { shift, action, input, output} = getParams();

const fs = require('fs');
const { pipeline } = require('stream');
const TransformStream = require('./modules/TransformStream');

const readStream = input ? fs.createReadStream(input) : process.stdin;
const writeStream = output ? fs.createWriteStream(output) : process.stdout;

const transformStream = new TransformStream(shift);

pipeline(
  readStream,
  transformStream,
  writeStream,
  () => {}
)
