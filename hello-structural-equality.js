//import { equal } from '@wry/equality';
import { equal } from './lib/algorithm.cjs';

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

// Sets
console.log("\nComparing sets:");
const Set1 = new Set().add(1).add(2).add(3).add(2);
const Set2 = new Set().add(3).add(1).add(2).add(1);
const Set3 = new Set().add(3).add(1).add(2).add(4);

console.log(equal(Set1, Set2));  // true
console.log(equal(Set1, Set3));  // false

// Maps
console.log("\nComparing maps:");
const Map1 = new Map().set('a', 1).set('b', 2);
const Map2 = new Map().set('b', 2).set('a', 1);
const Map3 = new Map().set('b', 2).set('a', 3);

console.log(equal(Map1, Map2));  // true
console.log(equal(Map1, Map3));  // false

// Should tolerate cycles
console.log("\nComparing objects with cycles:");
const cycle1 = { a: 1 };
cycle1.b = cycle1;
const cycle2 = { a: 1 };
cycle2.b = cycle2;

console.log(equal(cycle1, cycle2));  // true

/// Should tolerate deep cycles

console.log("\nComparing arrays with deep cycles:");

const a = []; a.push(a);
const b = []; b.push(b);

console.log(equal(a, b), "Expected: true");  // true
console.log(equal([a], b), "Expected: false");  // false

console.log(equal([a], [b]));  // true
console.log(equal(a, [b]));  // false

a.push(1); // a = [a, 1]
b.push(1); // b = [b, 1]
console.log(equal(a, b));  // true
console.log(equal([a, 1], b));  // false

console.log(equal(a, [b, 1]), "Expected false?");  // false

console.log("\nComparing objects with deep cycles:");

const ring1 = { self: { self: { self: {} }}};
ring1.self.self.self.self = ring1;
const ring2 = { self: { self: {} }};
ring2.self.self.self = ring2;
console.log(equal(ring1, ring2), "expected: true");  // true

ring1.self.self.self.self = ring1.self;
console.log(equal(ring1, ring2), "expected: true");  // true

console.log("function equality");
const f1 = () => {};
const f2 = () => {};
console.log(equal(f1, f2), "Expected: true");  // true
const f3 = () => 4;
const f4 = () => 2+2;
console.log(equal(f3, f4));  // false
