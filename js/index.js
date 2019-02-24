console.log("Index.js has loaded");

window.addEventListener("load", init); //When page has loaded, call init function
var loadedArticles = []; // Create empty array when page is loaded

function init() {
  var target = document.querySelector("#target"); // Get banner at top of site
  var btn1 = document.querySelector("#btn1"); // Get 'Next Article' button
  btn1.addEventListener("click", getJSON); // click event listener that calls functin getNewArticle when btn is clicked
  getJSON(); //Load the first article
}

function getJSON() {
  fetch('http://localhost:3000') // Send GET request to Server
    .then(function(response) { // Promise
      return response.json();
    })
    ////
    .then(function(myJson) { // Promise
      renderArticle(myJson);
      //storeArticle(myJson.title);
    });
}

/*
 * Stores the title for the ranking page to use
 * Might create an additional JSON file
 */
function storeArticle(title) {
  console.log(title+" has been stored");
  loadedArticles.push(title);
}
/*
 *
 */
 function loadArticleRanker(){
   // TODO: create form that allows user to rank each article
  var target = document.querySelector("#target");
  var h2 = document.createElement("h2");
  h2.textContent = "Rank each article where 1 was your favourite article and 5 was your least favourite";
  target.appendChild(h2);
  loadedArticles.forEach(function(article) {
    var p = document.createElement("p");
    p.textContent = article;
    target.appendChild(p);
    var select = document.createElement("select");
    for(var i = 1;i <= loadedArticles.length;i++){
      var option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      select.appendChild(option);
    }
    target.appendChild(select);
  var btn = document.querySelector("#btn1");
  btn.textContent = "Submit Ranking"
  btn.removeEventListener("click",getJSON);
  btn.addEventListener("click",submitRanking);
  });
 }
/*
 * Creates JSON file to send to server containing file title and rank
 */
 function submitRanking(){
   console.log("Thing has been done");
 }

/*
 * This function creates the article element
 */
function renderArticle(myJson) {
  if (loadedArticles.length >= 1) {
    clearScreen();
    console.log("Screen cleared");
    loadArticleRanker();
  } // all 5 article have been loaded
  else //continue as normal
  {
    try {
      clearScreen();
    } catch (NotFoundError) {
      console.log("NotFoundError")
    }
    var newArticle = document.createElement("article"); // Create new article element
    newArticle.id = 'article';
    var articleHeader = document.createElement("header"); // Create new header element
    var articleTitle = document.createElement("h2"); // Create new h2 element

    articleTitle.textContent = myJson.title; // Get article title from JSON and set add text to element
    storeArticle(articleTitle.textContent); // Stores the article title in an array
    console.log(loadedArticles.length);

    articleHeader.appendChild(articleTitle); // Append h2 element to header
    newArticle.appendChild(articleHeader); // Append header element to article
    myJson.body.forEach(function(item) {
      switch (item.type) {
        case 'heading':
          var heading = document.createElement("h3");
          heading.textContent = item.model.text; // Get heading from JSON and set text content
          articleHeader.appendChild(heading); // Append h3 element to header
          break;
        case 'paragraph':
          var p = document.createElement("p");
          p.textContent = item.model.text;
          newArticle.appendChild(p);
          break;
        case 'image':
          var image = document.createElement("img");
          image.src = item.model.url;
          image.altText = item.model.altText;
          image.height = item.model.height;
          image.width = item.model.width;
          newArticle.appendChild(image);
          break;
        case 'list':
          var list;
          if (item.model.type === 'unordered') {
            list = document.createElement("ul");
          } else if (item.model.type === 'ordered') {
            list = document.createElement("ol");
          }
          item.model.items.forEach(function(listText) {
            var li = document.createElement("li");
            li.textContent = listText;
            list.appendChild(li);
          })
          newArticle.appendChild(list);
      }
    })
    target.appendChild(newArticle); // Append article element to target
  }
}

function clearScreen(){
  var targetNode = document.querySelector("#target");
  while (targetNode.firstChild) {
    targetNode.removeChild(targetNode.firstChild);
  }
}
