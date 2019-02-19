const http = require('http'); // Should use https but unable to provide security certificates
const fs = require('fs');
const data = require('./data/article-1.json');

http.createServer(function(req, res){
  res.writeHead(200,{'contenttype': 'text/json'});
  //res.end(JSON.stringify(data));
  //res.end("Here is somed data");
  res.end(JSON.stringify(data));
}).listen(3000);

console.log("Server listening on port 3000")
