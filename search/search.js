async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var searchTerm = urlParams.get("search");

  var count = document.getElementById("search-results-count");

  //   console.log(urlParams.get("search"));
  if (searchTerm != null) {
    if (searchTerm.length > 0) {
      console.log(searchTerm.toLowerCase());
      var newsCollection = await db.collection("news").get();
      var result = [];
      newsCollection.forEach((item) => {
        var title = item.data().title.toLowerCase();
        if (title.includes(searchTerm.toLowerCase()) > 0) {
          result.push(item.data());
          addNewsPost(item.data(), item.id);
        }
      });
      if (result.length == 0) {
        noResultFound();
      }
      console.log(result);
      count.innerHTML = result.length;
    } else {
      console.log("Empty search");
    }
  } else {
    console.log("Empty search");
  }
}

search();

function addNewsPost(data, id) {
  var container = document.getElementById("results");
  var div = document.createElement("div");
  div.className = "middle-container";
  div.innerHTML = `   
          <div class="inner-element">
            <div class="upper-element">
              <h6 class="heading-company">${data.category}</h6>
              <span class="date">10:40 pm</span>
            </div>
            <h2 class="fields">${data.title}</h2>
            <div class="inner-navigations">
              <p style="margin: 0px">
                <i
                  class="fa fa-map-marker"
                  aria-hidden="true"
                  style="margin-left: 4px; margin-right: 6px"
                ></i
                >Location
              </p>

              <p style="margin: 0px">
                <i
                  class="fa fa-user"
                  aria-hidden="true"
                  style="margin-left: 9px; margin-right: 6px"
                ></i
                >Author
              </p>
            </div>
            <div class="news-description">
              <span clas
                >${data.news_desc}</span
              >
            </div>
            <div class="show-more">
              <a class="result" href="../details/details.html?id=${id}">Read more </a>
            </div>
          </div>
      `;
  container.appendChild(div);
}

function noResultFound() {
  var container = document.getElementById("results");
  var div = document.createElement("div");
  // div.className = "middle-container";

  div.innerHTML =
    "<img src=' https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result_still_2x.gif?compress=1&resize=400x300' style='width: 100%'/>";
  container.appendChild(div);
}
