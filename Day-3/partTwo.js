const fs = require("fs");
let mapRows = fs.readFileSync("mapInput.txt", "utf8").split("\n");
let scale = Math.ceil(mapRows.length * 3);
let bigMap = mapRows.map((row) => row.split("\r").join("").repeat(scale));

let xStepsToMoveArr = [1, 3, 5, 7, 1]; // Last step move 2 steps downwards, utilize treesMetInEachOrder
let movedPosition;
let currentColumn;
let currentRow;
let currentStep;
let treesMetInEachOrder = [];
let entitiesMet = [];
let oddNumbers = [1, 3, 5, 7, 9];

xStepsToMoveArr.forEach((xStepsToMove) => {
    bigMap.forEach((row) => {

        if(typeof currentStep == "number") currentStep = currentStep + 1;
        if(typeof currentStep !== "number") currentStep = 0;
        //Remove odd numbers in entitiesMet
        let currentStepDigits = `${currentStep}`.split("");
        if(movedPosition == xStepsToMoveArr.length && oddNumbers.includes(currentStepDigits.length - 1)) return console.log("Odd number steps met.");
        let entities = row.split("");
        if(typeof currentColumn !== "number") currentColumn = 0;
        if(typeof currentColumn == "number") currentColumn = currentColumn + xStepsToMove;
        if(typeof currentRow == "number") currentRow = currentRow + 1;
        if(typeof currentRow !== "number") currentRow = 0;
        if(typeof movedPosition == "number") movedPosition = movedPosition + 1;
        if(typeof movedPosition !== "number") movedPosition = 1;
        console.log(`XY: ${currentRow}, ${currentColumn}\nEntity Met: ${entities[currentColumn]}`);
        entitiesMet.push(entities[currentColumn]);
    });
    treesMetInEachOrder.push(entitiesMet.filter((entity) => entity === "#").length);
});

console.log(treesMetInEachOrder);
let totalProductOfTreesMet = treesMetInEachOrder.reduce((product, num) => product * num, 1);
console.log(`Total product of trees met is: ${totalProductOfTreesMet}`);