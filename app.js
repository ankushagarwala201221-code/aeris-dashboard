import { auth, db }

from "./firebase-config.js";

import {

createUserWithEmailAndPassword,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithPopup,
signOut,
onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

ref,
set

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* GOOGLE PROVIDER */

const provider = new GoogleAuthProvider();

/* POPUP FUNCTION */

function showPopup(message){

const popup = document.getElementById("popup");

if(!popup) return;

popup.innerHTML = message;

popup.style.opacity = "1";

setTimeout(()=>{

popup.style.opacity = "0";

},4000);

}

/* SIGNUP */

const signupBtn = document.getElementById("signupBtn");

if(signupBtn){

signupBtn.addEventListener("click",()=>{

const name =
document.getElementById("name").value;

const username =
document.getElementById("username").value;

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

const confirmPassword =
document.getElementById("confirmPassword").value;

if(password !== confirmPassword){

showPopup("❌ Passwords do not match");

return;

}

createUserWithEmailAndPassword(

auth,
email,
password

)

.then((userCredential)=>{

const user = userCredential.user;

/* SAVE USER DATA */

set(

ref(db,"AERIS/USERS/" + user.uid),

{

name:name,

username:username,

email:email,

role:"viewer",

joined:new Date().toLocaleString(),

lastLogin:new Date().toLocaleString()

}

);

showPopup("🟢 Account Created");

window.location.href = "dashboard.html";

})

.catch((error)=>{

showPopup("❌ " + error.message);

});

});

}

/* LOGIN */

const loginBtn = document.getElementById("loginBtn");

if(loginBtn){

loginBtn.addEventListener("click",()=>{

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

signInWithEmailAndPassword(

auth,
email,
password

)

.then(()=>{

showPopup("🟢 Login Successful");

window.location.href = "dashboard.html";

})

.catch((error)=>{

showPopup("❌ " + error.message);

});

});

}

/* GOOGLE LOGIN */

const googleBtn = document.getElementById("googleBtn");

if(googleBtn){

googleBtn.addEventListener("click",()=>{

signInWithPopup(auth,provider)

.then(()=>{

showPopup("☁ Google Login Successful");

window.location.href = "dashboard.html";

})

.catch((error)=>{

showPopup("❌ " + error.message);

});

});

}

/* LOGOUT */

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",()=>{

signOut(auth)

.then(()=>{

showPopup("🚪 Logged Out");

window.location.href = "index.html";

});

});

}

/* SESSION CHECK */

onAuthStateChanged(auth,(user)=>{

if(user){

console.log("Logged In:", user.email);

}

else{

console.log("No Active Session");

}

});
