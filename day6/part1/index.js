const fs = require("fs");
fs.readFile("../data.txt", "utf-8", (err, data) => {
    if (err) {
        throw new Error("readFile: " + err);
    }
    let times;
    let distances;
    data.split(/\r?\n/).forEach((line) =>  {
        if (line.startsWith("Time: ")) {
            times = line.split("Time: ")[1].match(/\d+/g).map(num => {
                return parseInt(num);
            });
        }
        if (line.startsWith("Distance: ")) {
            distances = line.split("Distance: ")[1].match(/\d+/g).map(num => {
                return parseInt(num);
            });
        }
    });
    let pairs = times.map((time, index) => {
        return {
            time: time,
            distance: distances[index]
        };
    });
    
    let amountOfWays= [];
    for(let i = 0; i < pairs.length; i++) {
        amountOfWays.push(0);
    }

    pairs.forEach((pPair, pIndex) => {
        for (let i = 0; i < pPair.time; i++) {
            let checkDistance = i * (pPair.time - i);
            if (checkDistance > pPair.distance) {
                amountOfWays[pIndex] += 1;
            }
        }
    });

    let result = 1;
    amountOfWays.forEach((num) => {
        result *= num;
    });

    console.log("All ways multiplied: " + result);
});