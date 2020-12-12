const fs = require("fs");
let passports = fs.readFileSync("passportInput.txt", "utf8").split(/\r?\n/).join(" ").split("  ");
let requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];

let currentPassportPosition = 0;
let validPassports = [];

function checkPassportFields(fields) {
    //Invalidate the passport when there is more than 1 field missing.
    if(fields.length < requiredFields.length - 1) return false;
    //Validate the passport if only 1 field is missing and the field is cid.
    else if(fields.length == requiredFields.length - 1 && !(fields.includes("cid"))) return true;
    //Invalidate all other cases
    else { return; }
}

function validatePassport(passport) {
    validPassports.push(passport);
    console.log(`Passport valid.`);
}

passports.forEach((passport) => {

    let passportFields = passport.split(" ").map(pass => pass.split(":")[0]);
    console.log(passportFields);
    let filteredPassportFields = [];

    passportFields.forEach((field) => {
        field.split("").splice(3, field.length - 3);
        filteredPassportFields.push(field);
    });

    currentPassportPosition = currentPassportPosition + 1;
    console.log(`Passport Number: ${currentPassportPosition}\nPassport Fields: ${filteredPassportFields}`);
    
    //Validator
    //If passport has all fields
    if(passportFields.length == requiredFields.length) return validatePassport(passport);
    //If passport does not have all fields
    let passportIsValid = checkPassportFields(filteredPassportFields);
    if(passportIsValid == true) validatePassport(passport);
    
});

console.log(`Valid passports: ${validPassports.length}`);