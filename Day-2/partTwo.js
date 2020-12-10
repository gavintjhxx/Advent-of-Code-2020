const fs = require("fs");
let entries = fs.readFileSync("passwordInput.txt", "utf8").split("\n");

let correctEntries = [];
let correctEntriesValue = 0;

function checkPassword(firstPosition, secondPosition, passwordCharacters, characterRequired) {

    let firstPosChar = passwordCharacters[firstPosition];
    let secondPosChar = passwordCharacters[secondPosition];
    if(firstPosChar !== secondPosChar && (firstPosChar == characterRequired || secondPosChar == characterRequired)) return true;
    return false;

};

entries.forEach((entry) => {

    let data = entry.split(": ");
    let requirements = data[0];
    let password = data[1];
    let passwordCharacters = password.split("");

    let requirementsValues = requirements.split(" ");
    let firstPosition = parseInt(requirementsValues[0].split("-")[0]) - 1;
    let secondPosition = parseInt(requirementsValues[0].split("-")[1]) - 1;
    let character = requirementsValues[1];

    let passwordIsCorrect = checkPassword(firstPosition, secondPosition, passwordCharacters, character);

    console.log(`Password: ${entry}\nCharacter filter: ${character}`);

    if(passwordIsCorrect == true) {
        console.log(`Entry met character requirements.`);
        correctEntries.push(entry);
        correctEntriesValue = correctEntriesValue + 1;
    } else if(passwordIsCorrect !== true) {
        console.log(`Entry didn't meet character requirements`);
    }

    console.log(`Correct entries: ${correctEntries.join(", ")}\nNumber of correct entries: ${correctEntriesValue}`);

});