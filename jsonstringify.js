let obj1 = { a: 5, b: 8}
let obj2 = { b: 8, a: 5 }
console.log(JSON.stringify(obj1) === JSON.stringify(obj2)) // false in node.js and v8 

