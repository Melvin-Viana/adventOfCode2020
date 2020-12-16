// Starts at 0 - 128
// Bipartion each seat
// F is lower half
// B = Upper half

const input = require('./readFile')('input5.txt');
const columnRange = [0,127];
const rowRange = [0,7];
const seats = {};

// Find highest seat ID
const findHighestSeatNumber = () => {
  let highestSeat = 0;
  for (let i = 0; i < input.length; i++) {
    // console.log(getNumber(columnRange,input[i].slice(0,7)))
    let row = getNumber(columnRange,input[i].slice(0,7));
    let column = getNumber(rowRange,input[i].slice(-3))
    let currentSeat = calculateSeatID(row,column);
    seats[currentSeat] = true;
    highestSeat = Math.max(currentSeat, highestSeat);
  }
  return highestSeat;
}

// Formula for finding the seat id
// Row * Column * 8
// Calculate current string seat id
const calculateSeatID = (row, column) => {
  return (row * 8) + column;
}

// Find which range the seat should be in
// 0 - 127 = Range for Rows
// 0 - 7 = Range for Columns
const findSeatRange = (letter, lowerBound, upperBound) => {
  let range = upperBound - lowerBound;
  let bipartition = (range + 1) / 2
  switch (letter) {
    case 'F':
      return [lowerBound,  upperBound - bipartition];
    case 'B':
      return [lowerBound + bipartition , upperBound];
    case 'L':
      return [lowerBound, upperBound - bipartition];
    case 'R':
      return [lowerBound + bipartition, upperBound];
    default:
      break;
  }
}

// Get row/column number
const getNumber = (range, characters) => {
  const output = new Array(...range);
  for (let i = 0; i < characters.length; i++) {
    const newOutput = findSeatRange(characters[i], output[0], output[1]);
    output[0] = newOutput[0];
    output[1] = newOutput[1];
  }
  return output[0];
}
//==================================================================
console.log(findHighestSeatNumber())
const missingSeats = [];
//IIFE To find missing seat
(() => {
  for (let i = 0; i < input.length; i++) {
    if(!sets[i]) missingSeats.push(i);
  }
})()
console.log(missingSeats)