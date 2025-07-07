const CACHE_NAME = 'lotus-v1';
const urlsToCache = [
  './',
  './index.html',
  './apply.html',
  './reflect.html',
  './assets/styles/deceptive.css',
  './assets/styles/ethical.css',
  './global.js',
  './utils.js',
  './ui-components.js',
  './lotus_core.js',
  './autonomy_theater.js',
  './app.js',
  './data/usury_laws.json',
  './data/quiz_bank.json',
  './data/trap_scenarios.json',
  './data/ui_config.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
