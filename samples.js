'use strict';

// let const
for(var i =0; i<3; i++){
  let j = i * i;
  console.log(j);
}
console.log('i: ' + i);
// console.log('j: ' + j);

// arrow
let square = x => x*x;
console.log(square(4));

// template string
let name = 'Sam';
console.log(`Hello, ${name}`); //dedent

// Destructuring
const getDate = () => ([2014, 11, 11]);
let [year, month, day] = getDate();
console.log(year, month, day);

const getDate2 = () => ({y: 2014, m: 11, d: 11});
let {y, m, d} = getDate2()
console.log(y, m, d);

// Spread
let arrA = [1,2,3,4];
let arrB = [5,6,7];
arrA.push(...arrB);
console.log(arrA);

let testObjA = {a: 1, b: 2, c: 3};
// let testObjB = { ...testObjA, d: 4};
console.log(testObjB);

// Function Enhance
function plus2(a, b, ...rest){
  return a + b + rest.reduce((sum, cur) => sum+cur);
}
console.log(plus2(1,2,3,4))

function plus(a=0, b=0){
  return a + b;
}
console.log(plus());
console.log(plus(1));
console.log(plus(1, 2));

// Class
class Animal {
  constructor(name){
    this.name = name;
  }
  
  breathe(){
    console.log(`${this.name} is breathing.`);
  }
}

new Animal('Big Jake').breathe();

class Dog extends Animal {
  constructor(name){
    super(name)
  }
  
  bark(){
    super.breathe();
    console.log(`${this.name} is barking.`);
  }
}

new Dog('Little Bob').bark()

// Promise
function timeout(duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
    // setTimeout(reject, duration);
    // setTimeout(() => { resolve(100) }, duration);
  })
}

timeout(1000)
  .then((msg = 'success') => {
    console.log(msg);
    return timeout(2000);
  }).then(() => {
    console.log('error');
    throw new Error("hmm");
  }).catch(err => {
    console.log('reject');
  });

var proxyObj = new Proxy({}, {
  get: function(target, name){
    return name in target ? target[name] : 37;
  },
  set: function(target, name, value){
    if(name === 'age'){
      throw new Error('Cant set age of this object');
    }else{
      target[name] = value;
    }
    
  }
});


let a = 'abc';
console.log(a.includes('b'));

console.log(isFinite("23"));
console.log(Number.isFinite("23"));

console.log(Math.clz32(10));

let list = document.querySelectorAll('p');
console.log(Array.from(list, (p) => p.innerHTML));


// Object Literal Shorthand

// modules


let arr = [1,2,3];
arr.foo = 'bar';
for(let v in arr){
  console.log(v);
}
for(let v of arr){
  console.log(v);
}
// Array.prototype.forEach


let testObj = {a: 1, b: 2, c: 3};
// for(let [k, v] of testObj){
//   console.log([k,v]);
// }
function* items(o){
  for(let k in o){
    yield [k, o[k]];
  }
}
for(let [k,v] of items(testObj)){
  console.log([k,v]);
}


proxyObj.a = 1;
console.log(proxyObj.a);
console.log(proxyObj.b);
proxyObj.age = 12;
proxyObj.c = 111;
console.log(proxyObj);

