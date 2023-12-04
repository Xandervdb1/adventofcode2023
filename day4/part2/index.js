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
        cards.push([winningNumbs, playingNumbs, 1]);
    });
    let totalCards = 0;
    cards.forEach((pCard, pIndex) => {
        const intersection = pCard[0].filter(el => pCard[1].includes(el));
        const winningAmount = intersection.length;
        let nextCardIndx = pIndex + 1;
        for (let i = winningAmount; i > 0; i --) {
            cards[nextCardIndx][2] += (1 * pCard[2]) ;
            nextCardIndx ++;
        }
    });
    cards.forEach((pCard) => {
        totalCards += pCard[2];
    });

    console.log(totalCards);
});