const CACHE_NAME = "aeris-v3";

const urlsToCache = [
  "/aeris-dashboard/",
  "/aeris-dashboard/index.html",
  "/aeris-dashboard/dashboard.html",
  "/aeris-dashboard/dashboard.css",
  "/aeris-dashboard/dashboard.js",
  "/aeris-dashboard/charts.js",
  "/aeris-dashboard/style.css",
  "/aeris-dashboard/profile.html",
  "/aeris-dashboard/profile.css",
  "/aeris-dashboard/profile.js",
  "/aeris-dashboard/admin.html",
  "/aeris-dashboard/admin.css",
  "/aeris-dashboard/admin.js",
  "/aeris-dashboard/signup.html",
  "/aeris-dashboard/manifest.json",
  "/aeris-dashboard/icon-192.png",
  "/aeris-dashboard/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
