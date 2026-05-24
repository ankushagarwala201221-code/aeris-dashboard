// ================= FIREBASE =================

const firebaseConfig = {

apiKey: "AIzaSyCFcOMkIMOSLhVuw_iFpBdrH5w2ABDMsXc",

authDomain: "aeris-dashboard.firebaseapp.com",

databaseURL: "https://aeris-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app",

projectId: "aeris-dashboard",

storageBucket: "aeris-dashboard.firebasestorage.app",

messagingSenderId: "782547152481",

appId: "1:782547152481:web:5dd3b9ccc6cde3dc04c420"

};

// Start Firebase

firebase.initializeApp(firebaseConfig);

const db = firebase.database();


// ================= LIVE SENSOR VALUES =================

db.ref("AERIS/live").on("value", function(snapshot){

let data = snapshot.val();

if(data){

document.getElementById("temp").innerHTML =
data.temperature + " °C";

document.getElementById("humidity").innerHTML =
data.humidity + " %";

document.getElementById("pm25").innerHTML =
data.pm25 + " µg/m³";

document.getElementById("vri").innerHTML =
data.VRI;

}

});


// ================= CLICKABLE INFO SECTION =================

function showInfo(type){

let details=document.getElementById("details");

if(type=="pm"){

details.innerHTML=`

<h2>PM2.5 Information</h2>

<p>
PM2.5 consists of tiny particles in air.
High PM2.5 can reduce visibility by creating haze.
</p>

`;

}

else if(type=="humidity"){

details.innerHTML=`

<h2>Humidity Information</h2>

<p>
High humidity may create fog and reduce visibility.
</p>

`;

}

else if(type=="temp"){

details.innerHTML=`

<h2>Temperature Information</h2>

<p>
Temperature changes atmospheric conditions and may influence visibility.
</p>

`;

}

else if(type=="vri"){

details.innerHTML=`

<h2>Visibility Risk Index</h2>

<p>
VRI estimates visibility conditions.
Higher VRI = safer visibility.
Lower VRI = reduced visibility risk.
</p>

`;

}

}
