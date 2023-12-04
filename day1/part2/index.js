const fs = require("fs");
fs.readFile("../data.txt", "utf-8", (err, data) => {
    if (err) {
        throw new Error("readFile: " + err);
    }
    let reducedNumbers = [];
    data.split(/\r?\n/).forEach((line, index) =>  {
        line = normalizeForStrings(line);
        var numbers = line.replace(/[^0-9]/g,"");
        reducedNumbers.push(numbers[0] + numbers[numbers.length - 1]);
    });
    sum = 0;
    reducedNumbers.forEach((number) => {
        sum += parseInt(number);
    });
    console.log("sum of all numbers: " + sum);
});

const normalizeForStrings = (pLine) => {
    const stringToNumberMap = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9"
    }
    let subString = "";
    for (let i = 0; i < pLine.length; i++) {
        subString = subString + pLine[i];
        Object.keys(stringToNumberMap).forEach((pNumberWord) => {
            if (subString.includes(pNumberWord)) {
                const lastLetter = pNumberWord[pNumberWord.length - 1];
                subString = subString + lastLetter;
                subString = subString.replace(pNumberWord, stringToNumberMap[pNumberWord]);
            }
        })
    }
    return subString;
}