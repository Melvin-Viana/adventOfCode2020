/**
  Toboggan Trajectory
  Check each slop through the map

 */
const input = require('./readFile')('input3.txt');

class Map {
  constructor(map) {
    this.map = map;
  }
  isTree(input) {
    return input === '#';
  }
  getHeight() {
    return this.map.length;
  }
  getWidth() {
    return this.map[0].length;
  }

}

const tobbogganProb = new Map(input);
const map = tobbogganProb.map;
// This assumes we have a slope that reaches out of the forest
const checkSlope = (x, y) => {
    let currentX = 0;
    let currentY = 0;
    let vertBoundary = tobbogganProb.getHeight();
    let horizontalBoundary = tobbogganProb.getWidth();
    let counter = 0;
    while( currentY < vertBoundary ) {
      if (tobbogganProb.isTree(map[currentY][currentX % horizontalBoundary])) {
        counter++;
      }
      currentX +=x;
      currentY +=y;
    }
    return counter;
}
const slopes = [[1,1],[3,1],[5,1],[7,1],[1,2]];

let product = 1;
slopes.forEach(([x,y]) => {
  product *= checkSlope(x,y)
})
console.log(product);
