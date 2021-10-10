// import db from "../backend/db.js";

db.collection("dummy")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  });

function login() {
  event.preventDefault();
  var email = document.getElementById("emailId").value;
  var password = document.getElementById("password").value;
  var msgBlock = document.getElementById("msgBlock");
  var msg = document.getElementById("msg");
  //Sign In User with Email and Password
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      msgBlock.style = "display: block;";
      msg.innerHTML = "<h4>Login successful</h4>";
      window.location.replace("./home");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      //   console.log(errorCode);
      msgBlock.style = "display: block;";
      if (errorCode === "auth/user-not-found") {
        // console.log(errorMessage);
        // alert("Email Id dose not exist");
        msg.innerHTML = "<h4 style='margin-top: 15px;'>Email Id does not exist</h4>";
      } else {
        msg.innerHTML = "<h4 style='margin-top: 15px;'>Invalid details</h4>";
        // alert("Invalid details");
      }
    });

  window.addEventListener('click', e => {
    if (e.target === msgBlock) {
      msgBlock.style = "display: none";
    }
  })
}


