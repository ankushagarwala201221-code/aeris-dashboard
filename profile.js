import { auth, db }

from "./firebase-config.js";

import {

onAuthStateChanged,
signOut

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

ref,
get

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* ELEMENTS */

const profileName =
document.getElementById("profileName");

const profileUsername =
document.getElementById("profileUsername");

const profileEmail =
document.getElementById("profileEmail");

/* POPUP */

function showPopup(message){

const popup =
document.getElementById("popup");

popup.innerHTML = message;

popup.style.opacity = "1";

setTimeout(()=>{

popup.style.opacity = "0";

},4000);

}

/* AUTH */

onAuthStateChanged(auth, async(user)=>{

if(user){

profileEmail.innerHTML =
user.email;

/* DATABASE USER */

const userRef =
ref(db,"AERIS/USERS/" + user.uid);

try{

const snapshot =
await get(userRef);

if(snapshot.exists()){

const data =
snapshot.val();

profileName.innerHTML =
data.name || "AERIS USER";

profileUsername.innerHTML =
"@" + (data.username || "user");

}

else{

profileName.innerHTML =
"AERIS USER";

profileUsername.innerHTML =
"@user";

}

showPopup("🟢 Profile Loaded");

}

catch(error){

showPopup("❌ " + error.message);

}

}

else{

window.location.href =
"index.html";

}

});

/* LOGOUT */

document.getElementById("logoutBtn")

.addEventListener("click",()=>{

signOut(auth)

.then(()=>{

showPopup("🚪 Logged Out");

window.location.href =
"index.html";

});

});
