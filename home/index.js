function getUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      db.collection("users")
        .doc(user.email)
        .get()
        .then((item) => {
          document.getElementById("user-name").innerHTML = item.data().username;
        });
    } else {
      document.location.href = "../index.html";
    }
  });
}
getUser();

// logout function
function logout() {
  firebase
    .auth()
    .signOut()
    .then((res) => {
      document.location.href = "../index.html";
    })
    .catch((error) => {
      console.error(error);
    });
}

function getCategories() {
  var container = document.getElementById("category-container");
  db.collection("category")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((item) => {
        var span = document.createElement("span");
        span.className = "category-name";
        span.innerHTML = item.id;
        container.appendChild(span);
      });
    });
}
getCategories();

function getHeadLines() {
  var container = document.getElementById("main-news-info");
  db.collection("news")
    .where("category", "==", "Politics")
    // .orderBy("date", "desc")
    .limit(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        container.innerHTML = "";
        container.innerHTML = `
          <img
              class="main-news-info-img"
              src=${doc.data().img_url}
              alt=""
            />
            <a
              href="../detials/details.html?id=${doc.id}"
              style="text-decoration: none; color: black"
            >
              <div class="main-news-sub">
                <div class="main-news-category-container">
                  <span class="news-info-category"> Politics </span>
                  <div>
                    <span class="date">27/012</span>
                    <i class="fas fa-map-marker-alt"></i>
                    <span class="location"> ${doc.data().location}</span>
                  </div>
                </div>
                <span class="main-info-title"
                  >${doc.data().title}
                </span>
              </div>
            </a>`;
      });
    });
}

getHeadLines();

const renderVideo = (item) => {
  var iframe = document.createElement("iframe");
  iframe.className = "video";
  iframe.src = item.url;
  //   <iframe class="video" src="https://www.youtube.com/embed/u11iUqbNUu0"></iframe>
  // iframe.className = ""
  return iframe;
};

function getVideos() {
  var div = document.getElementById("videos-container");
  db.collection("videos")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((item) => {
        div.appendChild(renderVideo(item.data()));
      });
    });
}
getVideos();

function renderMatchCard(item) {
  var div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
              <div>
                <div class="team">
                  <div>
                    <img
                      src=${item.team1_img}
                      class="team-logo"
                      alt=""
                    />
                    <span class="team-name">${item.team1_name}</span>
                  </div>
                  <span class="team-score">${item.team1_score}</span>
                </div>
                <div class="vs">VS</div>
                <div class="team">
                  <div>
                    <img
                      src=${item.team2_img}
                      class="team-logo"
                      alt=""
                    />
                    <span class="team-name">${item.team2_name}</span>
                  </div>
                  <span class="team-score">${item.team2_score}</span>
                </div>
              </div>
              <div class="short-description">
                ${item.desc}
              </div>
            </div>`;
  return div;
}

function getMatchResults() {
  var div = document.getElementById("ipl-news-container");
  db.collection("sportsMatch")
    .orderBy("date", "desc")
    .limit(2)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((item) => {
        div.appendChild(renderMatchCard(item.data()));
      });
    });
}
getMatchResults();

function renderBottom(item) {
  var div = document.createElement("div");
  div.innerHTML = `
  <a class="category-card" href="../detials/details.html?id=${item.id}">
      <img class="category-card-img"
      src=${item.data().img_url}
      alt="" />
      <span class="category-card-title">${item.data().title}</span>
  </a>
  `;
  return div;
}

function bottomContainer() {
  var div = document.getElementById("right-bottom");
  db.collection("news")
    .where("category", "==", "Sports")
    .limit(2)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((item) => {
        div.appendChild(renderBottom(item));
      });
    });
}

bottomContainer();
