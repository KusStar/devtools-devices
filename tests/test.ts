import assert from 'assert';
import { basename } from 'path';
// @ts-ignore
import defaults, { devices } from '../dist/index.cjs';

assert(devices.length > 0);
assert(defaults.default.length === devices.length);

console.log(basename(__filename), 'Passed')