console.log("Index.js has loaded");

window.addEventListener("load",init); //When page has loaded, call init function
var target;
function init(){
  //getJSON() //Load the first article
  target = document.querySelector("#target");                                   // Get banner at top of site
  var btn1 = document.querySelector("#btn1");                                   // Get 'Next Article' button
  btn1.addEventListener("click", getJSON);                                      // click event listener that calls functin getNewArticle when btn is clicked
}

function getJSON(){
  //console.log("Button has been pressed"); // Testing purpose
  fetch('http://localhost:3000')                                                // Send GET request to Server
    .then(function(response) {                                                  // Promise
      return response.json();
    })
    .then(function(myJson) {                                                    // Promise
      renderArticle(myJson);
      //console.log(myJson.title);                                                //Testing
    });
}
  /*
  * This function creates the article element and adds the title
  */
function renderArticle(myJson){
  try{
    var targetNode = document.querySelector("#target");
    while (targetNode.firstChild) {
      targetNode.removeChild(targetNode.firstChild);
    }
}
catch(NotFoundError){
  console.log("NotFoundError")
}
  var newArticle = document.createElement("article");                           // Create new article element
  newArticle.id = 'article';
  var articleHeader = document.createElement("header");                         // Create new header element
  var articleTitle = document.createElement("h2");                              // Create new h2 element

  articleTitle.textContent = myJson.title;                                      // Get article title from JSON and set add text to element

  articleHeader.appendChild(articleTitle);                                      // Append h2 element to header
  newArticle.appendChild(articleHeader);                                        // Append header element to article
  myJson.body.forEach(function (item){
    switch(item.type){
      case 'heading':
        var heading = document.createElement("h3");
        heading.textContent = item.model.text;                              // Get heading from JSON and set text content
        articleHeader.appendChild(heading);                                           // Append h3 element to header
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
        if (item.model.type === 'unordered'){
          list = document.createElement("ul");
        }
        else if (item.model.type === 'ordered') {
          list = document.createElement("ol");
        }
        item.model.items.forEach(function(listText){
          var li = document.createElement("li");
          li.textContent = listText;
          list.appendChild(li);
        })
        newArticle.appendChild(list);
    }
  })
  target.appendChild(newArticle);                                               // Append article element to target
}
