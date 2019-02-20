const http = require('http'); // Should use https but unable to provide security certificates
const fs = require('fs');
const data = './data/';
var articles = [];

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
}).listen(3000);

console.log("Server listening on port 3000");

fs.readdirSync(data).forEach(file => {
  articles.push(file);
});

articles.forEach(function(item){
  console.log(item);
})

/*http.createServer(function(req, res){
  res.writeHead(200,{'contenttype': 'text/json'});
  //res.end(JSON.stringify(data));
  res.write("Here is some data");
  res.end();
  //res.end(JSON.stringify(articles[0]));
}).listen(3000);*/
