# Structural Equality Solutions

## Benjamn R. Meyer's Wryware monorepo and equality package

See 

1. https://github.com/benjamn/wryware/tree/main
2. https://github.com/benjamn/wryware/tree/main/packages/equality

### Execution of hello-structural-equality.js

[hello-structural-equality.js](./hello-structural-equality.js) is a simple script that demonstrates the use of the 
compiled version of the `@wry/equality` package 

```js 
 import { equal } from './lib/algorithm.cjs';
```

to compare values for structural equality. It compares numbers, strings, arrays, and objects with varying levels of complexity, including deep cycles.

```
➜  structural-equality-learning git:(main) ✗ node hello-structural-equality.js 
Comparing numbers:
true
false
...
Comparing arrays with deep cycles:
true Expected: true
true Expected: false
true
true
true
true
true Expected false? // There is s.t. I do not understand here

Comparing objects with deep cycles:
true expected: true
true expected: true
```

### Execution of npm test using the local compiled version of the `@wry/equality` package

The file [tests/testslocal.mjs](tests/testslocal.mjs) it is a translation of the original file [tests/testswry.ts](tests/testswry.ts) to a module js file.  Imports the compiled version of the `@wry/equality` package and uses it to run a series of tests that compare values for structural equality. 

```js
import defaultEqual, { equal } from "../lib/algorithm.cjs";
```

I do not understand why but the test for async generator pass and when using the wry package it fails. 

```
➜  structural-equality-learning git:(main) ✗ npm test

> structural-equality-learning@1.0.0 test
> mocha tests/testslocal.mjs
  equality
> defaultEqual { equal: [Function: equal], default: [Function: equal] }
> equal [Function: equal]
    1) should work with named and default imports
    ✔ should work for primitive types
    ✔ should work for arrays
    ✔ should work for objects
    ✔ should consider undefined and missing object properties equivalent
    ✔ should work for Error objects
    ✔ should work for Date objects
    ✔ should work for RegExp objects
    ✔ should work for Set objects
    ✔ should work for Map objects
    ✔ should tolerate cycles
    ✔ should not care about repeated references
    ✔ should equate non-native functions with the same code
    ✔ should equate async functions with the same code
    ✔ should equate generator functions with the same code
    ✔ should equate async generator functions with the same code
    ✔ should work for Array Buffers And Typed Arrays
    ✔ should work with a kitchen sink
    performance
      ✔ should be fast for arrays (2126ms)
      ✔ should be fast for objects (1404ms)
      ✔ should be fast for strings (546ms)
      ✔ should be fast for functions (898ms)


  21 passing (5s)
  1 failing

  1) equality
       should work with named and default imports:
     AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
+ actual - expected

+ {
+   default: [Function: equal],
+   equal: [Function: equal]
+ }
- [Function: equal]

      at Context.<anonymous> (file:///Users/casianorodriguezleon/campus-virtual/2122/learning/compiler-learning/structural-equality-learning/tests/testslocal.mjs:26:12)
      at process.processImmediate (node:internal/timers:511:21)
```

### Execution of the tests using the wry package

The file [tests/testswry.ts](tests/testswry.ts) imports the `@wry/equality` package and uses it to run a series of tests that compare values for structural equality. 

```ts
import * as assert from "assert";
import defaultEqual, { equal } from "@wry/equality";
```
It fails in the test `should equate async generator functions with the same code`:
```
➜  structural-equality-learning git:(main) ✗ npm run test:ts
  equality
    ✔ should work with named and default imports
    ✔ should work for primitive types
    ✔ should work for arrays
    ✔ should work for objects
    ✔ should consider undefined and missing object properties equivalent
    ✔ should work for Error objects
    ✔ should work for Date objects
    ✔ should work for RegExp objects
    ✔ should work for Set objects
    ✔ should work for Map objects
    ✔ should tolerate cycles
    ✔ should not care about repeated references
    ✔ should equate non-native functions with the same code
    ✔ should equate async functions with the same code
    ✔ should equate generator functions with the same code
    1) should equate async generator functions with the same code
    ✔ should work for Array Buffers And Typed Arrays
    ✔ should work with a kitchen sink
    performance
      ✔ should be fast for arrays (2318ms)
      ✔ should be fast for objects (1393ms)
      ✔ should be fast for strings (447ms)
      ✔ should be fast for functions (1189ms)


  21 passing (5s)
  1 failing

  1) equality
       should equate async generator functions with the same code:

      AssertionError [ERR_ASSERTION]: unexpectedly not equal({"before":123,"after":321}}, {"after":321,"before":123})

false !== true

      + expected - actual

      -false
      +true
      
      at assertEqual (lib/testswry.cjs:73:12)
      at Context.<anonymous> (lib/testswry.cjs:332:9)
      at process.processImmediate (node:internal/timers:511:21)
```

## Lodash 

### _.isEqual

Performs a deep comparison between two values to determine if they are equivalent.

**Note**: This method supports comparing arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, and typed arrays. Object objects are compared by their own, not inherited, enumerable properties. Functions and DOM nodes are compared by strict equality, i.e. ===.

### _.isEqualWith(value, other, [customizer])

This method is like `_.isEqual` except that it accepts `customizer` which is invoked to compare values. 
If `customizer` returns `undefined`, comparisons are handled by the method instead. 
The `customizer` is invoked with up to six arguments: `(objValue, othValue [, index|key, object, other, stack])`.

## isDeepStrictEqual

See https://nodejs.org/api/util.html#util_util_isdeepstrictequal_val1_val2

## Fast deep equal

- https://github.com/epoberezkin/fast-deep-equal


## References

- https://stackoverflow.com/questions/201183/how-can-i-determine-equality-for-two-javascript-objects

## What is Rimraf? 

Rimraf is a Node.js package that provides a cross-platform solution for recursively deleting files and directories. It's essentially a Node.js implementation of the Unix command `rm -rf`. The name "rimraf" stands for "`rm -rf`" in Unix-like systems.

- It's commonly used in build scripts and npm scrip-ts to clean up directories.
- It works across different operating systems, making it a reliable choice for cross-platform projects.
- It can handle complex directory structures and file permissions more reliably than native Node.js file system methods in some cases.

```js 
import { rimraf } from 'rimraf';
import fs from 'fs/promises';
import path from 'path';

const testDir = path.join(process.cwd(), 'test-directory');

async function createTestStructure() {
  await fs.mkdir(testDir, { recursive: true });
  await fs.writeFile(path.join(testDir, 'file1.txt'), 'Hello, World!');
  await fs.mkdir(path.join(testDir, 'subdir'), { recursive: true });
  await fs.writeFile(path.join(testDir, 'subdir', 'file2.txt'), 'Nested file');
}

async function runDemo() {
  console.log('Creating test directory structure...');
  await createTestStructure();
  
  console.log('Test structure created. Directory contents:');
  console.log(await fs.readdir(testDir, { recursive: true }));

  console.log('\nDeleting test directory using rimraf...');
  await rimraf(testDir);

  console.log('Checking if directory still exists...');
  try {
    await fs.access(testDir);
    console.log('Directory still exists (this should not happen).');
  } catch (error) {
    console.log('Directory has been successfully deleted!');
  }
}

runDemo().catch(console.error);
```