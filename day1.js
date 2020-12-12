const fs = require('fs');
const input = fs.readFileSync('./day1input.txt', 'utf8').split('\n');
//Loop through array and find sums that equal 2020
const partOneAnswer = () => {
  for (let i = 0; i < input.length - 1; i++) {
    let currentNum = parseInt(input[i]);
    let pair = 2020 - currentNum;
    for (let j = i + 1; j < input.length; j++) {
      if (pair === parseInt(input[j])) return pair * currentNum
    }
  }
}
console.log(partOneAnswer());

const partTwo = () => {
  const sortedInput = input.sort((a,b) => a-b);

  for (let index = 0; index < sortedInput.length - 2; index++){
  let firstVal = parseInt(sortedInput[index]);
    for (let i = index +1; i < sortedInput.length-1; i++) {
      let secondVal = parseInt(sortedInput[i]);
      let pairSum = secondVal + firstVal;
      if (pairSum > 2020) break;
      let thirdVal = 2020 - pairSum;
      for (let j = i +1; j < sortedInput.length; j++) {
        if (thirdVal === parseInt(sortedInput[j])) return thirdVal * secondVal * firstVal;
      }
    }
  }
};
console.log(partTwo());