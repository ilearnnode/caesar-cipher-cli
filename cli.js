const getParams = require('./modules/getParams');
const transform = require('./modules/transform');

const params = getParams();
transform(params);

process.on('beforeExit', () => {
  const endOfLine = require('os').EOL;
  process.stdin.write(endOfLine);
});
