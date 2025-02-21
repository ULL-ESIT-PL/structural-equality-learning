## Benjamn R. Meyer's Wryware monorepo and equality package

See 

1. https://github.com/benjamn/wryware/tree/main
2. https://github.com/benjamn/wryware/tree/main/packages/equality

## Execution of hello-structural-equality.js

```
➜  structural-equality-learning git:(main) ✗ node hello-structural-equality.js 
Comparing numbers:
true
false

Comparing strings:
true
false

Comparing objects:
true
false

Comparing arrays:
true
false

Comparing mixed types:
true
false

Comparing sets:
true
false

Comparing maps:
true
false

Comparing objects with cycles:
true

Comparing arrays with deep cycles:
true Expected: true
true Expected: false
true
true
true
true
true Expected false?

Comparing objects with deep cycles:
true expected: true
true expected: true
```

## Execution of npm test

```
➜  structural-equality-learning git:(main) ✗ npm test

> structural-equality-learning@1.0.0 test
> npm run build && mocha lib/tests.cjs


> structural-equality-learning@1.0.0 build
> npm run clean:before && npm run tsc


> structural-equality-learning@1.0.0 clean:before
> rimraf lib


> structural-equality-learning@1.0.0 tsc
> tsc tests/tests.ts --outDir lib/ && mv lib/tests.js lib/tests.cjs



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
      ✔ should be fast for arrays (2068ms)
      ✔ should be fast for objects (1231ms)
      ✔ should be fast for strings (436ms)
      ✔ should be fast for functions (1089ms)


  21 passing (5s)
  1 failing

  1) equality
       should equate async generator functions with the same code:

      AssertionError [ERR_ASSERTION]: unexpectedly not equal({"before":123,"after":321}}, {"after":321,"before":123})

false !== true

      + expected - actual

      -false
      +true
      
      at assertEqual (lib/tests.cjs:73:12)
      at Context.<anonymous> (lib/tests.cjs:332:9)
      at process.processImmediate (node:internal/timers:511:21)
```


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