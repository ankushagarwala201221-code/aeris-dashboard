import { db }

from "./firebase-config.js";

import {

ref,
onValue

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* CHART SETUP */

const ctx =
document.getElementById("mainChart");

const chart = new Chart(ctx, {

type:"line",

data:{

labels:[],

datasets:[

{

label:"VRI",

data:[],

borderColor:"#00ffff",

backgroundColor:"rgba(0,255,255,0.12)",

fill:true,

tension:0.4,

borderWidth:3,

pointRadius:4,

pointBackgroundColor:"#00ffff"

}

]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{

color:"white",

font:{

size:14

}

}

}

},

scales:{

x:{

ticks:{

color:"white"

},

grid:{

color:"rgba(255,255,255,0.08)"

}

},

y:{

ticks:{

color:"white"

},

grid:{

color:"rgba(255,255,255,0.08)"

}

}

}

}

});

/* LIVE FIREBASE DATA */

const liveRef =
ref(db,"AERIS/live");

/* UPDATE CHART */

onValue(liveRef,(snapshot)=>{

const data = snapshot.val();

if(!data) return;

const vri = data.vri || 0;

/* TIME */

const time =
new Date().toLocaleTimeString();

/* PUSH DATA */

chart.data.labels.push(time);

chart.data.datasets[0].data.push(vri);

/* LIMIT */

if(chart.data.labels.length > 15){

chart.data.labels.shift();

chart.data.datasets[0].data.shift();

}

/* UPDATE */

chart.update();

});
