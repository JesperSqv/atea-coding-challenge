const express = require('express');
const app = express();

var fs = require('fs');

try {  
    var data = fs.readFileSync('textfile.txt', 'utf8');
    console.log(data.toString());    
} catch(e) {
    console.log('Error:', e.stack);
}

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.listen(5000, () => { console.log("Server started on port 5000")});