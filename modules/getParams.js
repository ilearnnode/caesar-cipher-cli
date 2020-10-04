const fs = require('fs');
const endOfLine = require('os').EOL;

function getParams() {
  const argv = require('minimist')(process.argv.slice(2));

  return {
    shift: getParam(argv, 's', 'shift', validateShift),
    action: getParam(argv, 'a', 'action', validateAction),
    input: getParam(argv, 'i', 'input', validateInput),
    output: getParam(argv, 'o', 'output', validateOutput),
  };
}

function getParam(argv, name, alias, validate = () => true) {
  const val = argv[name] || argv[alias];
  return validate(val) && val;
}

function validateShift(val) {
  validate(val, (val) => val !== undefined, 'shift is required');
  validate(val, (val) => !isNaN(val), 'shift should be a number');
  return true;
}

function validateAction(val) {
  validate(val, (val) => val !== undefined, 'action is required');
  validate(val, (val) => ['encode', 'decode'].includes(val),
    'action should be one of the following "encode", "decode"');
  return true;
}

function validateInput(val) {
  if (val) {
    fs.access(val, fs.constants.R_OK, (err) => err && onError(err.message));
  }
  return true;
}

function validateOutput(val) {
  if (val) {
    fs.access(val, fs.constants.W_OK, (err) => err && onError(err.message));
  }
  return true;
}

function validate(val, expression, message) {
  if (!expression(val)) {
    onError(message);
  }
}

function onError(message) {
  process.stderr.write(`Error: ${message}` + endOfLine);
  process.exit(1);
}

module.exports = getParams;
