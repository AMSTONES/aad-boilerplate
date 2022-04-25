import cube from './components/hello';
import { hello } from './components/hello';
import { MDCRipple } from '@material/ripple/index';

import conditionalPerson from './components/step1';

const ripple = new MDCRipple(document.querySelector('.foo-button'));

console.log(hello({ name: 'Tom', lastName: 'Clarke', age: 30}));
console.log(cube(4));

const person = conditionalPerson();

/** Step 1 */
console.log('Step 1', person);


/** Step 2 - Check if a property exists in an object or not */
console.log('Step 2 - name', 'name' in person);
console.log('Step 2 - isActive', 'isActive' in person);


/** Step 3 - Object destructing with dynamic key */
const productData = { id: '23', name: 'Laptop' };
const { name: deviceName } = productData;

console.log('Step 3(a) - deviceName', deviceName);

/** Destructing value with dynamic tag */
const extractKey = 'name';
const { [extractKey]: data } = productData;

console.log('Step 3(b) - extractKey', data);


/* Step 4 - Loop over an object to access both key and value */
const laptop = { id: 1, name: 'Laptop', isSale: true };

console.log('Step 4(a) - Object entries', Object.entries(laptop));

Object.entries(laptop).forEach(([key, value]) => {
  if (['id', 'name'].includes(key)) {
    console.log('Step 4(b) - ', `key: ${key} | value: ${value}`);
  }
});

// @otdo - https://medium.com/dhiwise/11-useful-modern-javascript-tips-9736962ed2cd

(function($) {
  $(document).ready(function() {
    /** Your code here */
    console.log(`Something else ${cube(10)}`);
  });
})(jQuery);