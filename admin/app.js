// alert('hello');
const modalWrapper = document.querySelector(".modal-wrapper");
//addModal
const addModal = document.querySelector(".add-modal");
const addModalForm = document.querySelector(".add-modal .form");

const editModal = document.querySelector(".edit-modal");
const editModalForm = document.querySelector(".edit-modal .form");

const addCategoryModal = document.querySelector(".add-category-modal");
const addCategoryForm = document.querySelector(".add-category-modal .form");

const addVideoModal = document.querySelector(".add-video-modal");
const addVideoForm = document.querySelector(".add-video-modal .form");

const addMatchModal = document.querySelector(".add-match-modal");
const addMatchForm = document.querySelector(".add-match-modal .form");

const tableUser = document.querySelector(".user-table");
//addUser
const btnAddNews = document.querySelector(".btn-addUser");
const btnAddCategory = document.querySelector(".addCategory");
const btnAddVideo = document.querySelector(".addVideo");
const btnAddMatch = document.querySelector(".addMatch");

let id;

const getNews = () => {
  //get all newws
  tableUser.innerHTML = "";
  db.collection("news")
    .orderBy("date")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().email);
        renderNews(doc);
      });
    });
};

getNews();

//create element and render the user
const renderNews = (doc) => {
  const tr = `
    <tr data-id = '${doc.data().id}'>
    <td>${doc.data().id}</td>
    <td>${doc.data().category}</td>
    <td>${doc.data().title}</td>
    <td>
        <button class="btn btn-edit">Edit</button>
    </td>
    <td>
        <button class="btn btn-delete">Delete</button>
    </td>
    </tr>
    `;
  tableUser.insertAdjacentHTML("beforeend", tr);

  //click delete news
  const btnDelete = document.querySelector(
    `[data-id='${doc.data().id}'] .btn-delete`
  );
  btnDelete.addEventListener("click", () => {
    db.collection("category")
      .doc(doc.data().category)
      .update({
        news_id: firebase.firestore.FieldValue.arrayRemove(doc.id),
      });
    db.collection("news")
      .doc(`${doc.id}`)
      .delete()
      .then(() => {
        console.log("document successfully deleted");
        getNews();
      })
      .catch((err) => {
        console.log("error in the document");
      });
  });
  //click edit news
  const btnEdit = document.querySelector(
    `[data-id='${doc.data().id}'] .btn-edit`
  );
  btnEdit.addEventListener("click", () => {
    editModal.classList.add("modal-show");
    id = doc.id;
    editModalForm.id.value = doc.data().id;
    editModalForm.category.value = doc.data().category;
    editModalForm.title.value = doc.data().title;
    editModalForm.desc.value = doc.data().news_desc;
    editModalForm.img_url.value = doc.data().img_url;
    // email: addModalForm.email.value,
  });
};

btnAddNews.addEventListener("click", () => {
  addModal.classList.add("modal-show");
  getCategory("category");
});

btnAddCategory.addEventListener("click", () => {
  addCategoryModal.classList.add("modal-show");
});

btnAddVideo.addEventListener("click", () => {
  addVideoModal.classList.add("modal-show");
  getCategory("categoryVideo");
});

btnAddMatch.addEventListener("click", () => {
  addMatchModal.classList.add("modal-show");
});

//user click outsde the model
window.addEventListener("click", (e) => {
  if (e.target === addModal) {
    addModal.classList.remove("modal-show");
  }
  if (e.target === editModal) {
    editModal.classList.remove("modal-show");
  }
  if (e.target === addCategoryModal) {
    addCategoryModal.classList.remove("modal-show");
  }
  if (e.target === addVideoModal) {
    addVideoModal.classList.remove("modal-show");
  }
  if (e.target === addMatchModal) {
    addMatchModal.classList.remove("modal-show");
  }
});

//click submit in add modal
addModalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection("news")
    .add({
      id: addModalForm.id.value,
      category: addModalForm.category.value,
      title: addModalForm.title.value,
      author: addModalForm.author.value,
      location: addModalForm.location.value,
      news_desc: addModalForm.desc.value,
      img_url: addModalForm.img_url.value,
      date: new Date(),
    })
    .then((res) => {
      addToCategory(addModalForm.category.value, res.id);
      addModal.classList.remove("modal-show");
      alert("News successfully added");
      getNews();
    });
});

// for adding the news id to the array of the category
const addToCategory = (category, id) => {
  db.collection("category")
    .doc(category)
    .update({
      news_id: firebase.firestore.FieldValue.arrayUnion(id),
    });
};

//click submit in edit modal
editModal.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("news")
    .doc(id)
    .update({
      id: editModalForm.id.value,
      category: editModalForm.category.value,
      title: editModalForm.title.value,
      news_desc: editModalForm.desc.value,
      img_url: editModalForm.img_url.value,
    })
    .then(() => {
      editModal.classList.remove("modal-show");
      alert("Updated successfully");
      getNews();
    });
});

// to add category to firebase
addCategoryForm.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection("category")
    .doc(addCategoryForm.name.value)
    .set({
      id: addCategoryForm.id.value,
      img_url: addCategoryForm.img_url.value,
      name: addCategoryForm.name.value,
      news_id: [],
      date: new Date(),
    })
    .then(() => {
      addCategoryModal.classList.remove("modal-show");
      alert("Category successfully added");
      console.log("added");
    });
});

// to addd video to firebase
addVideoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {
    id: addVideoForm.id.value,
    url: addVideoForm.url.value,
    category: addVideoForm.categoryVideo.value,
    date: new Date(),
  };
  console.log(data);
  db.collection("videos")
    .add(data)
    .then(() => {
      addVideoModal.classList.remove("modal-show");
      alert("Added successfully");
    });
});

// to add the match result to firebase
addMatchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {
    id: addMatchForm.id.value,
    team1_name: addMatchForm.team1_name.value,
    team1_score: addMatchForm.team1_score.value,
    team1_img: addMatchForm.team1_img.value,
    team2_name: addMatchForm.team2_name.value,
    team2_score: addMatchForm.team2_score.value,
    team2_img: addMatchForm.team2_img.value,
    desc: addMatchForm.desc.value,
    date: new Date(),
  };
  db.collection("sportsMatch")
    .add(data)
    .then(() => {
      addMatchModal.classList.remove("modal-show");
      alert("Added successfully");
    });
});

// to get the category for the dropdown
const getCategory = (id) => {
  var div = document.getElementById(id);
  div.innerHTML = "";
  db.collection("category")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var option = document.createElement("option");
        option.value = doc.id;
        option.innerHTML = doc.id;
        div.appendChild(option);
      });
    });
};
