const fs = require("fs");
fs.readFile("../data.txt", "utf-8", (err, data) => {
    if (err) {
        throw new Error("readFile: " + err);
    }
    let mapContainer = [];
    const maps = [];
    const seeds = [];
    data.split(/\r?\n/).forEach((line) =>  {
        if (line.startsWith("seeds:")) {
            line.split("seeds: ")[1].split(" ").forEach(function(pSeedNumb) {
                seeds.push(parseInt(pSeedNumb));
            });
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
    seeds.forEach((pSeed, pIndex) => {
        for (let i = 0; i < maps.length; i++) {
            let mustContinue = false;
            for (let j = 0; j < maps[i].length; j ++) {
                //maps[i][j]
                if (pSeed >= maps[i][j][0] && pSeed <= maps[i][j][1]) {
                    seeds[pIndex] = pSeed + maps[i][j][2];
                    pSeed = seeds[pIndex];
                    mustContinue = true;
                    break;
                }
            }
            if (mustContinue) {
                mustContinue = false;
                continue;
            }
        }
    });
    const min = Math.min(...seeds);
    console.log("The closest location is at: " + min);
});