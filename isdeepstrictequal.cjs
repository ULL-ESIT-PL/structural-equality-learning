const util = require('util');

const obj1 = {
  foo: "bar",
  baz: [1, 2]
};

const obj2 = {
  foo: "bar",
  baz: [1, 2]
};


obj1 == obj2 // false
console.log(util.isDeepStrictEqual(obj1, obj2)) // true

const S1 = new Set([1, 2, 3]);
const S2 = new Set([1, 2, 3]);
console.log(util.isDeepStrictEqual(S1, S2)) // true
const S3 = new Set([1, 2, 3, 4]);
console.log(util.isDeepStrictEqual(S1, S3)) // false