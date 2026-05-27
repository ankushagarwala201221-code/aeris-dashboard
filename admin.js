import { auth, db }

from "./firebase-config.js";

import {

onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

ref,
onValue,
set,
get

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const adminPanel =
document.getElementById("adminPanel");

const accessDenied =
document.getElementById("accessDenied");

const liveData =
document.getElementById("liveData");

/* AUTH CHECK */

onAuthStateChanged(auth, async(user)=>{

if(!user){

window.location.href = "index.html";

return;

}

/* CHECK ROLE */

const userRef =
ref(db,"AERIS/USERS/" + user.uid);

const snap =
await get(userRef);

if(!snap.exists() || snap.val().role !== "admin"){

accessDenied.innerHTML =
"<h1>❌ ACCESS DENIED</h1>";

return;

}

/* GRANT ACCESS */

accessDenied.style.display = "none";

adminPanel.style.display = "block";

});

/* LIVE DB VIEW */

onValue(ref(db,"AERIS"),(snap)=>{

liveData.innerText =
JSON.stringify(snap.val(),null,2);

});

/* SYSTEM RESET */

document.getElementById("resetBtn")

.addEventListener("click",()=>{

set(ref(db,"AERIS/live"),{

temp:0,
hum:0,
pm:0,
rain:0,
light:0,
vri:0

});

alert("System Reset Done");

});
