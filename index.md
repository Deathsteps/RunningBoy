# ES6

## Agenda

* ES262、ES2015、javascript 1.8.5
* let and const
* arrow function
* template string
* enhanced object literals
* Destructuring
* Spread
* class
* modules
* Promise
* Generators(yield)
* Map、Set
* additions to primitive object
* Symbol

## References:

* [Learn ES2015](https://babeljs.io/docs/learn-es2015/)
* [ES6 in Node.js](https://nodejs.org/en/docs/es6/)
* [ECMAScript 6 support in Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla)

## let and const

let: block scope
const: read-only reference to a value

## Arrows function

```
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
         // equivalent to:  => { return expression; }

// Parentheses are optional when there's only one parameter:
(singleParam) => { statements }
singleParam => { statements }

// A function with no parameters requires parentheses:
() => { statements }
```

## Template String

## Enhanced Object Literals

[See]https://github.com/lukehoban/es6features#enhanced-object-literals

## Destructuring

## Spread

## Class

## Modules

## Promise

## Generators(yield)

## Map and Set

Consider a map:

* Are keys usually unknown until run time, do you need to look them up dynamically?
* Do all values have the same type, and can be used interchangeably?
* Do you need keys that aren't strings?
* Are key-value pairs often added or removed?
* Do you have an arbitrary (easily changing) amount of key-value pairs?
* Is the collection iterated?