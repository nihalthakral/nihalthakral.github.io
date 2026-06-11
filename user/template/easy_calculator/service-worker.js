const CACHE_NAME = 'calc-v1';
const CACHE_FILES = [
  './calculator.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './config.js'
];

// Google Fonts URLs (offline ke liye pre-cache)
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700;800&display=swap'
];

// Install: files + fonts cache karo
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // Core files cache karo
      cache.addAll(CACHE_FILES);
      // Fonts alag se cache karo (fail hone pe bhi app chale)
      FONT_URLS.forEach(function(url) {
        fetch(url).then(function(res) {
          if (res.ok) cache.put(url, res);
        }).catch(function() {});
      });
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate: purane caches hata do
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch strategy:
// - HTML (navigate)  : Network-first → cache fallback
// - Fonts (Google)   : Cache-first → network fallback
// - Baaki assets     : Cache-first → network fallback
self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;

  const url = e.request.url;

  // HTML: hamesha network se lo taaki changes turant dikhen
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function(response) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(e.request, clone);
        });
        return response;
      }).catch(function() {
        return caches.match(e.request);
      })
    );
    return;
  }

  // Google Fonts: cache-first (fonts kabhi change nahi hote)
  if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(e.request).then(function(cached) {
        if (cached) return cached;
        return fetch(e.request).then(function(response) {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(e.request, clone);
            });
          }
          return response;
        }).catch(function() {});
      })
    );
    return;
  }

  // Baaki sab (icons, manifest): cache-first
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) return cached;
      return fetch(e.request).then(function(response) {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(e.request, clone);
          });
        }
        return response;
      });
    })
  );
});
