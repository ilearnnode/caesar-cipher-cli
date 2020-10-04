function getParams() {
  const argv = require('minimist')(process.argv.slice(2));
  console.log(argv);

  return {
    shift: getParam(argv, 's', 'shift', validateShift),
    action: getParam(argv, 'a', 'action', validateAction),
    input: getParam(argv, 'i', 'input'),
    output: getParam(argv, 'o', 'output'),
  };
}

function getParam(argv, name, alias, validate = () => true) {
  const val = argv[name] || argv[alias];
  return validate(val) && val;
}

function validateShift(val) {
  validate(val, (val) => val === undefined, 'shift is required');
  validate(val, (val) => isNaN(val), 'shift should be a number');
  return true;
}

function validateAction(val) {
  validate(val, (val) => val === undefined, 'action is required');
  validate(val, (val) => !['encode', 'decode'].includes(val),
    'action should be one of the following "encode", "decode"');
  return true;
}

function validate(val, expression, message) {
  if (expression(val)) {
    console.error(`Error: ${message}`);
    process.exit(1);
  }
}

module.exports = getParams;
