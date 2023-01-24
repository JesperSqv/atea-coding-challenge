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
} catch(e) {
    console.log('Error:', e.stack);
}

const rawDataArray = [0]; //Filler data

var arr = data.toString().split("\n");

for (var i = 1; i < arr.length; i++)
{
    rawDataArray.push(Number(arr[i].split(":")[1]));
}

app.get("/api", (req, res) => {
    res.json({ "measurements": [{"id": [1], "title": ["Flow Rate"], "data": [getFloat(1, rawDataArray)], "unit": ["m^3/h"]},
                                {"id": [2], "title": ["Energy Flow Rate"], "data": [getFloat(3, rawDataArray)], "unit": ["GJ/h"]},
                                {"id": [3], "title": ["Velocity"], "data": [getFloat(5, rawDataArray)], "unit": ["m/s"]},
                                {"id": [4], "title": ["Fluid sound speed"], "data": [getFloat(7, rawDataArray)], "unit": ["m/s"]},
                                {"id": [5], "title": ["Positive accumulator"], "data": [getLong(9, rawDataArray)]},
                                {"id": [6], "title": ["Positive decimal fraction"], "data": [getFloat(11, rawDataArray)]},
                                {"id": [7], "title": ["Negative accumulator"], "data": [getLong(13, rawDataArray)]},
                                {"id": [8], "title": ["Negative decimal fraction"], "data": [getFloat(15, rawDataArray)]},
                                {"id": [9], "title": ["Positive energy accumulator"], "data": [getLong(17, rawDataArray)]},
                                {"id": [10], "title": ["Positive energy decimal fraction"], "data": [getFloat(19, rawDataArray)]},
                                {"id": [11], "title": ["Negative energy accumulator"], "data": [getLong(21, rawDataArray)]},
                                {"id": [12], "title": ["Negative energy decimal fraction"], "data": [getFloat(23, rawDataArray)]},
                                {"id": [13], "title": ["Net accumulator"], "data": [getLong(25, rawDataArray)]},
                                {"id": [14], "title": ["Net decimal fraction"], "data": [getFloat(27, rawDataArray)]},
                                {"id": [15], "title": ["Net energy accumulator"], "data": [getLong(29, rawDataArray)]},
                                {"id": [16], "title": ["Net energy decimal fraction"], "data": [getFloat(31, rawDataArray)]},
                                {"id": [17], "title": ["Temperature #1/inlet"], "data": [getFloat(33, rawDataArray)], "unit": ["C"]},
                                {"id": [18], "title": ["Temperature #2/outlet"], "data": [getFloat(35, rawDataArray)], "unit": ["C"]},
                                {"id": [19], "title": ["Analog input AI3"], "data": [getFloat(37, rawDataArray)]},
                                {"id": [20], "title": ["Analog input AI4"], "data": [getFloat(39, rawDataArray)]},
                                {"id": [21], "title": ["Analog input AI5"], "data": [getFloat(41, rawDataArray)]},
                                {"id": [22], "title": ["Current input at AI3"], "data": [getFloat(43, rawDataArray)], "unit": ["mA"]},
                                {"id": [23], "title": ["Current input at AI3"], "data": [getFloat(45, rawDataArray)], "unit": ["mA"]},
                                {"id": [24], "title": ["Current input at AI3"], "data": [getFloat(47, rawDataArray)], "unit": ["mA"]},
                                {"id": [25], "title": ["PT100 resistance of inlet"], "data": [getFloat(77, rawDataArray)], "unit": ["Ω"]},
                                {"id": [26], "title": ["PT100 resistance of outlet"], "data": [getFloat(79, rawDataArray)], "unit": ["Ω"]},
                                {"id": [27], "title": ["Total travel time"], "data": [getFloat(81, rawDataArray)], "unit": ["μs"]},
                                {"id": [28], "title": ["Delta travel time"], "data": [getFloat(83, rawDataArray)], "unit": ["ns"]},
                                {"id": [29], "title": ["Upstream travel time"], "data": [getFloat(85, rawDataArray)], "unit": ["μs"]},
                                {"id": [30], "title": ["Downstream travel time"], "data": [getFloat(87, rawDataArray)], "unit": ["μs"]},
                                {"id": [31], "title": ["Output current"], "data": [getFloat(89, rawDataArray)], "unit": ["mA"]},
                                {"id": [32], "title": ["Working step"], "data": [getInt8(92, rawDataArray, 0)]},
                                {"id": [33], "title": ["Signal quality"], "data": [getInt8(92, rawDataArray, 1)]},
                                {"id": [34], "title": ["The rate of the measured travel time by the calculated travel time"], "data": [getFloat(97, rawDataArray)], "unit": ["%"]},
                                {"id": [35], "title": ["Reynolds number"], "data": [getFloat(99, rawDataArray)]} ] })
})

app.listen(5000, () => { console.log("Server started on port 5000")});