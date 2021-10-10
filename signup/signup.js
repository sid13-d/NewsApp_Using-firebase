function signup() {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var email = document.getElementById("emailId").value;
  var password = document.getElementById("password").value;

  //Sign In User with Email and Password
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      msgBlock.style = "display: flex; background-color: #7CFC00";
      msgBlock.innerHTML = "<p>Login successful</p>";
      window.location.replace("../home");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      msgBlock.style = "display: flex; background-color: #ff2400";
      if (errorCode === "auth/email-already-in-use") {
        msgBlock.innerHTML = "<p>Email Id already registered</p>";
      }
      console.log(errorMessage);
      console.log(errorCode);
    });
}
