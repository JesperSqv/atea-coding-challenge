const express = require('express');
const app = express();
const http = require("http");
const { getFloat, getLong, getInt8} = require('./functions.js')
var fs = require('fs');
const { get } = require('https');
const { raw } = require('express');

const file = fs.createWriteStream("file.txt");

http.get("http://tuftuf.gambitlabs.fi/feed.txt", response => {
    response.pipe(file);
});

try {  
    var data = fs.readFileSync('textfile.txt', 'utf8');
    console.log(data.toString());    
} catch(e) {
    console.log('Error:', e.stack);
}

const rawDataArray = [0]; //Filler data

var arr = data.toString().split("\n");

for (var i = 1; i < arr.length; i++)
{
    rawDataArray.push(Number(arr[i].split(":")[1]));
}


console.log(rawDataArray);
console.log(rawDataArray.length);

console.log(getFloat(33, rawDataArray));

console.log(getLong(21, rawDataArray));

console.log(getInt8(92, rawDataArray, 0));
console.log(getInt8(92, rawDataArray, 1));

app.get("/api", (req, res) => {
    res.json({  "Flow Rate" : getFloat(1, rawDataArray),
                "Energy Flow Rate": getFloat(3, rawDataArray),
                "Velocity" : getFloat(5, rawDataArray),
                "Fluid sound speed" : getFloat(7, rawDataArray),
                "Positive accumulator" : getLong(9, rawDataArray),
                "Positive decimal fraction" : getFloat(11, rawDataArray),
                "Negative accumulator" : getLong(13, rawDataArray),
                "Negative decimal fraction" : getFloat(15, rawDataArray),
                "Positive energy accumulator" : getLong(17, rawDataArray),
                "Positive energy decimal fraction" : getFloat(19, rawDataArray),
                "Negative energy accumulator" : getLong(21, rawDataArray),
                "Negative energy decimal fraction" : getFloat(23, rawDataArray),
                "Net accumulator" : getLong(25, rawDataArray),
                "Net decimal fraction" : getFloat(27, rawDataArray),
                "Net energy accumulator" : getLong(29, rawDataArray),
                "Net energy decimal fraction" : getFloat(31, rawDataArray),
                "Temperature #1/inlet" : getFloat(33, rawDataArray),
                "Temperature #2/outlet" : getFloat(35, rawDataArray),
                "Analog input AI3" : getFloat(37, rawDataArray),
                "Analog input AI4" : getFloat(39, rawDataArray),
                "Analog input AI5" : getFloat(41, rawDataArray),
                "Current input at AI3" : getFloat(43, rawDataArray),
                "Current input at AI3" : getFloat(45, rawDataArray),
                "Current input at AI3" : getFloat(47, rawDataArray),
                "PT100 resistance of inlet" : getFloat(77, rawDataArray),
                "PT100 resistance of outlet" : getFloat(79, rawDataArray),
                "Total travel time" : getFloat(81, rawDataArray),
                "Delta travel time" : getFloat(83, rawDataArray),
                "Upstream travel time" : getFloat(85, rawDataArray),
                "Downstream travel time" : getFloat(87, rawDataArray),
                "Output current" : getFloat(89, rawDataArray),
                "Working step" : getInt8(92, rawDataArray, 0),
                "Signal quality" : getInt8(92, rawDataArray, 1),
                "The rate of the measured travel time by the calculated travel time" : getFloat(97, rawDataArray),
                "Reynolds number" : getFloat(99, rawDataArray) })
})

app.listen(5000, () => { console.log("Server started on port 5000")});