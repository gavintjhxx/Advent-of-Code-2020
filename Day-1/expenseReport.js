let entries = require("./expenseInput");

let firstEntry = 0;
let secondEntry = 0;
let thirdEntry = 0;
let loops = 0;
let multiplied = 0;
let got2020 = false;

function checkMatch(firstNumber, secondNumber, thirdNumber) {
    let result = firstNumber + secondNumber + thirdNumber;
    console.log(`First Number: ${firstNumber}\nSecond Number: ${secondNumber}\nThird Number: ${thirdNumber}\nAddition: ${result}`);
    if(result === 2020) return true;
    return false;
};

function multiply(firstNumber, secondNumber, thirdNumber) {
    firstEntry = firstNumber;
    secondEntry = secondNumber;
    thirdEntry = thirdNumber
    let result = firstEntry * secondEntry * thirdNumber; 
    if(result < multiplied) return;
    multiplied = result;
    got2020 = true;
}

entries.forEach((firstEntryValue) => {
    entries.forEach((secondEntryValue) => {
        entries.forEach((thirdEntryValue) => {

            let firstNumber = parseInt(firstEntryValue);
            let secondNumber = parseInt(secondEntryValue);
            let thirdNumber = parseInt(thirdEntryValue);
            if(firstNumber === secondNumber || secondNumber === thirdNumber) return;
            let valuesAddUp = checkMatch(firstNumber, secondNumber, thirdNumber);
            if(valuesAddUp == true) return multiply(firstNumber, secondNumber, thirdNumber);
            loops = loops + 1;

        });
    });
});

console.log(`The two digits are: ${firstEntry} and ${secondEntry}\nThe result of the two values multiplied is: ${multiplied}\nLoops: ${loops}\nGot 2020 at least once: ${got2020}`);