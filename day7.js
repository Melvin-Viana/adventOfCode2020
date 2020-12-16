// Luggage Processing
// Handy Haversacks
const list = {}
const input = require('./readFile')('input7.txt');
//=====================================================

// Fill out list of bags
const length = input.length;
for (let i = 0; i < length; i++) {
  const currentLine = input[i].split('contain');
  const currentBag = currentLine[0].split(' bags')[0];
  const containingBags = currentLine[1].split(',');
  if(!list[currentBag]) {
    list[currentBag] = {
      contains: {
      }
    }
  }
  const currentBagObj = list[currentBag];
  for (let j = 0; j < containingBags.length; j++) {
    const currentContainingBag = containingBags[j].split(' ').slice(1,4);
    if (currentContainingBag.join('') !== 'nootherbags.') {
      let currentProp = currentContainingBag.slice(1,3).join(' ')
      if (list[currentProp] === undefined) {
        list[currentProp] = {
          contains: {}
        }
      }
      const currentPropObj = list[currentProp];
      currentBagObj.contains[currentProp] = currentContainingBag[0];
    }
  }
}
//===============================================
//********* Part One ****************************
//Loop through each contains property in each bag, to find gold bag
const hasShinyGoldBag = bag => {
  let count = 0;
  if(!Object.entries(bag.contains).length) return false;
  const containing = bag.contains;
  let hasShinyGold = false;
  for (let key in containing) {
    if(key==='shiny gold') return true
    hasShinyGold = hasShinyGoldBag(list[key]);
    if (hasShinyGold) break;
  }
  return hasShinyGold;
}

let counter = 0;
for (let key in list) {
  const currentBag = list[key];
  if (hasShinyGoldBag(currentBag)) counter++;
}
console.log(counter);
//=====================================================
//********* Part Two **********************************
// Uses a queue to find number of bags in shiny gold bag
// Formula =  prevNumberOfBag(s) * numOfCurrentBag
const lookingThroughShinyBag = (bag) => {

  let counter = 0;
  const queue = [[bag.contains,1]];

  while (queue.length) {
    const currentBag = queue[0][0];
    const prevNumOfBags = queue[0][1];
    for (let key in currentBag) {
      let currentBagVal = Number(currentBag[key]);
      let currentSum =  currentBagVal * prevNumOfBags;
      counter += currentSum;
      queue.push([list[key].contains, prevNumOfBags * Number(currentBag[key])]);
    }
    queue.shift();
  }
  return counter;
}


console.log(lookingThroughShinyBag(list['shiny gold'], 1, 0))
