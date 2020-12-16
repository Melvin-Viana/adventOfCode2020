const input = require('./readFile')('input6.txt');

// Function that checks each group
const checkGroups = () => {
  // Check one group function
  let length = input.length;
  let i = 0;
  let counter = 0;
  while (i < length) {
    let currentGroupData = checkCurrentGroup(i);
    i = currentGroupData[1];
    counter += currentGroupData[0];
  }
  return counter;
};

//! Part One
// const checkCurrentGroup = (index) => {
//   const alphabets = {};
//   let counter = 0;
//   let currentIndex = index;
//   // Loop through indices until the current line is empty or undefined
//   while (input[currentIndex] !== '' && input[currentIndex] !== undefined) {
//     const currentLine = input[currentIndex];
//     for (let i = 0; i < currentLine.length; i++) {
//       // Use current character's code number and subtract by 97
//       let alphabet = currentLine[i]
//       // Set the val to true with that value if false
//       if(!alphabets[alphabet]) {
//         counter++;
//         alphabets[alphabet] = true;
//       }
//     }
//     currentIndex++;
//   }
//   currentIndex++;
//   return [counter, currentIndex];
// };

//! Part Two
const checkCurrentGroup = (index) => {
  const alphabets = {};
  let counter = 0;
  let currentIndex = index;
  // Loop through indices until the current line is empty or undefined
  let numOfMembers = 0;
  while (input[currentIndex] !== '' && input[currentIndex] !== undefined) {
    const currentLine = input[currentIndex];
    for (let i = 0; i < currentLine.length; i++) {
      // Use current character's code number and subtract by 97
      let alphabet = currentLine[i]
      // Set the val to true with that value if false
      alphabets[alphabet] =  alphabets[alphabet] ?  alphabets[alphabet] + 1 :  1;
    }
    currentIndex++;
    numOfMembers++;
  }
  for (let key in alphabets) {
    if(alphabets[key] === numOfMembers) counter++;
  }
  currentIndex++;
  return [counter, currentIndex];
};


console.log(checkGroups());