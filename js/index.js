console.log("Index.js has loaded");

window.addEventListener("load",init); //When page has loaded, call init function

function init(){
  getNewArticle() //Load the first article
  var btn1 = document.querySelector("#btn1");
  btn1.addEventListener("click", getNewArticle);
}

function getNewArticle(){
  console.log("Button has been pressed");
  fetch('http://localhost:3000')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
    });
}
