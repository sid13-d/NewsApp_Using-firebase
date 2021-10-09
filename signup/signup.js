document.getElementById('submit').addEventListener('click', login)

function login() {
    var email = document.getElementById('usr-input').value;
    var password = document.getElementById('pass-input').value;

    console.log('calling')
    //Sign In User with Email and Password
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        // ...
    })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });


}