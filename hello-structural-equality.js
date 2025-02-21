import { equal } from '@wry/equality';

// Simple equality checks
console.log("Comparing numbers:");
console.log(equal(1, 1));  // true
console.log(equal(1, 2));  // false

console.log("\nComparing strings:");
console.log(equal("hello", "hello"));  // true
console.log(equal("hello", "world"));  // false

// Object equality
console.log("\nComparing objects:");
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
const obj3 = { a: 1, b: { c: 3 } };

console.log(equal(obj1, obj2));  // true
console.log(equal(obj1, obj3));  // false

// Array equality
console.log("\nComparing arrays:");
const arr1 = [1, 2, [3, 4]];
const arr2 = [1, 2, [3, 4]];
const arr3 = [1, 2, [3, 5]];

console.log(equal(arr1, arr2));  // true
console.log(equal(arr1, arr3));  // false

// Mixed type equality
console.log("\nComparing mixed types:");
const mixed1 = { a: 1, b: [2, 3], c: { d: 4 } };
const mixed2 = { a: 1, b: [2, 3], c: { d: 4 } };
const mixed3 = { a: 1, b: [2, 3], c: { d: 5 } };

console.log(equal(mixed1, mixed2));  // true
console.log(equal(mixed1, mixed3));  // false