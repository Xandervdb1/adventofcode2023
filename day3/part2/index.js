const fs = require("fs");
let gearRatios = [];
fs.readFile("../data.txt", "utf-8", (err, data) => {
    if (err) {
        throw new Error("readFile: " + err);
    }
    let matrix = [];
    data.split(/\r?\n/).forEach(line => {
        matrix.push(line.split(""));
    });
    matrix = normalizeMatrix(matrix);
    matrix.forEach((pRow, pRowIndx) => {
        for (let i = 0; i < pRow.length; i++) {
            if (pRow[i] === "*") {
                findGearNumbers(pRowIndx, i, matrix);
            }
        }
    });
    let sum = 0;
    gearRatios.forEach((pNum) => {
        sum += pNum;
    });

    console.log("sum of all the gear ratios: " + sum);
});

const findGearNumbers = (pRowIndx, pColIndx, matrix) => {
    let foundNums = [];
    let topLeftNum = "";
    if (!isNaN(matrix[pRowIndx - 1][pColIndx - 1])) {
        let i = -1;
        let j = -1;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            topLeftNum = matrix[pRowIndx + i][pColIndx + j] + topLeftNum;
            j--;
        }
        i = -1;
        j = 0;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            topLeftNum = topLeftNum + matrix[pRowIndx + i][pColIndx + j];
            j++;
        }
        foundNums.push(parseInt(topLeftNum));
    }
    let topNum = "";
    if (!isNaN(matrix[pRowIndx - 1][pColIndx])) {
        let i = -1;
        let j = 0;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            topNum = matrix[pRowIndx + i][pColIndx + j] + topNum;
            j--;
        }
        i = -1;
        j = 1;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            topNum = topNum + matrix[pRowIndx + i][pColIndx + j];
            j++;
        }
        //see if we're not adding the same number twice
        if (foundNums[foundNums.length - 1] !== parseInt(topNum)) {
            foundNums.push(parseInt(topNum));
        }
    }
    let topRightNum = "";
    if (!isNaN(matrix[pRowIndx - 1][pColIndx + 1])) {
        let i = -1;
        let j = 1;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            topRightNum = matrix[pRowIndx + i][pColIndx + j] + topRightNum;
            j--;
        }
        i = -1;
        j = 2;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            topRightNum = topRightNum + matrix[pRowIndx + i][pColIndx + j];
            j++;
        }
        //see if we're not adding the same number twice
        if (foundNums[foundNums.length - 1] !== parseInt(topRightNum)) {
            foundNums.push(parseInt(topRightNum));
        }
    }


    let bottomLeftNum = "";
    if (!isNaN(matrix[pRowIndx + 1][pColIndx - 1])) {
        let i = 1;
        let j = -1;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            bottomLeftNum = matrix[pRowIndx + i][pColIndx + j] + bottomLeftNum;
            j--;
        }
        i = 1;
        j = 0;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            bottomLeftNum = bottomLeftNum + matrix[pRowIndx + i][pColIndx + j];
            j++;
        }
        foundNums.push(parseInt(bottomLeftNum));
    }
    let bottomNum = "";
    if (!isNaN(matrix[pRowIndx + 1][pColIndx])) {
        let i = 1;
        let j = 0;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            bottomNum = matrix[pRowIndx + i][pColIndx + j] + bottomNum;
            j--;
        }
        i = 1;
        j = 1;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            bottomNum = bottomNum + matrix[pRowIndx + i][pColIndx + j];
            j++;
        }
        //see if we're not adding the same number twice
        if (foundNums[foundNums.length - 1] !== parseInt(bottomNum)) {
            foundNums.push(parseInt(bottomNum));
        }
    }
    let bottomRightNum = "";
    if (!isNaN(matrix[pRowIndx + 1][pColIndx + 1])) {
        let i = 1;
        let j = 1;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            bottomRightNum = matrix[pRowIndx + i][pColIndx + j] + bottomRightNum;
            j--;
        }
        i = 1;
        j = 2;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            bottomRightNum = bottomRightNum + matrix[pRowIndx + i][pColIndx + j];
            j++;
        }
        //see if we're not adding the same number twice
        if (foundNums[foundNums.length - 1] !== parseInt(bottomRightNum)) {
            foundNums.push(parseInt(bottomRightNum));
        }
    }

    let leftNum = "";
    if (!isNaN(matrix[pRowIndx][pColIndx - 1])) {
        let i = 0;
        let j = -1;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            leftNum = matrix[pRowIndx + i][pColIndx + j] + leftNum;
            j--;
        }
        foundNums.push(parseInt(leftNum));
    }

    let rightNum = "";
    if (!isNaN(matrix[pRowIndx][pColIndx + 1])) {
        let i = 0;
        let j = 1;
        while (!isNaN(matrix[pRowIndx + i][pColIndx + j])) {
            rightNum = rightNum + matrix[pRowIndx + i][pColIndx + j];
            j++;
        }
        foundNums.push(parseInt(rightNum));
    }
    
    if (foundNums.length === 2) {
        gearRatios.push(foundNums[0] * foundNums[1]);
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
