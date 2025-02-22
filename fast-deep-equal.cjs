// The fastest deep equality check with Date, RegExp and ES6 Map, Set and typed arrays support
var equal = require('fast-deep-equal');
console.log(equal({foo: 'bar'}, {foo: 'bar'})); // true
console.log(equal(new Int16Array([1, 2]), new Int16Array([1, 2]))); // true
console.log(equal([1,4, [5,6]], [1,4, [5,6]])); // true
console.log(equal(new Date('2015-01-02'), new Date('2015-01-02'))); // true
const a = []; a.push(a);
const b = []; b.push(b);
try {
  console.log(equal(a, b));
 } catch (e) { console.log(e.message); } // RangeError: Maximum call stack size exceeded 