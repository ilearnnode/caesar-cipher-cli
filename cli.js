const getParams = require('./modules/getParams');
const transform = require('./modules/transform');

const params = getParams();
transform(params);
