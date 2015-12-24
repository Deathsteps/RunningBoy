function* readFile () {
  const caller = yield;
  setTimeout(()=>{
    caller.success('Hello, world!');
  }, 1000);
}

function* dealWithTheFile(){
  console.log('Start read a file....')
  var content = yield readFile();
  console.log(`The file says: "${content}"`);
}

var run = require('./run');

run(dealWithTheFile());