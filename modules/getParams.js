const fs = require('fs');
const endOfLine = require('os').EOL;

async function getParams() {
  const argv = require('minimist')(process.argv.slice(2));

  return {
    shift: await getParam(argv, 's', 'shift', validateShift),
    action: await getParam(argv, 'a', 'action', validateAction),
    input: await getParam(argv, 'i', 'input', validateInput),
    output: await getParam(argv, 'o', 'output', validateOutput),
  };
}

async function getParam(argv, name, alias, validate = () => true) {
  const val = argv[name] || argv[alias];
  return await validate(val) && val;
}

function validateShift(val) {
  validate(val, (val) => val !== undefined, '--shift is required');
  validate(val, (val) => !isNaN(val), '--shift should be a number');
  return true;
}

function validateAction(val) {
  validate(val, (val) => val !== undefined, '--action is required');
  validate(val, (val) => ['encode', 'decode'].includes(val),
    '--action should be one of the following "encode", "decode"');
  return true;
}

function validateInput(val) {
  if (!val) {
    return true;
  }

  return new Promise((res, rej) => {
    fs.access(val, fs.constants.F_OK | fs.constants.R_OK, (err) => {
      if (err) {
        onError(err.message);
        rej();
      }
      res(true);
    });
  });
}

function validateOutput(val) {
  if (!val) {
    return true;
  }

  return new Promise((res, rej) => {
    fs.access(val, fs.constants.F_OK | fs.constants.R_OK,
      (err) => {
        if (err) {
          onError(err.message);
          rej();
        }
        res(true);
      });
  });
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
