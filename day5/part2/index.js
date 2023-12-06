//this one takes ages don't ever run it again
console.time("end");
const fs = require("fs");
const maps = [];
let min = undefined;
fs.readFile("../data.txt", "utf-8", (err, data) => {
    if (err) {
        throw new Error("readFile: " + err);
    }
    let mapContainer = [];
    let seeds = [];
    data.split(/\r?\n/).forEach((line) => {
        if (line.startsWith("seeds:")) {
            let seedsLine = line.split("seeds: ")[1];
            let seedsArr = seedsLine.split(" ");
            seedsArr = seedsArr.map(num => {
                return parseInt(num);
            })
            for (let i = 0; i < seedsArr.length; i++) {
                let pair = [seedsArr[i], seedsArr[i + 1]];
                seeds.push(pair);
                i++;
            }
            return;
        }
        if (line === "") {
            return;
        }
        if (line.endsWith(":")) {
            if (mapContainer.length > 0) {
                maps.push(mapContainer);
            }
            mapContainer = [];
            return;
        }
        //startRange - endRange - modifier
        const map = line.split(" ").map(num => {
            return parseInt(num);
        });
        const result = [map[1], map[1] + (map[2] - 1), map[0] - map[1]];
        mapContainer.push(result);

    });
    
    maps.push(mapContainer);
    seeds.forEach((pSeedPair, pIndex) => {
        //make a map of the first pair, delete and continue
        for (let i = 0; i < pSeedPair[1] - 1; i++) {
            calcLocation(pSeedPair[0]);
            pSeedPair[0] += 1;
        }
    });
    console.log("The closest location is at: " + min);
    console.timeEnd("end")
});

const calcLocation = (pSeed) => {
    for (let i = 0; i < maps.length; i++) {
        let mustContinue = false;
        for (let j = 0; j < maps[i].length; j++) {
            //maps[i][j]
            if (pSeed >= maps[i][j][0] && pSeed <= maps[i][j][1]) {
                pSeed = pSeed + maps[i][j][2];
                break;
            }
        }
    }
    if (min === undefined) {
        min = pSeed;
    } else if (pSeed < min) {
        min = pSeed;
    }
}
