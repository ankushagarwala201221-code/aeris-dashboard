import { db }

from "./firebase-config.js";

import {

ref,
onValue,
set

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* LIVE DATA */

const liveRef =
ref(db,"AERIS");

/* LISTENER */

onValue(liveRef,(snap)=>{

const data = snap.val();

document.getElementById("liveData")

.innerText = JSON.stringify(data,null,2);

});

/* SYSTEM STATUS */

onValue(ref(db,"AERIS/live"),(snap)=>{

if(snap.exists()){

document.getElementById("systemStatus")

.innerText = "ONLINE";

}

});

/* RESET SYSTEM */

window.resetSystem = function(){

set(ref(db,"AERIS/live"),{

temp:0,
hum:0,
pm:0,
rain:0,
light:0,
vri:0

});

alert("System Reset Done");

};
