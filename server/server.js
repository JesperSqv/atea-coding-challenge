const express = require('express');
const app = express();
const http = require("http");
var fs = require('fs');

const file = fs.createWriteStream("file.txt");

http.get("http://tuftuf.gambitlabs.fi/feed.txt", response => {
    response.pipe(file);
});

try {  
    var data = fs.readFileSync('file.txt', 'utf8');
    console.log(data.toString());    
} catch(e) {
    console.log('Error:', e.stack);
}

const rawDataArray = [];

var arr = data.toString().split("\n");

for (var i = 1; i < arr.length; i++)
{
    rawDataArray.push(arr[i].split(":")[1]);
}
console.log(rawDataArray);
app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
    
})

app.listen(5000, () => { console.log("Server started on port 5000")});