const http = require('http'); // Should use https but unable to provide security certificates
const fs = require('fs');
const data = './data/';
var articleNames = [];
var articles = [];
var articleToSend = 0;

console.log("Server listening on port 3000");

fs.readdirSync(data).forEach(file => { // Read file names in directory data
  articleNames.push(file); // and store them in an array
});

var articleNamesLength = articleNames.length;
console.log("Article name length: " + articleNamesLength);
for (var i = 0; i < articleNamesLength; i++) {
  var articleToAdd = getRandomInt(articleNames.length);
  articles.push(JSON.parse(fs.readFileSync(data + articleNames[articleToAdd], 'utf-8')));
  articleNames.splice(articleToAdd, 1);
}

articles.forEach(function(item) {
  console.log(item.title);
})
console.log(articles.length);

http.createServer(function(req, res) {
      console.log("This is req: " + req.method);
      console.log("This is res: " + res.method);
      if (req.method === 'GET') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        }); // Start write head

        var articleToSend = getRandomInt(articles.length, 1); //Select random article to display
        res.write(JSON.stringify(articles[calcArticleToSend()])); // Send random article
        res.end(); // End write
      } else if (req.method === 'POST') {
        console.log('POST');
        var body = '';
        req.on('data', function(data) {
          body += data
          console.log('Partial body: ' + body)
        })
        req.on('end', function() {
            console.log('Body: ' + body)
            res.writeHead(200, {
              'Content-Type': 'text/plain'
            })
            res.end('post received')
          })
        }
      }).listen(3000);

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function calcArticleToSend() {
      if (articleToSend >= articles.length - 1) {
        articleToSend = 0;
      } else {
        articleToSend++;
      }
      return articleToSend;
    }
