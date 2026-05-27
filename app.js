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
set,
get

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* GOOGLE PROVIDER */

const provider =
new GoogleAuthProvider();

/* POPUP */

function showPopup(message){

const popup =
document.getElementById("popup");

if(!popup) return;

popup.innerHTML = message;

popup.style.opacity = "1";

setTimeout(()=>{

popup.style.opacity = "0";

},4000);

}

/* CREATE USER PROFILE */

async function createUserProfile(user,data){

await set(

ref(db,"AERIS/USERS/" + user.uid),

{

name:data.name || "AERIS USER",

username:data.username || "user",

email:user.email,

uid:user.uid,

role:"viewer",

joined:new Date().toLocaleString(),

lastLogin:new Date().toLocaleString()

}

);

}

/* SIGNUP */

const signupBtn =
document.getElementById("signupBtn");

if(signupBtn){

signupBtn.addEventListener("click",async()=>{

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

/* VALIDATION */

if(

!name ||
!username ||
!email ||
!password ||
!confirmPassword

){

showPopup("❌ Fill all fields");

return;

}

if(password !== confirmPassword){

showPopup("❌ Passwords do not match");

return;

}

if(password.length < 6){

showPopup("❌ Password too short");

return;

}

try{

/* CREATE ACCOUNT */

const userCredential =

await createUserWithEmailAndPassword(

auth,
email,
password

);

const user =
userCredential.user;

/* SAVE PROFILE */

await createUserProfile(user,{

name,
username

});

showPopup("🟢 Account Created");

setTimeout(()=>{

window.location.href =
"dashboard.html";

},1500);

}

catch(error){

showPopup("❌ " + error.message);

console.log(error);

}

});

}

/* LOGIN */

const loginBtn =
document.getElementById("loginBtn");

if(loginBtn){

loginBtn.addEventListener("click",async()=>{

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

if(!email || !password){

showPopup("❌ Enter Email & Password");

return;

}

try{

await signInWithEmailAndPassword(

auth,
email,
password

);

showPopup("🟢 Login Successful");

setTimeout(()=>{

window.location.href =
"dashboard.html";

},1000);

}

catch(error){

showPopup("❌ " + error.message);

console.log(error);

}

});

}

/* GOOGLE LOGIN */

const googleBtn =
document.getElementById("googleBtn");

if(googleBtn){

googleBtn.addEventListener("click",async()=>{

try{

const result =

await signInWithPopup(auth,provider);

const user =
result.user;

/* CHECK PROFILE */

const userRef =
ref(db,"AERIS/USERS/" + user.uid);

const snapshot =
await get(userRef);

/* CREATE IF NOT EXISTS */

if(!snapshot.exists()){

await createUserProfile(user,{

name:user.displayName,

username:

user.email.split("@")[0]

});

}

showPopup("☁ Google Login Successful");

setTimeout(()=>{

window.location.href =
"dashboard.html";

},1000);

}

catch(error){

showPopup("❌ " + error.message);

console.log(error);

}

});

}

/* LOGOUT */

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",()=>{

signOut(auth)

.then(()=>{

showPopup("🚪 Logged Out");

setTimeout(()=>{

window.location.href =
"index.html";

},1000);

});

});

}

/* SESSION */

onAuthStateChanged(auth,(user)=>{

if(user){

console.log(

"🟢 Active Session:",
user.email

);

}

else{

console.log(

"🔴 No Active Session"

);

}

});
