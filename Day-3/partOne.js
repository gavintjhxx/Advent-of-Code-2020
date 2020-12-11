const fs = require("fs");
let mapRows = fs.readFileSync("mapInput.txt", "utf8").split("\n");
let scale = Math.ceil(mapRows.length * 3);
let bigMap = mapRows.map((row) => row.split("\r").join("").repeat(scale));

let xStepsToMove = 3;
let currentColumn;
let currentRow;
let entitiesMet = [];

bigMap.forEach((row) => {
    let entities = row.split("");
    if(typeof currentColumn == "number") currentColumn = currentColumn + xStepsToMove;
    if(typeof currentColumn !== "number") currentColumn = 0;
    if(typeof currentRow == "number") currentRow = currentRow + 1;
    if(typeof currentRow !== "number") currentRow = 0;
    entitiesMet.push(entities[currentColumn]);
    console.log(`XY: ${currentRow}, ${currentColumn}\nEntities In Row: ${entities.join("")}\nEntity Met: ${entities[currentColumn]}`);
});

let treesMet = entitiesMet.filter((entity) => entity === "#").length;

console.log(`Entities met: ${entitiesMet}`);
console.log(`Trees met: ${treesMet}`);

