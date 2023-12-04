const fs = require("fs");
let score = 0;
fs.readFile("../data.txt", "utf-8", (err, data) => {
    if (err) {
        throw new Error("readFile: " + err);
    }
    const cards = [];
    data.split(/\r?\n/).forEach((line) =>  {
        line = line.split(/: /)[1];
        const card = line.split("|");
        const winningNumbs = card[0].split(" ").filter(Boolean);
        const playingNumbs = card[1].split(" ").filter(Boolean);
        cards.push([winningNumbs, playingNumbs]);
    });
    cards.forEach((pCard) => {
        const intersection = pCard[0].filter(el => pCard[1].includes(el));
        if(intersection.length > 0) {
            addToScore(intersection.length);
        }
    });

    console.log("The total points is: " + score);
});

const addToScore = (pWinningAmount) => {
    let cardScore = 1;
    if (pWinningAmount > 0) {
        for(let i  = 0; i < pWinningAmount - 1; i++) {
            cardScore *= 2;
        }
    }
    score += cardScore;
}