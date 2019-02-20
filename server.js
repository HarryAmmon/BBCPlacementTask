const http = require('http'); // Should use https but unable to provide security certificates
const fs = require('fs');
const data = './data/';
var articleNames = [];
var articles = [];

console.log("Server listening on port 3000");

fs.readdirSync(data).forEach(file => { // Read file names in directory data
  articleNames.push(file); // and store them in an array
});

articleNames.forEach(function(item){ // For each filename in array
  articles.push(JSON.parse(fs.readFileSync(data+item,'utf-8'))); // Read the JSON file and store in an array
})

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(JSON.stringify(articles[0]));
  res.end();
}).listen(3000);
