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
    .orderBy("id")
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
    .orderBy("id")
    .limit(2)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((item) => {
        div.appendChild(renderBottom(item));
      });
    });
}

bottomContainer();
