import { auth, db }

from "./firebase-config.js";

import {

ref,
onValue,
push,
set

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {

signOut,
onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ELEMENTS */

const tempEl =
document.getElementById("temp");

const humEl =
document.getElementById("hum");

const pmEl =
document.getElementById("pm");

const vriEl =
document.getElementById("vri");

const rainEl =
document.getElementById("rain");

const lightEl =
document.getElementById("light");

const vriStatus =
document.getElementById("vriStatus");

const predictionText =
document.getElementById("predictionText");

const alertText =
document.getElementById("alertText");

const accountInfo =
document.getElementById("accountInfo");

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

onAuthStateChanged(auth,(user)=>{

if(user){

accountInfo.innerHTML =

"🟢 " + user.email;

showPopup("☁ Connected To AERIS Cloud");

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

/* LIVE DATABASE */

const liveRef =
ref(db,"AERIS/live");

/* HISTORY SAVE TIMER */

let lastSavedMinute = "";

/* LIVE LISTENER */

onValue(liveRef,async(snapshot)=>{

const data = snapshot.val();

if(!data) return;

/* VALUES */

const temp = data.temp || 0;

const hum = data.hum || 0;

const pm = data.pm || 0;

const rain = data.rain || 0;

const light = data.light || 0;

const vri = data.vri || 0;

/* UPDATE UI */

tempEl.innerHTML = temp + "°C";

humEl.innerHTML = hum + "%";

pmEl.innerHTML = pm;

rainEl.innerHTML = rain;

lightEl.innerHTML = light;

vriEl.innerHTML = vri;

/* VRI STATUS */

if(vri >= 80){

vriStatus.innerHTML =

"🟢 Excellent Visibility";

vriStatus.style.color = "#00ff99";

}

else if(vri >= 50){

vriStatus.innerHTML =

"🟡 Moderate Visibility";

vriStatus.style.color = "#ffd000";

}

else{

vriStatus.innerHTML =

"🔴 Poor Visibility";

vriStatus.style.color = "#ff4444";

}

/* AI PREDICTION */

if(pm > 120){

predictionText.innerHTML =

"Heavy pollution expected in next few hours.";

}

else if(rain == 1){

predictionText.innerHTML =

"Rain detected. Visibility may improve.";

}

else if(hum > 90){

predictionText.innerHTML =

"High humidity may reduce visibility.";

}

else{

predictionText.innerHTML =

"Atmospheric conditions stable.";

}

/* ALERTS */

if(vri < 40){

alertText.innerHTML =

"⚠ Severe visibility reduction detected.";

alertText.style.color = "#ff4444";

}

else if(pm > 150){

alertText.innerHTML =

"⚠ Dangerous PM2.5 levels.";

alertText.style.color = "#ff4444";

}

else{

alertText.innerHTML =

"🟢 Environment Stable";

alertText.style.color = "#00ff99";

}

/* HISTORY SYSTEM */

const now = new Date();

const minuteKey =

now.getHours() + ":" + now.getMinutes();

/* SAVE ONCE PER MINUTE */

if(lastSavedMinute !== minuteKey){

lastSavedMinute = minuteKey;

try{

const historyRef =

push(ref(db,"AERIS/HISTORY"));

await set(historyRef,{

temp:temp,

hum:hum,

pm:pm,

rain:rain,

light:light,

vri:vri,

timestamp:now.toLocaleString(),

unix:Date.now()

});

console.log("📊 History Saved");

}

catch(error){

console.log(error);

}

}

});
