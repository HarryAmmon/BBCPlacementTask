console.log("Index.js has loaded");
/*var data = fetch('http://localhost:3000/');

console.log("This is the data: "+ data);*/

fetch('http://localhost:3000')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
