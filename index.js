// import db from "../backend/db.js";

db.collection('dummy').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        console.log(doc.data());
    });
})


document.getElementById('submit').addEventListener('click', login)

function login() {
    var email = document.getElementById('usr-input').value;
    var password = document.getElementById('pass-input').value;

    console.log('calling')
    //Sign In User with Email and Password
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
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

