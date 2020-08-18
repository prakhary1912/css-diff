const fs = require('fs');

const unusedHome = JSON.parse(fs.readFileSync('./unusedHome.txt', 'utf8'));
const unusedSearch = JSON.parse(fs.readFileSync('./unusedSearch.txt', 'utf8'));
const unusedPdp = JSON.parse(fs.readFileSync('./unusedPdp.txt', 'utf8'));
const unusedPlp = JSON.parse(fs.readFileSync('./unusedPlp.txt', 'utf8'));

function arraysInCommon(arrays){
  var i, common,
  L= arrays.length, min= Infinity;
  while(L){
      if(arrays[--L].length<min){
          min= arrays[L].length;
          i= L;
      }
  }
  common= arrays.splice(i, 1)[0];
  return common.filter(function(itm, indx){
      if(common.indexOf(itm)== indx){
          return arrays.every(function(arr){
              return arr.indexOf(itm)!= -1;
          });
      }
  });
}

const allArrays = [
    unusedHome,
    unusedSearch,
    unusedPdp,
    unusedPlp
];

const commonUnused = arraysInCommon(allArrays);
const x = arraysInCommon([unusedHome, unusedSearch]);
const y = arraysInCommon([unusedHome, unusedSearch, unusedPdp]);
const z = arraysInCommon([unusedHome, unusedSearch, unusedPdp, unusedPlp]);

console.log({
    x: x.length,
    y: y.length,
    z: z.length,
});

// const file = fs.createWriteStream('commonUnused.txt');
// commonUnused.forEach((el) => file.write(el + '\n'));
// file.end();
