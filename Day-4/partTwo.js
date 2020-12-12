const fs = require("fs");
let passports = fs.readFileSync("passportInput.txt", "utf8").split(/\r?\n/).join(" ").split("  ");
let requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];

let currentPassportPosition = 0;
let validPassportFields = [];

function checkPassportTypeFields(fields) {
    //Invalidate the passport when there is more than 1 field missing.
    if(fields.length < requiredFields.length - 1) return false;
    //Validate the passport if only 1 field is missing and the field is cid.
    else if(fields.length == requiredFields.length - 1 && !(fields.includes("cid"))) return true;
    //Invalidate all other cases
    else { return; }
}

function validatePassportFields(passport) {
    validPassportFields.push(passport);
    console.log(`Passport fields valid.`);
}

passports.forEach((passport) => {

    let passportFieldsUnfiltered = passport.split(" ");
    let passportTypeFields = passportFieldsUnfiltered.map(pass => pass.split(":")[0]);
    let passportValueFields = passportFieldsUnfiltered.map(pass => pass.split(":")[1]);
    let filteredPassportFields = [];

    passportTypeFields.forEach((field) => {
        field.split("").splice(3, field.length - 3);
        filteredPassportFields.push(field);
    });

    currentPassportPosition = currentPassportPosition + 1;
    console.log(`Passport Number: ${currentPassportPosition}\nPassport Fields: ${filteredPassportFields}`);
    
    //Validator
    //If passport has all fields
    if(passportTypeFields.length == requiredFields.length) return validatePassportFields(passport);
    //If passport does not have all fields
    let passportFieldsIsValid = checkPassportTypeFields(filteredPassportFields);
    if(passportFieldsIsValid == true) validatePassportFields(passport);
    
});

console.log(`Passports with valid fields: ${validPassportFields.length}`);

//Part 2 essentials
let validPassports = [];

function checkValueRequirements(passportFields) {

    let fields = passportFields.split(":");
    let typeField = fields[0];
    let valueField = fields[1];
    let invalidFields = [];

    if(typeField == "byr" && (parseInt(valueField) < 1920 && parseInt(valueField) > 2002)) invalidFields.push(fields) && console.log("BYR invalid.");
    if(typeField == "iyr" && (parseInt(valueField) < 2010 && parseInt(valueField) > 2020)) invalidFields.push(fields) && console.log("IYR invalid.");
    if(typeField == "eyr" && (parseInt(valueField) < 2020 && parseInt(valueField) > 2030)) invalidFields.push(fields) && console.log("EYR invalid.");
    if(typeField == "hgt" && (valueField.endsWith("cm") || valueField.endsWith("in"))) {
        if(valueField.endsWith("cm"))
        {
            let valueFieldChars = valueField.split("");
            let heightMeasurement = parseInt(valueFieldChars.splice(valueFieldChars.length - 1, 2).join(""));
            if(heightMeasurement < 150 && heightMeasurement > 193) invalidFields.push(fields) && console.log(`HGT in cm is invalid: ${heightMeasurement}cm`);
        }
        if(valueField.endsWith("in"))
        {
            let valueFieldChars = valueField.split("");
            let heightMeasurement = parseInt(valueFieldChars.splice(valueFieldChars.length - 1, 2).join(""));
            if(heightMeasurement < 59 && heightMeasurement > 76) invalidFields.push(fields) && console.log(`HGT in in is invalid: ${heightMeasurement}in`);
        }
    }
    if(typeField == "hcl" && !(/^#[0-9a-f][6]$/.test(valueField))) invalidFields.push(fields) && console.log("HCL invalid.");
    let validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    if(typeField == "ecl" && !(validEyeColors.includes(valueField))) invalidFields.push(fields) && console.log("ECL invalid.");
    if(typeField == "pid" && (parseInt(valueField) == valueField && (valueField.split("").length != 9))) invalidFields.push(fields) && console.log(`PID invalid: ${valueField}`);
    return (invalidFields.length == 0 ? true : null);

}

function validatePassportAsAWhole(passport) {
    console.log(`Passport valid.`);
    validPassports.push(passport);
}

validPassportFields.forEach((validPassportField) => {

    let validatedFields = [];

    let passportFieldsUnfiltered = validPassportField.split(" ");
    passportFieldsUnfiltered.forEach((passportField) => {
        console.log(`Checking: ${passportField}`);
        let checkValues = checkValueRequirements(passportField);
        console.log(checkValues);
        if(checkValues == true) return validatedFields.push("Valid");
    });

    if(validatedFields.length == 7) validatePassportAsAWhole(validPassportField);
    console.log(validatedFields);
    
});

console.log(`Number of valid passports: ${validPassports.length}`);
console.log(`Valid passports:\n`, validPassports);
console.log(`There were originally ${validPassportFields.length} passports`);