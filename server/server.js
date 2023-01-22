const express = require('express');
const app = express();
const http = require("http");
const { getFloat, getLong, getInt8} = require('./functions.js')
var fs = require('fs');

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
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.listen(5000, () => { console.log("Server started on port 5000")});