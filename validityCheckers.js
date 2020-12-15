const checkRange = (min, max) => {
  return (val) => {
    val = parseInt(val);
    return val <= max && val >= min
  }
}
const checkHeight = (height) => {
    let val = parseInt(height.substring(0,height.length-2));
    let metric =  height.slice(-2);
    if (metric==='cm') return checkRange(150,193)(height)
    if (metric === 'in' ) return checkRange(59, 76)(height)
    return false;
}

const isAlphaNumeric = (str) => {
  let code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

const checkPassportId = val => String(val).length === 9;

const checkHairColor = (str) => {
  let hex = str.slice(1);
  return str[0] === '#' && hex.length === 6 && isAlphaNumeric(hex);
}
const checkEyeColor = (str) => {
  return str === 'amb' || str === 'blu' || str === 'brn' || str === 'gry' || str === 'grn' || str === 'hzl' || str === 'oth';
}
module.exports = {
  isAlphaNumeric,
  checkRange,
  checkHeight,
  checkEyeColor,
  checkHairColor,
  checkPassportId
};