const getParams = require('./modules/getParams');
const transform = require('./modules/transform');

async function main() {
  const params = await getParams();
  transform(params);
}

main();
