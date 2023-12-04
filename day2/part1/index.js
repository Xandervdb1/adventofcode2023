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

    const cubeAmounts = [12, 13, 14];
    let possibleGamesIDs = [];
    games.forEach((pGame, pGameIndx) => {
        let impossibleDraws = [];
        pGame.forEach((pDraw) => {
            //check if a draw is possible
            for (let i = 0; i < pDraw.length; i++) {
                let amount = parseInt(pDraw[i].replace(/[^0-9]/g,""));
                if (amount > cubeAmounts[i]) {
                    //this is an impossible draw;
                    impossibleDraws.push(false);
                    break;
                }
            };
        });
        if (impossibleDraws.length === 0) {
            possibleGamesIDs.push(pGameIndx + 1)
        }
    });

    possibleGamesIDs = possibleGamesIDs.filter((pValue, pIndex, pArray) => {
        return pArray.indexOf(pValue) === pIndex;
    });

    let sum = 0;
    possibleGamesIDs.forEach((pGameID) => {
        sum += pGameID;
    });

    console.log("the sum of IDs of the games that are possible: " + sum);
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