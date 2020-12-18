const input = require('./readFile')('input10.txt');
const inputNumbers = input.map(Number).sort((a,b)=>a-b);
inputNumbers.unshift(0);

class adapterArray {
  constructor(input) {
    this.input = input;
    this.counter=0;
  }

  getNumberOfJoltDifferences() {
    // Track diff1 & diff2
    let diff1Counter = 0;
    let diff2Counter = 0;
    const {input} = this;
    // Loop through all numbers
    for (let i = 0; i < input.length-1; i++) {
      let currentVal = input[i];
      for (let j = i; j < input.length; j++) {
        if (input[j] - currentVal === 1) {
          diff1Counter++;
          break;
        }
        if (input[j] - currentVal === 3) {
          diff2Counter++;
          break;
        }
        if (input[j] - currentVal > 3) break;
      }
    }
    //Highest rated adapter is for diff2Counter
    diff2Counter++;
    return diff1Counter + diff2Counter;
  }
  getPaths () {
    let ans = 0;
    const{input} = this;
    const cache = {};
    const dp = function(n) {
      if (n === input.length - 1) {
        return 1;
      }
      if (n in cache) {
        return cache[n];
      }
      let ans = 0;
      for (let i = n + 1; i < input.length; i++) {
        if (input[i] - input[n] <= 3) {
          ans += dp(i);
        }
      }
      cache[n] = ans;
      return ans;
    }
    return dp(0);
  }

}

const day10 = new adapterArray(inputNumbers.slice());
const partOne = day10.getNumberOfJoltDifferences();
console.log(partOne)
const partTwo = day10.getPaths();
console.log(partTwo)