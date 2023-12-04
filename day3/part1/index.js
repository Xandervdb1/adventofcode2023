const fs = require("fs");
let partNumbers = [];
fs.readFile("../data.txt", "utf-8", (err, data) => {
    if (err) {
        throw new Error("readFile: " + err);
    }
    let matrix = [];
    data.split(/\r?\n/).forEach(line =>  {
        matrix.push(line.split(""));
    });
    matrix = normalizeMatrix(matrix);
    matrix.forEach((pRow, pRowIndx) => {
        for (let i = 0; i < pRow.length; i++) {
            let foundNum = "";
            let numStartColIndx;
            let numEndColIndx;
            while(!isNaN(pRow[i])) {
                if (numStartColIndx === undefined) {
                    numStartColIndx = i;
                }
                foundNum += pRow[i];
                numEndColIndx = i;
                i++;
            }
            if (foundNum.length > 0 && numStartColIndx !== undefined && numEndColIndx !== undefined) {
                isPartNumber(foundNum, pRowIndx, numStartColIndx, numEndColIndx, matrix);
            }
        }
    });
    let sum = 0;
    partNumbers.forEach((pNum) => {
        sum += pNum;
    });

    console.log("sum of all the partnumbers: " + sum);
});

const isPartNumber = (pNum, pRowIndx, pStartCol, pEndCol, pMatrix) => {
    let isPartNumber = false;
    //CHECK LEFT 'N RIGHT
    if (pMatrix[pRowIndx][pStartCol - 1] !== "." && isNaN(pMatrix[pRowIndx][pStartCol - 1])) {
        isPartNumber = true;
    }
    if (pMatrix[pRowIndx][pEndCol + 1] !== "." && isNaN(pMatrix[pRowIndx][pEndCol + 1])) {
        isPartNumber = true;
    }

    //CHECK ABOVE
    let stringAbove = "";
    for (let i = pStartCol - 1; i < pEndCol + 2; i++) {
        stringAbove += pMatrix[pRowIndx - 1][i];
    }
    for(let i = 0; i < stringAbove.length; i++) {
        let pCharacter = stringAbove[i];
        if (pCharacter !== "." && isNaN(pCharacter)) {
            isPartNumber = true;
        }
    }
    //CHECK BELOW
    let stringBelow = "";
    for (let i = pStartCol - 1; i < pEndCol + 2; i++) {
        stringBelow += pMatrix[pRowIndx + 1][i];
    }
    for(let i = 0; i < stringBelow.length; i++) {
        let pCharacter = stringBelow[i];
        if (pCharacter !== "." && isNaN(pCharacter)) {
            isPartNumber = true;
        }
    }

    if (isPartNumber) {
        partNumbers.push(parseInt(pNum));
    }
}

const normalizeMatrix = (pMatrix) => {
    let normalizeArray = []
    for (let i = 0; i < pMatrix[0].length; i++) {
        normalizeArray.push(".");
    }
    normalizeArray.push(".", ".");
    for (let i = 0; i < pMatrix.length; i++) {
        pMatrix[i].push(".");
        pMatrix[i].unshift(".");
    }
    pMatrix.push(normalizeArray);
    pMatrix.unshift(normalizeArray);
    return pMatrix;
}
