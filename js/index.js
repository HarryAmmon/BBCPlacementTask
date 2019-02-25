window.addEventListener("load", init);                                          //When page has loaded, call init function
var loadedArticles = [];                                                        // Create empty array when page is loaded

/**
  * Gets html elements so that they are ready to be used by this script
  * Calls getJSON to load the first article
  */
function init() {
  var target = document.querySelector("#target");                               // Get banner at top of site
  var btn1 = document.querySelector("#btn1");                                   // Get 'Next Article' button
  btn1.addEventListener("click", getJSON);                                      // click event listener that calls functin getJSON when btn is clicked
  getJSON();                                                                    //Load the first article once page has loaded
}
/**
 *  Send request to server (http://localhost:3000) for article using a GET Request
 *  Handles error by logging to the console
 */
function getJSON() {
  fetch('http://localhost:3000',{                                               // Send GET request to server
    method: 'GET',                                                              // Method = GET
    mode: 'cors',                                                               // Mode = cors
  })
    .then(function(response) {                                                  // Promise that returns JSON file.
      return response.json();
    })
    .then(function(article) {                                                   // Promise that passes JSON file to
      renderArticle(article);                                                   // method render article.
    }).catch(error => console.error('Error: ',error));                          // Catches error and logs it in console
}
                                                                            // under errors.
/**
 *  Send article ranks to server (http://localhost:3000) using a POST Request
 *  Handles error by logging to the console
 *  @param string to be sent
 */
function sendJSON(data){
  fetch('http://localhost:3000',{                                               // Send POST request to server
    method: 'POST',                                                             // Method = POST
    body: data,                                                                 // body = JSON string to be sent
    mode: 'cors',                                                               // mode = corse
  }).then(function(response){                                                   // Promise that returns servers response
    return console.log(response);                                               // Log response to console
  }).catch(error => console.error('Error: ',error));                            // Catches error
}

/**
 * Stores the title for the ranking page to use
 * Might create an additional JSON file
 * @param string article title
 */
function storeArticle(title) {
  loadedArticles.push(title);                                                   // Adds article title to array loadedArticles
}
/**
 *  Loads the article ranking page without refreshing the page
 */
 var optionIDs = [];
 function loadArticleRanker(){
  var target = document.querySelector("#target");
  var h2 = document.createElement("h2");
  h2.textContent = "Rank each article where 1 was your favourite article and 5 was your least favourite";
  target.appendChild(h2);
  var j = 1;
  loadedArticles.forEach(function(article) {
    var p = document.createElement("p");
    p.textContent = article;
    target.appendChild(p);
    var select = document.createElement("select");
    select.id = "article"+j;
    optionIDs.push(select.id);
    j++;
    for(var i = 1;i <= loadedArticles.length;i++){
      var option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      select.appendChild(option);
    }
    target.appendChild(select);
  var btn = document.querySelector("#btn1");
  btn.textContent = "Submit Ranking";
  btn.removeEventListener("click",getJSON);
  btn.addEventListener("click",submitRanking);
  });
 }
/*
 * Creates JSON file to send to server containing file title and rank
 */
 function submitRanking(){
   var rankings= [];
   var tempObj = {};                                                            // Create new object rankings
   for(var i = 0;i<loadedArticles.length;i++){                                  // For every loaded article
     tempObj.title = loadedArticles;                                            // Add its title to object
     tempObj.rank = 2;//document.getElementById(optionIDs[i]).value;            // Add its rank to object
     rankings.push(tempObj);                                                    // Add object to 
   }
   sendJSON(JSON.stringify(rankings));
 }

/*
 * This function creates the article element
 */
function renderArticle(article) {
  if (loadedArticles.length >= 5) {                                             // all 5 article have been loaded
    clearScreen();                                                              // Remove article from screen
    loadArticleRanker();                                                        // Loads article ranking elements
  }
  else                                                                          //continue as normal
  {
    clearScreen();
    var newArticle = document.createElement("article");                         // Create new article element
    newArticle.id = 'article';
    var articleHeader = document.createElement("header");                       // Create new header element
    var articleTitle = document.createElement("h2");                            // Create new h2 element

    articleTitle.textContent = myJson.title;                                    // Get article title from JSON and set add text to element
    storeArticle(articleTitle.textContent);                                     // Stores the article title in an array
    console.log(loadedArticles.length);

    articleHeader.appendChild(articleTitle);                                    // Append h2 element to header
    newArticle.appendChild(articleHeader);                                      // Append header element to article
    article.body.forEach(function(item) {                                       // for each 'type' in JSON Object
      switch (item.type) {                                                      // Begenning of switch statement
        case 'heading':                                                         // If type is heading
          var heading = document.createElement("h3");                           // Create h3 element
          heading.textContent = item.model.text;                                // Get heading from JSON and set text content
          articleHeader.appendChild(heading);                                   // Append h3 element to header
          break;                                                                // Break from the switch statement
        case 'paragraph':
          var p = document.createElement("p");
          p.textContent = item.model.text;
          newArticle.appendChild(p);                                            // Append new element to the article
          break;                                                                // Break from the switch statement
        case 'image':
          var image = document.createElement("img");
          image.src = item.model.url;
          image.altText = item.model.altText;
          image.height = item.model.height;
          image.width = item.model.width;
          newArticle.appendChild(image);                                        // Append new element to the article
          break;                                                                // Break from the switch statement
        case 'list':
          var list;
          if (item.model.type === 'unordered') {                                // If statement that handles creation of both unorder and ordered list depending on the requirements
            list = document.createElement("ul");                                // Create list unordered
          } else if (item.model.type === 'ordered') {
            list = document.createElement("ol");                                // Create list ordered
          }
          item.model.items.forEach(function(listText) {                         // For each list element
            var li = document.createElement("li");                              // create list element
            li.textContent = listText;                                          // Add appropiate text
            list.appendChild(li);                                               // Add list elements to the list
          })
          newArticle.appendChild(list);                                         // Append new element to the article
          break;                                                                // Break from the switch statement
      }
    })
    target.appendChild(newArticle);                                             // Append article element to target
  }
}
/**
 * Removes all child nodes of target
 */
function clearScreen(){
  var targetNode = document.querySelector("#target");                           // Gets the target node
  while (targetNode.firstChild) {                                               // While the target node has a child
    targetNode.removeChild(targetNode.firstChild);                              // Remove it
  }
}
