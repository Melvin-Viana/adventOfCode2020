// --- Day 8: Handheld Halting ---
const input = require('./readFile')('input8.txt');


const handheldHalting = (input, cb) => {
  return cb(input)
};

const findAccumulator = (input) => {
  const checker = new Array(input.length);
  checker.fill(false);
  let accumulator = 0;
  let i = 0;
  let length = input.length;
  let reachedTheEnd = false;
  while (i < length && !checker[i]) {
    let currentOperation = input[i].slice(0,3);
    let value = input[i].slice(4);
    switch(input[i].slice(0,3)) {
      // nop goes to the next line
      case 'nop':
        i++;
        break;
      // acc adds/subtracts to the accumulator
      case 'acc':
        checker[i] = true;
        i++;
        accumulator += parseInt(value);
        break;
      // jmp jumps to the line within input
      case 'jmp':
        checker[i] = true;
        i = i + parseInt(value);
        break;
      default:
        break;
    }
    if (i === length-1) {
      reachedTheEnd = true;
    }
    }
  return [accumulator,reachedTheEnd];
};
const findAllHighestOperations = (input) => {
  const checker = new Array(input.length);
  checker.fill(false);
  const operationIndices = [];
  let i = 0;
  let length = input.length;

  while (i < length && !checker[i]) {
    let currentOperation = input[i].slice(0,3);
    let value = input[i].slice(4);
    switch(input[i].slice(0,3)) {
      // nop goes to the next line
      case 'nop':
        i++;
        operationIndices.push(['nop',i, value]);
        break;
      // acc adds/subtracts to the accumulator
      case 'acc':
        checker[i] = true;
        i++;
        break;
      // jmp jumps to the line within input
      case 'jmp':
        checker[i] = true;
        operationIndices.push(['jmp',i, value]);
        i = i + parseInt(value);
        break;
      default:
        break;
    }
  }
  return operationIndices;
};

const findCorruptedInstruction = (input) => {
  let changeInput = [...input];
  //Loop until reach the end of input
  return function(operations) {
    let accumulator = 0;
    const operationIndices = [...operations];
    let i = 0;
    let length = operationIndices.length;
    let currentOpIndex = length -1;
    while (operationIndices.length) {
      let [currentOp, indexToChange, value] = operationIndices[currentOpIndex];
      let op = currentOp === 'jmp' ? 'nop': 'jmp';
      changeInput[indexToChange] = op + ' ' + value;
      // Check if it reaches the end
      const [acc, isEnd] = findAccumulator(changeInput);
      if(isEnd) {accumulator = acc; break;
      }
      changeInput = [...input];
      currentOpIndex--;
      // Change
      operationIndices.pop();
      i++
    }
    return accumulator;
  }

}
// Part One:
console.log(handheldHalting(input, findAccumulator))
const ops = handheldHalting(input,findAllHighestOperations).sort((a,b)=>a[1]-b[1]);
//Part Two:
console.log(handheldHalting(ops, findCorruptedInstruction(input)))