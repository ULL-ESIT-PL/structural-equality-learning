import  _  from 'lodash';

var object = { 'a': 1 };
var other = { 'a': 1 };
 
console.log(_.isEqual(object, other)); // => true
 

function isGreeting(value) {
  return /^h(?:i|ello)$/.test(value);
}
 
function customizer(objValue, othValue) {
  if (isGreeting(objValue) && isGreeting(othValue)) {
    return true;
  }
}
 
var array = ['hello', 'goodbye'];
var other = ['hi', 'goodbye'];
 
console.log(_.isEqualWith(array, other, customizer)); // => true