const fs = require("fs");
fs.readFile("../data.txt", "utf-8", (err, data) => {
    if (err) {
        throw new Error("readFile: " + err);
    }
    let time;
    let distance;
    data.split(/\r?\n/).forEach((line) =>  {
        if (line.startsWith("Time: ")) {
            let separateTimes = line.split("Time: ")[1].match(/\d+/g);
            let string = "";
            separateTimes.forEach((time) => {
                string += time;
            });
            time = parseInt(string);
        }
        if (line.startsWith("Distance: ")) {
            let separateDists = line.split("Distance: ")[1].match(/\d+/g);
            let string = "";
            separateDists.forEach((dist) => {
                string += dist;
            });
            distance = parseInt(string);
        }
    });
    
    let amountOfWays = 0;
    for (let i = 0; i < time; i++) {
        let checkDistance = i * (time - i);
        if (checkDistance > distance) {
            amountOfWays++;
        }
    }

    console.log("Ways to beat the race: " + amountOfWays);
});