const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

function renderDetails(item) {
  var div = document.createElement("div");
  div.className = "info";
  // console.log(item);
  var date = new Date(item.data().date.seconds * 1000);
  date = date.toGMTString();
  div.innerHTML = `
    <span class="info-category" id="info-category">${
      item.data().category
    }</span>
    <div class="img-container">
      <img
        src=${item.data().img_url}
        alt="" class="img" />
    </div>
    <span class="title" id="title">${item.data().title}</span>
    <span class="date">${date}</span>

    <span class="description">
     ${item.data().news_desc}
    </span>
  
    `;
  return div;
}

function getCategory() {
  var div = document.getElementById("category");
  db.collection("news")
    .doc(urlParams.get("id"))
    .get()
    .then((item) => {
      div.appendChild(renderDetails(item));
    });
}

getCategory();

{
  /* <a href="./details.html?id=1244" style="text-decoration: none">
<div class="trending-new-card">
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlKb8AN5vJkA594e4NlhfNKRiWAiHQq492mw&usqp=CAU"
    class="trending-news-img" alt="" />
  <div class="trending-new-info">
    <h3 class="news-subtitles">subtitles</h3>
    <h2 class="news-heading">heading</h2>
    <p class="news-date">date</p>
  </div>
</div>
</a> */
}
function renderPopoular(item) {
  var div = document.createElement("div");
  var date = new Date(item.data().date.seconds * 1000);
  date = date.toGMTString();
  div.innerHTML = `
    <a href="./details.html?id=${item.id}" style="text-decoration: none">
    <div class="trending-new-card">
      <img
        src=${item.data().img_url}
        class="trending-news-img" alt="" />
      <div class="trending-new-info">
        <h3 class="news-subtitles">${item.data().category}</h3>
        <h2 class="news-heading">${item.data().title}</h2>
        <p class="news-date">${date}</p>
      </div>
    </div>
  </a>
     `;
  return div;
}

function getPopular() {
  var div = document.getElementById("popular-container");
  db.collection("news")
    .orderBy("date", "desc")
    .limit(3)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((item) => {
        div.appendChild(renderPopoular(item));
      });
    });
}
getPopular();
