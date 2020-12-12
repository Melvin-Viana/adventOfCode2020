const fs = require('fs');
const input = fs.readFileSync('./input2.txt', 'utf8').split('\n');
const checkPasswordValidity = (passwordPolicyInfo, func) => {
  const passwordInfo = passwordPolicyInfo.split(' ');
  let policyCount = passwordInfo[0].split('-');
  let firstNum = Number(policyCount[0]);
  let secondNum = Number(policyCount[1]);
  let character = passwordInfo[1][0];
  let password = passwordInfo[2];
  console.log(passwordPolicyInfo);
  return func(password, firstNum, secondNum, character);
}

// Part One answer
const checkOldPolicy = (password, minCount, maxCount,character) => {
  let count = 0;
  for (let i = 0; i < password.length; i++) {
    if (password[i] === character) count++
  }
  return count >= minCount && count <= maxCount;
}
// Part Two answer
const checkNewPolicy = (password ,firstIndex, secondIndex, character) => {
  firstIndex = firstIndex -1;
  secondIndex = secondIndex -1;
  let firstIndexHasCharacter = password[firstIndex] === character
  let secondIndexHasCharacter =  password[secondIndex] === character ;
  let firstCondition =  firstIndexHasCharacter & !secondIndexHasCharacter
  let secondCondition = secondIndexHasCharacter && !firstIndexHasCharacter ;
  return firstCondition || secondCondition;
}

const numValidPasswords = (passwords, func) => {
  let passwordCount = 0;
  for (let i = 0; i < passwords.length; i++) {
    if (checkPasswordValidity(passwords[i], func)) {
      passwordCount++;
    }
  }
  return passwordCount;
};
//part one
console.log(numValidPasswords(input, checkOldPolicy));
//part two
console.log(numValidPasswords(input, checkNewPolicy));
