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
  //Sign In User with Email and Password
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      msgBlock.style = "display: flex; background-color: #7CFC00";
      msgBlock.innerHTML = "<p>Login successful</p>";
      window.location.replace("./home");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      //   console.log(errorCode);
      msgBlock.style = "display: flex; background-color: #ff2400";
      if (errorCode === "auth/user-not-found") {
        // console.log(errorMessage);
        // alert("Email Id dose not exist");
        msgBlock.innerHTML = "<p>Email Id does not exist</p>";
      } else {
        msgBlock.innerHTML = "<p>Invalid details</p>";
        // alert("Invalid details");
      }
    });
}
