var specialCharacters = ["!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","]","^","_","`","{","|","}","~"];
var numbers = ["0","1","2","3","4","5","6","7","8","9"];
var uppercaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowercaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


function inputValidate() {
    clear();
    var passwordLength = document.getElementById('passwordLengthField').value;
    if (passwordLength === "" || passwordLength === " " || passwordLength === "  " || passwordLength === "   ") {
        errorMessage("Do not leave password length field empty.");        
        return;
    }
    if (/[^0-9]/.test(passwordLength)){
        errorMessage("Only enter numbers in the password length field");
        return;
    }
    passwordLength = parseInt(passwordLength);
    if (passwordLength > 128 || passwordLength < 8) {
        errorMessage("Make sure your number is between 8 and 128");
        return;
    }
    generatePassword(passwordLength);
}

function generatePassword(passwordLength) {
    var userSelection = [];
    var newPassword = "";
    if (document.getElementById('specialCharactersYes').checked) {
        userSelection = userSelection.concat(specialCharacters);
    }
    if (document.getElementById('numbersYes').checked) {
        userSelection = userSelection.concat(numbers);
    }
    if (document.getElementById('lowercaseYes').checked) {
        userSelection = userSelection.concat(lowercaseLetters);
    }
    if (document.getElementById('uppercaseYes').checked) {
        userSelection = userSelection.concat(uppercaseLetters);
    }
    if (userSelection.length < 1) {
        errorMessage("Please select at least one option");
        return;
    }
    for (var i = 0; i < passwordLength; i++) {
        newPassword += userSelection[Math.floor(Math.random() * userSelection.length)];
    }
    document.getElementById("password").innerHTML = newPassword;
}

function copyNewPass() {
    document.querySelector("textarea").select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    return;
}

function errorMessage(x) {
    document.getElementById("errorContainer").innerHTML = x;
    document.getElementById("errorContainer").style.visibility = "visible";
    if (x === "Please select at least one option") {
        var pTags = document.getElementsByClassName("opTxt");
        for (var i = 0; i < 4; i++) {
            pTags[i].style.backgroundColor = "red";
        }
    }
    else {
    document.getElementById("passwordLengthField").style.border = "red 3px solid";
    }
}

function clear() {
    document.getElementById("errorContainer").style.visibility = "hidden";
    document.getElementById("passwordLengthField").style.border = "none";
    var pTags = document.getElementsByClassName("opTxt");
    for (var i = 0; i < 4; i++) {
        pTags[i].style.backgroundColor = "lightcoral";
    }
}