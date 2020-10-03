const argv = require('minimist')(process.argv.slice(2));

// -s, --shift: a shift
// -i, --input: an input file
// -o, --output: an output file
// -a, --action: an action encode/decode

// TODO: add validation
// const shift = argv.s || argv.shift;
// const action = argv.a || argv.action;
const input = argv.i || argv.input;
const output =  argv.o || argv.output;

const fs = require('fs');
const { pipeline } = require('stream');

const readStream = input ? fs.createReadStream(input) : process.stdin;
const writeStream = output ? fs.createWriteStream(output) : process.stdout;

pipeline(
  readStream,
  writeStream,
  () => {}
)