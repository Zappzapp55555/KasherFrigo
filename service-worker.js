// Service worker minimal : met en cache l'app pour un fonctionnement hors-ligne
// après la première visite. N'a d'effet que si l'app est servie en http(s).
const CACHE_NAME = "kasher-frigo-v2";
const ASSETS = [
"./",
"./index.html",
"./styles.css",
"./app.js",
"./manifest.json",
"./data/ingredients.js",
"./data/recipes.js",
"./data/imagenet-map.js",
"./data/quick-ideas-defs.js",
"./data/i18n.js",
"./icons/icon-192.png",
"./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
);
self.skipWaiting();
});

self.addEventListener("activate", (event) => {
event.waitUntil(
caches.keys().then((keys) =>
Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
)
);
self.clients.claim();
});

self.addEventListener("fetch", (event) => {
// On ne met jamais en cache les appels vers des CDN externes (TensorFlow.js, modèle MobileNet)
if (!event.request.url.startsWith(self.location.origin)) return;

event.respondWith(
caches.match(event.request).then((cached) => {
return cached || fetch(event.request).then((response) => {
const clone = response.clone();
caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
return response;
}).catch(() => cached);
})
);
});
