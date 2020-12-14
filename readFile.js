const fs = require('fs');
module.exports = (fileName) => fs.readFileSync(`./${fileName}`, 'utf8').split('\n');