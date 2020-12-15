/**
 * Passport Processing
 */
const input = require('./readFile')('input4.txt');


//8 Required fields in the passport:
/**
  byr (Birth Year)
  iyr (Issue Year)
  eyr (Expiration Year)
  hgt (Height)
  hcl (Hair Color)
  ecl (Eye Color)
  pid (Passport ID)
  cid (Country ID) - Optional
  Part Two:

    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
      If cm, the number must be at least 150 and at most 193.
      If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.

*/
const passportFields = require('./readFile')('passportFields.txt');
const inputLength = input.length;


const {checkRange, checkHeight,isAlphaNumeric, checkHairColor, checkEyeColor, checkPassportId} = require('./validityCheckers');

const checkValidityFunctions = {
  'byr': checkRange(1920, 2002),
  'iyr': checkRange(2010, 2020),
  'eyr': checkRange(2020, 2030),
  'hgt': checkHeight,
  'hcl': checkHairColor,
  'ecl': checkEyeColor,
  'pid': checkPassportId
}

const checkValidPassports = () => {
  let i = 0;
  let counter = 0;
  while(i < inputLength){
    const obj = {};
    while (input[i] !== '' && i < inputLength) {

      const currentLine = input[i].split(' ');
      for (let j = 0; j < currentLine.length; j++) {
        let keyPair = currentLine[j].split(':')
        let key = keyPair[0];
        let val = keyPair[1];
        obj[key] = val;
      }
      i++;
    }
    let isPassport = true;
    for (let j = 0 ; j < passportFields.length - 1; j++) {
      let currentVal = obj[passportFields[j]];
      if (!currentVal || !checkValidityFunctions[passportFields[j]](currentVal)) {
        isPassport = false;
        break;
      }
    }
    if (isPassport) counter++;
    i++;
  }
  return counter;
}
console.log(checkValidPassports());