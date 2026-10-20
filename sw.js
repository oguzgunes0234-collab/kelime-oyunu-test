// Otomatik üretildi — elle düzenleme.
const CACHE = 'kelime-oyunu-mvgcc5yi';
const ASSETS = ["./","./assets/ana-sayfa-koyu-BAgz0-rG.webp","./assets/bulmaca-koyu-_xUlz7XY.webp","./assets/index-DVoshNSc.css","./assets/index.esm-wN4cMaii.js","./assets/index-CP_l5qOo.js","./icon-192.png","./icon-512-maskable.png","./icon-512.png","./icon.svg","./manifest.webmanifest","./yasal/gizlilik.html","./yasal/kosullar.html","./yasal/kvkk.html","./yasal/privacy.html","./yasal/terms.html","./yasal/yasal.css"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('kelime-oyunu-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    // Sayfa: önce ağ (güncel sürüm), ağ yoksa önbellekteki kabuk.
    event.respondWith(fetch(req).catch(() => caches.match('./')));
    return;
  }
  event.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
