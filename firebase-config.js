import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getDatabase }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* FIREBASE CONFIG */

const firebaseConfig = {

apiKey: "AIzaSyCFcOMkIMOSLhVuw_iFpBdrH5w2ABDMsXc",

authDomain: "aeris-dashboard.firebaseapp.com",

databaseURL: "https://aeris-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/",

projectId: "aeris-dashboard",

storageBucket: "aeris-dashboard.firebasestorage.app",

messagingSenderId: "782547152481",

appId: "1:782547152481:web:5dd3b9ccc6cde3dc04c420"

};

/* INITIALIZE FIREBASE */

const app = initializeApp(firebaseConfig);

/* SERVICES */

const auth = getAuth(app);

const db = getDatabase(app);

/* EXPORT SERVICES */

export { auth, db };
