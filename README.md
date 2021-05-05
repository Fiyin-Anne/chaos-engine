# Chaos Engine

## Overview 
[![npm version](https://badge.fury.io/js/chaos-engine.svg)](https://badge.fury.io/js/chaos-engine)

In simple terms, chaos engineering is the practice of testing your system or program's resilience by occasionally causing it to fail. It helps to expose unknown errors and weaknesses.

This package is a testing tool that allows the user to run a wide range of negative/destructive tests on their code functions.

To get started, install from npm: `npm install chaos-engine`.

## Basic Usage

Say we have a sample function named `func1`. This function accepts three parameters, and each of them should be a number. It then adds them up and returns a number value. Now, let's try to break it.

```js
var chaosEngine = require("chaos-engine");

var func1 = function add(a, b, c) {
    if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number' ) throw new Error('params should be a number');
    return a+b+c;
}

//describe your function
let description;
description = chaosEngine.describe
                .title('adds three numbers.')
                .accepts(3)
                .types('number')
                .returns('number')
                .getDescription();

// run destructive tests on the function
let chaos_result = chaosEngine.destroy(func1, description);
console.log(chaos_result);

/* Output:
{
  description: {
    title: 'a function for adding.',
    params: 3,
    types: [ 'number', 'number', 'number' ],
    return_value: 'number'
  },
  chaos_report: {
    no_params: [
      {
        payload: 'no payload sent',
        response: 'params should be a number'
      }
    ],
    single_params: [
      { payload: null, response: 'params should be a number' },
      { payload: undefined, response: 'params should be a number' },
      { payload: true, response: 'params should be a number' },
      { payload: false, response: 'params should be a number' },
      { payload: {}, response: 'params should be a number' },
      { payload: [], response: 'params should be a number' },
      { payload: 1.35, response: 'params should be a number' },
      { payload: 'sandra', response: 'params should be a number' },
      { payload: 10, response: 'params should be a number' },
      {
        payload: 'sandra@xyz.com',
        response: 'params should be a number'
      }...
    ],
    multiple_params: [
      { payload: [ 1, 2, 3 ], response: 6 },
      {
        payload: [ 'x', 'i', 0 ],
        response: 'params should be a number'
      },
      {
        payload: [ 1, true, false ],
        response: 'params should be a number'
      },
      {
        payload: [ true, undefined, null ],
        response: 'params should be a number'
      },
      { payload: [ 1, 2, 3 ], response: 6 },
      {
        payload: [ 'letter', 'biro', 'pen' ],
        response: 'params should be a number'
      },
      {
        payload: [ 8, { a: 2, b: 4, c: 5 }, 9 ],
        response: 'params should be a number'
      },
      { payload: [ 8, {}, 9 ], response: 'params should be a number' },
      ...]
  }
}
*/
```

Let's test another function `func2` that has not implemented any validation or error checks. 

```js
var chaosEngine = require("chaos-engine");

var func2 = function add(a, b, c) {
    return a+b+c;
}

//describe your function
let description;
description = chaosEngine.describe
                .title('another function for adding.')
                .accepts(3)
                .types(['number'])
                .returns('number')
                .getDescription();

// run destructive tests on the function
let chaos_result = chaosEngine.destroy(func2, description);
console.log(chaos_result);

/*Output:
{
  description: {
    title: 'another function for adding.',
    params: 3,
    types: [ 'number', 'number', 'number' ],
    return_value: 'number'
  },
  chaos_report: {
    no_params: [ { payload: 'no payload sent', response: NaN } ],
    single_params: [
      { payload: null, response: NaN },
      { payload: undefined, response: NaN },
      { payload: true, response: NaN },
      { payload: false, response: NaN },
      { payload: {}, response: '[object Object]undefinedundefined' },
      { payload: [], response: 'undefinedundefined' },
      { payload: 0, response: NaN },
      { payload: 1.35, response: NaN },
      { payload: 0.987, response: NaN },
      { payload: 'sandra', response: 'sandraundefinedundefined' },
      { payload: 10, response: NaN },
      { payload: [ 1, 2 ], response: '1,2undefinedundefined' },
      { payload: [ 1, 2, 3 ], response: '1,2,3undefinedundefined' },...],
    multiple_params: [
      { payload: [ 1, 2, 3 ], response: 6 },
      { payload: [ 'x', 'i', 0 ], response: 'xi0' },
      { payload: [ 1, true, false ], response: 2 },
      { payload: [ true, undefined, null ], response: NaN },
      { payload: [ 1, true, false ], response: 2 },
      { payload: [ 1, true, false ], response: 2 },
      { payload: [ 1, false, true ], response: 2 },
      { payload: [ 1, 2, 3 ], response: 6 },
      {
        payload: [ 'letter', 'biro', 'pen' ],
        response: 'letterbiropen'
      },
      {
        payload: [ 8, { a: 2, b: 4, c: 5 }, 9 ],
        response: '8[object Object]9'
      },
      { payload: [ 8, {}, 9 ], response: '8[object Object]9' },
      { payload: [ 8, [], 9 ], response: '89' },...
    ]
  }
}
*/
```
_P.S: Output results have been shortened here for easy reading._

Comparing the two outputs, we can see from the different responses that although the functions do the same thing, only one looks out for errors and handles them.


## Description
There are three main properties involved in generating of a chaos report: `.describe()`, `.supply()`, and  `.destroy()`.

1. `.describe()`:

This property allows you to describe what your function does. It has five chainable methods.

| method   | accepts   | description  |
| ------------ |-------------| -----|
| title  | String | This explains what the function does. |
| accepts  | Integer      | This refers to the number of arguments the function accepts. |
| types | String | This shows what type of arguments the function expects. If the function accepts more than one argument and they are all of the same type, the user can pass just one string e.g `.accepts(3).types('number')` will return `params: 3, types: [ 'number', 'number', 'number' ]`. |
| returns  | Srting      | This refers to the type of value the function will return if the correct arguments are passed. |
| getDescription _(required)_  |  | This return an object containing the description. |
| getDescriptionString   |  | This return a string containing the description. |

Example:
```js
let description;
description = chaosEngine.describe
                .title('adds numbers.')
                .accepts(3)
                .types('number')
                .returns('number')
                .getDescription();

console.log(description);
/*Output:
{
    title: 'adds numbers.',
    params: 3,
    types: [ 'number', 'number', 'number' ],
    return_value: 'number'
}*/
```

_The chaining should always follow the format used in the example._

If the chain contains any other method not in the table above, it returns an `InvalidMethod` error. It also throws a `TypeError` message if an invalid datatype is passed into any of the methods.

Adding `.getDescription()` to the end of the chain returns an object containing the functions description. To get the description as a string, use `.getDescriptionString()` instead, and ensure that the `title` value starts with an action word. Both will return a `TypeError` if they are not the last in the chain. It will also return an empty object if no other method is called.

2. `.supply()`:

Chaos-engine comes with a predefined array of random arguments that are passed through the function provided. Calling the `.supply()` property allows you to provide your selection of arguments as an array.

| parameters   | type   | description  |
| ------------ |-------------| -----|
| array _(required)_ | Array | This is the array containing the user's arguments. |

Calling `.supply()` without chaining `.destroy()` only returns the arrays. 

Example:
```js
var arr =   [1, 5, 8, [9, 8], "kl", {1: 'v', 2: 'b'}, 'must', 'contain', 'ten', 'values'];


let chaos_result = ChaosEngine.supply(arr);
console.log(chaos_result);

/*Output:
ChaosEngine {
  report: {},
  arr: [
    1,
    5,
    8,
    [ 9, 8 ],
    'kl',
    { '1': 'v', '2': 'b' },
    'must',
    'contain',
    'ten',
    'values'
  ],
  arr2: [
    [ 1, 'ten', 1, 'values' ],
    [ 5, 'values', 'values', 1, 5, 1 ],
    [
      'must',
      'kl',
      'values',
      8,
      'contain',
      { '1': 'v', '2': 'b' },
      'values'
    ],
    [
      'values',
      1,
      5,
      8,
      { '1': 'v', '2': 'b' },
      'kl',
      { '1': 'v', '2': 'b' },
      [ 9, 8 ],
      'values',
      'must'
    ],
    [ 1, [ 9, 8 ], 'kl', 'values', 'must', 'must' ],
    [ 'must', 8, { '1': 'v', '2': 'b' }, [ 9, 8 ], 8, 1, 1 ],
    [ 'kl', 'ten', 8, 'ten' ],
    [ 1, 'kl', { '1': 'v', '2': 'b' }, { '1': 'v', '2': 'b' } ],
    [ 5, 'kl', 'values', { '1': 'v', '2': 'b' } ],
    [
      'ten',
      'kl',
      [ 9, 8 ],
      { '1': 'v', '2': 'b' },
      8,
      { '1': 'v', '2': 'b' }
    ]
  ]
}
*/
```

_The chaos engine creates a second array of arrays `arr2` by selecting random values from the array supplied. It then uses the array for the multiple params test(explained in no. 3)._

It returns a `TypeError` if:
- If the property is called without passing an array.

It returns an `ArgumentError` if:
- the array is empty.
- the array contains less than ten values or more than ten thousand values.


3. `.destroy()`:
This property does the majority of the work. It is what runs the destructive tests. It can be used without the `.supply()` property. If used together, `.supply()` must always be chained before `.destroy()`.

It accepts three arguments. The arguments must always follow the order: `.destroy(fn, description, limit)`. If you will not pass a description but want to set a limit, place an empty object in its place: `.destroy(my_func, {}, 10)`.

| parameters   | type   | description  |
| ------------ |-------------| -----|
| fn _(required)_ | function | The function to be tested. |
| description  | object /string    | This contains the description of the function being passed. It is generated using the `.describe()` property. The default value is `{}`.|
| limit  | Integer      |  This refers to how many times the function should be tested. The default value is the length of the array.|

It returns an object containing the description (if one was passed as earlier explained), a `chaos_report` object containing the test results, and a `total` property showing the total number of tests. The chaos report contains three arrays:

- `no_params`: This displays the response received when no argument is passed to the function.
- `single_params`: This displays all arguments passed to the function and responses received for each of them. Here, all values in the predefined array or the one supplied are passed as single arguments. So, even if it is an array value, the function will receive it as a single argument.
- `multiple_params`: This also displays all arguments passed to the function and responses received for each of them. 
Here, the function always receives an array containing several values. The array values are then separated and passed as individual arguments. This means that a function will receive this `[1, 2, [3, 'a'], {a: 'name', b: 'age'}]` but interpret it as `1, 2, [3, 'a'], {a: 'name', b: 'age'}`. Nested objects are not affected. 

Example:

```js
var arr =   [1, 5, 8, [9, 8], "kl", {1: 'v', 2: 'b'}, 'must', 'contain', 'ten', 'values', 1, 5, 8, 1, 5, 8,1, 5, 8,1, 5, 8,1, 5, 8,1, 5, 8,[9, 8], "kl", {a: 8, b: 9}, "sandra", "mandara", null, undefined, {}, false, true, [], 134567876543234567, 987654345678];
console.log(arr.length) //to show how `limit` works

let description;
description =details
              .title("luhn checker")
              .accepts(3)
              .types('array')
              .returns('number')
              .getDescription();

let chaos_result = creatChaos.supply(arr).destroy(func1, description, 10)
console.log(chaos_result);

/*Output:
41
{
  description: {
    title: 'luhn checker',
    params: 3,
    types: [ 'array', 'array', 'array' ],
    return_value: 'number'
  },
  chaos_report: {
    no_params: [
      {
        payload: 'no payload sent',
        response: 'params should be a number'
      }
    ],
    single_params: [
      { payload: 1, response: 'params should be a number' },
      { payload: 5, response: 'params should be a number' },
      { payload: 8, response: 'params should be a number' },
      { payload: [ 9, 8 ], response: 'params should be a number' },
      { payload: 'kl', response: 'params should be a number' },
      {
        payload: { '1': 'v', '2': 'b' },
        response: 'params should be a number'
      },
      { payload: 'must', response: 'params should be a number' },
      { payload: 'contain', response: 'params should be a number' },
      { payload: 'ten', response: 'params should be a number' },
      { payload: 'values', response: 'params should be a number' }
    ],
    multiple_params: [
      {
        payload: [ 8, undefined ],
        response: 'params should be a number'
      },
      {
        payload: [ 1, 'values', 987654345678, undefined ],
        response: 'params should be a number'
      },
      {
        payload: [ [ 9, 8 ], 1, 1, [ 9, 8 ], 1, 8, false, 8 ],
        response: 'params should be a number'
      },
      {
        payload: [ null, 'contain', 5, 5, 1, 5, 8, 'mandara', 'must' ],
        response: 'params should be a number'
      },
      {
        payload: [ undefined, 5 ],
        response: 'params should be a number'
      },
      {
        payload: [ 1, [ 9, 8 ], false ],
        response: 'params should be a number'
      },
      {
        payload: [ true, 8, [ 9, 8 ], 1, 5, [], 987654345678 ],
        response: 'params should be a number'
      },
      { payload: [ 1, 8, 8, 8, 1 ], response: 17 },
      { payload: [ 8, 5, 'mandara', 'values' ], response: '13mandara' },
      {
        payload: [ 5, 'mandara', [ 9, 8 ], false, [] ],
        response: 'params should be a number'
      }
    ]
  },
  total: 21
}*/
```
As seen above, the array supplied contains 41 values. However, because `limit` equals 10, the chaos engine only carried out 10 tests each for  `single_params` and `multiple_params`. 

An `ArgumentError` is thrown if:
- limit is lower than 10 or exceeds 100,000.
- limit is higher than length of the array.

This package currently only provides 30 predefined values to test with. If you choose not to supply your array, the `limit` cannot be higher than 30.