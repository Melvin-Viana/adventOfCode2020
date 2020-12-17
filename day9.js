// Encoding error
const input = require('./readFile')('input9.txt');
class encodingError {
  constructor(preambleLength, input) {
    this.preambleLength = preambleLength;
    this.input = input;
  }

  findPreamble (index) {
    const {input, preambleLength} = this;
    return input.slice(index, index + preambleLength);
  }
  isValidNumber (index) {
    let isValid = false;
    const {input, preambleLength} = this;
    const currentPreamble = this.findPreamble(index - preambleLength, index - preambleLength).sort((a,b)=>Number(a)-Number(b));
    const currentVal = Number(input[index]);
    for (let i = 0; i < currentPreamble.length - 1 ; i++) {
      let firstVal = Number(currentPreamble[i])
      for (let j = i+1; j< currentPreamble.length;j++) {
        let secondVal = Number(currentPreamble[j])
        if (currentVal === (firstVal+secondVal)) return true;
        if (currentVal <= firstVal+secondVal) break;
      }
    }
    return isValid;
  }

  getFirstInvalidNumber() {
    const {input, preambleLength} = this;
    for (let i = preambleLength; i < input.length; i++) {
      if(!this.isValidNumber(i))return input[i];
    }
  }
  getContingousSet(val) {
    const {input} = this;
    let i = 0;
    while (i < input.length) {
      let currentSum = 0;
      const array = [];
      for (let j = i; j < input.length; j++) {
        currentSum += Number(input[j]);
        array.push(Number(input[j]))
        if (currentSum > val) break;
        if (currentSum === val) {
          array.sort((a,b)=>b-a);
          return array[0] + array[array.length-1]
        }
      }
      i++;
    }
  }
}

// Find the current preamble numbers
// Compare current index to see if it is valid w/ current preamble

const day9 = new encodingError(25, input);
// day9
const partOne = Number(day9.getFirstInvalidNumber());
console.log(partOne);
const partTwo = day9.getContingousSet(partOne);
console.log(partTwo);
