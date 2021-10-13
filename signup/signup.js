function signup() {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var email = document.getElementById("emailId").value;
  var password = document.getElementById("password").value;
  var msgBlock = document.getElementById("msgBlock");
  var msg = document.getElementById("msg");

  //Sign In User with Email and Password
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      await db.collection("users").doc(email).set({
        email: email,
        username: username,
        password: password,
        lastLogin: Date.now(),
      });
      msgBlock.style = "display: block;";
      msg.innerHTML = "<h4>Signup successful</h4>";
      window.location.replace("../home");

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      msgBlock.style = "display: block;";
      if (errorCode === "auth/email-already-in-use") {
        msg.innerHTML =
          "<h4 style='margin-top: 15px;'>Email Id is already registered.</h4><i class='fa fa-close'></i>";
      } else {
        msg.innerHTML =
          "<h4 style='margin-top: 15px;'>Erro occured please try again.</h4><i class='fa fa-close'></i>";
      }
      console.log(errorMessage);
      console.log(errorCode);
    });
  msgBlock.addEventListener("click", (e) => {
    msgBlock.style = "display: none";
  });
}
