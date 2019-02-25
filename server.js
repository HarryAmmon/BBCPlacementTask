const http = require('http'); // Should use https but unable to provide security certificates
const fs = require('fs'); // require the file system
const data = './data/'; // relative directory where articles are stored
var articleNames = []; // article titles are stored here
var articles = []; // Stores articles as JSON objects
var articleToSend = 0;

fs.readdirSync(data).forEach(file => { // Read file names in directory data
  articleNames.push(file); // and store them in an array
});

var articleNamesLength = articleNames.length;
console.log(articleNamesLength + " articles have been loaded");
for (var i = 0; i < articleNamesLength; i++) { // For the number of articles that have been read from data directory
  var articleToAdd = getRandomInt(articleNames.length); // Get a random number
  // Add JSON object from old array to a new array. Articles will not be in a random order
  articles.push(JSON.parse(fs.readFileSync(data + articleNames[articleToAdd], 'utf-8'))); // Add JSON object to array
  articleNames.splice(articleToAdd, 1); // Remove item from the first array so it can not be added twice
}

http.createServer(function(req, res) { // create server using http library
  console.log("This is req: " + req.method);
  console.log("This is res: " + res.method);
  if (req.method === "GET") { // If request is GET
    console.log("GET")
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.writeHead(200, {
      'Content-Type': 'text/plain' // Send 200 status message
    }); // Start write head

    var articleToSend = getRandomInt(articles.length); //Select random article to display
    res.write(JSON.stringify(articles[calcArticleToSend()])); // Send random article as a string
    res.end(); // End of response
  } else if (req.method === "POST") { // If request is POST
    console.log("POST");
    var body = " ";
    req.on("data", function(data) {                                             // Once recieved data from client
      body += data // Add data to body variable
      console.log("Partial body: " + body); // Display recieved string in console
    })
    req.on("end", function() {
      console.log("Body: " + body);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Request-Method", "*");
      res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.writeHead(200, {
        'Content-Type': 'text/plain'  // Send 200 status message
      });
      res.end("post received"); // End of response
    })
  }
}).listen(3000); // Serving is listening on port 3000

console.log("Server listening on port 3000");

/**
 * Returns random int between max and 0
 * @param int largest number
 * @return int random number
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Articles are read into an array in a random order
 * To prevent server crashing, this method ensures the index for what article to send never returns null
 */
function calcArticleToSend() {
  if (articleToSend >= articles.length - 1) {
    articleToSend = 0;
  } else {
    articleToSend++;
  }
  return articleToSend;
}
