const CACHE_NAME = "aeris-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./dashboard.css",
  "./dashboard.js",
  "./charts.js",
  "./style.css",
  "./profile.html",
  "./profile.css",
  "./profile.js",
  "./admin.html",
  "./admin.css",
  "./admin.js",
  "./signup.html",
  "./prediction.js",
  "./alert.js",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install",(event)=>{

  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache)=>{
      return cache.addAll(urlsToCache);
    })
  );

  self.skipWaiting();

});

self.addEventListener("activate",(event)=>{

  event.waitUntil(
    clients.claim()
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
