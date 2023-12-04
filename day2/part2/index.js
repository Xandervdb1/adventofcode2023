const fs = require("fs");
fs.readFile("../data.txt", "utf-8", (err, data) => {
    if (err) {
        throw new Error("readFile: " + err);
    }
    let games = [];
    data.split(/\r?\n/).forEach((line, pGameIndx) =>  {
        let game = line.split(/: /)[1];
        let splitGame = game.split("; ");
        if (games[pGameIndx] === undefined) {
            games[pGameIndx] = [];
        }
        splitGame.forEach((pDraw, pDrawIndx) => {
            games[pGameIndx][pDrawIndx] = pDraw.split(", ");
        });
    });
    //sort the array + add missing/0 values
    games.forEach((pGame) => {
        pGame.forEach((pDraw) => {
            if (pDraw.length < 3) {
                pDraw = normalizeArray(pDraw);
            }
            pDraw.sort((a, b) => {
                const checkStringA = a.replace(/[^a-z]/g,"");
                const checkStringB = b.replace(/[^a-z]/g,"");
                if (checkStringA > checkStringB) {
                    return -1
                } else {
                    return 1
                }
            })
        })
    });

    let sum = 0;
    games.forEach((pGame, pGameIndx) => {
        let minAmounts = [];
        pGame.forEach((pDraw, pIndex) => {
            if (pIndex === 0) {
                for (let i = 0; i < pDraw.length; i++) {
                    let amount = parseInt(pDraw[i].replace(/[^0-9]/g,""));
                    minAmounts.push(amount);
                };
            } else {
                for (let i = 0; i < pDraw.length; i++) {
                    let amount = parseInt(pDraw[i].replace(/[^0-9]/g,""));
                    if (amount > minAmounts[i]) {
                        minAmounts[i] = amount;
                    }
                };
            }
        });
        let power = 1;
        minAmounts.forEach((pAmount) => {
            power *= pAmount;
        });
        sum += power;
    });

    console.log("the sum of the power of the min amount of cubes per game: " + sum)
});

const normalizeArray = (pArray) => {
    existingColors = [];
    checkArray = [];
    pArray.forEach((pColor) => {
        checkArray.push(pColor.replace(/[^a-z]/g,""))
    });
    //TODO: can loop over colors
    if (!checkArray.includes("blue")) {
        pArray.push("0 blue");
    }
    if (!checkArray.includes("red")) {
        pArray.push("0 red");
    }
    if (!checkArray.includes("green")) {
        pArray.push("0 green");
    }
    return pArray;
}