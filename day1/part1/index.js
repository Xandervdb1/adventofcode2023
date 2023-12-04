const fs = require("fs");
fs.readFile("../data.txt", "utf-8", (err, data) => {
    if (err) {
        throw new Error("readFile: " + err);
    }
    let reducedNumbers = [];
    data.split(/\r?\n/).forEach(line =>  {
        var numbers = line.replace(/[^0-9]/g,"");
        if (numbers.length === 1) {
            reducedNumbers.push(numbers[0] + numbers[0]);
        } else {
            reducedNumbers.push(numbers[0] + numbers[numbers.length - 1]);
        }
    });
    sum = 0;
    reducedNumbers.forEach((number) => {
        sum += parseInt(number);
    });
    console.log("sum of all numbers: " + sum);
});