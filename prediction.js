import { db }

from "./firebase-config.js";

import {

ref,
onValue

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const predictionBox =
document.getElementById("predictionText");

onValue(ref(db,"AERIS/live"),(snap)=>{

const d = snap.val();
if(!d) return;

let msg = "Atmosphere Stable";

if(d.pm > 120){

msg = "⚠ Pollution may increase soon";

}

if(d.hum > 85){

msg = "🌫 Fog/low visibility possible";

}

if(d.rain == 1){

msg = "🌧 Rain improving air quality";

}

if(d.temp > 38){

msg = "🔥 Heat stress conditions possible";

}

if(predictionBox){

predictionBox.innerHTML = msg;

}

});
