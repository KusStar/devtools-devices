const assert = require('assert');
const devices = require('../dist/index.cjs');

assert(devices.default[0] == devices.devices[0]);
assert(devices.default.length === devices.devices.length);

console.log(basename(__filename), 'Passed')
