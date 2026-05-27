const CACHE_NAME = "aeris-v1";

const urlsToCache = [

"./",
"./dashboard.html",
"./dashboard.css",
"./dashboard.js",
"./charts.js",
"./style.css",
"./profile.css",
"./profile.js",
"./admin.css",
"./admin.js",
"./prediction.js",
"./alert.js",
"./app.js"

];

self.addEventListener("install",(event)=>{

event.waitUntil(

caches.open(CACHE_NAME)
.then((cache)=>cache.addAll(urlsToCache))

);

});

self.addEventListener("fetch",(event)=>{

event.respondWith(

caches.match(event.request)
.then((response)=>{

return response || fetch(event.request);

})

);

});
