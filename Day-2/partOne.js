const fs = require("fs");
let entries = fs.readFileSync("passwordInput.txt", "utf8").split("\n");

let correctEntries = [];
let correctEntriesValue = 0;

function checkPassword(minimumValue, maximumValue, filtered) {

    let numberOfCharacters = filtered.length;
    if(numberOfCharacters <= maximumValue && numberOfCharacters >= minimumValue) return true;
    return false;

};

entries.forEach((entry) => {

    let data = entry.split(": ");
    let requirements = data[0];
    let password = data[1];
    let passwordCharacters = password.split("");

    let requirementsValues = requirements.split(" ");
    let minimumValue = parseInt(requirementsValues[0].split("-")[0]);
    let maximumValue = parseInt(requirementsValues[0].split("-")[1]);
    let character = requirementsValues[1];

    let filter = passwordCharacters.filter(char => char === character);
    let passwordIsCorrect = checkPassword(minimumValue, maximumValue, filter);

    console.log(`Password: ${entry}\nCharacter filter: ${character}\nMaximum Value: ${maximumValue}\nMinimum Value: ${minimumValue}`);

    if(passwordIsCorrect == true) {
        console.log(`Entry met character requirements.`);
        correctEntries.push(entry);
        correctEntriesValue = correctEntriesValue + 1;
    } else if(passwordIsCorrect !== true) {
        console.log(`Entry didn't meet character requirements`);
    }

    console.log(`Correct entries: ${correctEntries.join(", ")}\nNumber of correct entries: ${correctEntriesValue}`);

});