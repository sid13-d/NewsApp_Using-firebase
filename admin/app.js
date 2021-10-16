// alert('hello');
const modalWrapper = document.querySelector(".modal-wrapper");
//addModal
const addModal = document.querySelector(".add-modal");
const addModalForm = document.querySelector(".add-modal .form");

const editModal = document.querySelector(".edit-modal");
const editModalForm = document.querySelector(".edit-modal .form");
const tableUser = document.querySelector(".user-table");
//addUser
const btnAdd = document.querySelector(".btn-addUser");
let id;

const getNews = () => {
  //get all newws
  tableUser.innerHTML = "";
  db.collection("news")
    .orderBy("id")
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

btnAdd.addEventListener("click", display);

function display() {
  addModal.classList.add("modal-show");
}

//user click outsde the model
window.addEventListener("click", (e) => {
  if (e.target === addModal) {
    addModal.classList.remove("modal-show");
  }
  if (e.target === editModal) {
    editModal.classList.remove("modal-show");
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
      modalWrapper.classList.remove("modal-show");
      alert("News successfully added");
      getNews();
    });
});

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

const getCategory = () => {
  var div = document.getElementById("category");
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
getCategory();
