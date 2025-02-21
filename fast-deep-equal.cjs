// The fastest deep equality check with Date, RegExp and ES6 Map, Set and typed arrays support
var equal = require('fast-deep-equal');
console.log(equal({foo: 'bar'}, {foo: 'bar'})); // true
console.log(equal(new Int16Array([1, 2]), new Int16Array([1, 2]))); // true