const input = require('./readFile')('input11.txt');
const xBoundary = input[0].length;
const yBoundary = input.length;
const directions = [
  {x:0, y:-1},
  {x:0, y:1},
  {x:-1, y:0},
  {x:1, y:0},
  {x:-1, y:-1},
  {x:1, y:-1},
  {x:-1, y:1},
  {x:1, y:1},
];

//======================================
const getNumOfOccupiedSeats = (input) => {
  let seatsOccupied = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j]==='#') seatsOccupied++;
    }
  }
  return seatsOccupied;
};

const checkForOccupied = (input , xAxis, yAxis, partTwo, {x:dirX, y: dirY}) => {
  if (xAxis === -1 || xAxis === xBoundary) return false;
  if (yAxis === -1 || yAxis === yBoundary) return false;
  if (partTwo) {
    let x = xAxis;
    let y = yAxis;
    while (!(x === -1 || x === xBoundary|| y === -1 || y === yBoundary)) {
      if (input[y][x] === 'L') return false;
      if (input[y][x] === '#') return true;
      x += dirX;
      y += dirY;
    }
    return false;
  }
  return input[yAxis][xAxis] === '#';
}



const checkAdjacentSeats = (input, xAxis, yAxis, isPartTwo) => {
  let seatCounter = 0;
  // Up, Down, Left, Right, Diagonal
  for (let i = 0; i < directions.length; i++) {
    const dir = directions[i];
    if (checkForOccupied(input, xAxis + dir.x, yAxis + dir.y, isPartTwo , dir)) seatCounter++;
  }
  return seatCounter;
}


const seatingSystem = (input, isPartTwo) => {
  let seatsChanged = true;
  let cond = isPartTwo ? 5 : 4;
  let initialInput = [...input]; // Initial input before each loop
  // Loop until initialInput isnt changed
  let counter = 0;
  while (seatsChanged) {
    const lines = [...initialInput];
    seatsChanged = false;
    for (let i = 0; i < lines.length; i++) {
      let currentLine = lines[i];
      let line ='';
      for (let j = 0; j < lines[i].length; j++) {
        let numOfOccupiedAdjSeats = checkAdjacentSeats(initialInput, j, i, isPartTwo);
        // If seat is empty and adjacent seats are empty turn it into L
        if (currentLine[j] === 'L' && numOfOccupiedAdjSeats === 0) {
          line += '#'
          seatsChanged = true;
          continue;
        }

        if (currentLine[j] === '#') {
          numOfOccupiedAdjSeats = checkAdjacentSeats(initialInput, j, i, isPartTwo)

          if (numOfOccupiedAdjSeats >= cond) {
           line += 'L';
            seatsChanged = true;
            continue;
          }
        }
        line += currentLine[j];
      }
      lines[i] = line;
    }
    // Turn the
    if (!seatsChanged) return getNumOfOccupiedSeats(lines) ;
    initialInput = [...lines];
  }
};

const partOne = seatingSystem(input, false);
console.log(partOne);
const partTwo = seatingSystem(input, true);
console.log(partTwo)