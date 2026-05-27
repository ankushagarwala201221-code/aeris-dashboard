import { db }

from "./firebase-config.js";

import {

ref,
onValue

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const alertBox =
document.getElementById("alertText");

const vriBox =
document.getElementById("vri");

const pmBox =
document.getElementById("pm");

onValue(ref(db,"AERIS/live"),(snap)=>{

const d = snap.val();
if(!d) return;

/* ALERT LOGIC */

let alertMsg = "System Stable";

if(d.vri < 40){

alertMsg = "⚠ Severe visibility drop";

}

if(d.pm > 150){

alertMsg = "⚠ Dangerous pollution level";

}

if(d.rain == 1){

alertMsg = "🌧 Rain detected";

}

if(d.hum > 90){

alertMsg = "💧 High humidity risk";

}

/* UPDATE */

if(alertBox){

alertBox.innerHTML = alertMsg;

}

});
