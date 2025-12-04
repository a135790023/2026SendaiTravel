
// Service Worker for offline support and notifications

const CACHE_NAME = 'sendai-trip-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch resources
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Handle Push Notifications from Server
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Sendai Trip';
  const options = {
    body: data.body || '新訊息通知',
    icon: 'https://cdn-icons-png.flaticon.com/512/2530/2530495.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/2530/2530495.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle Notification Click
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./')
  );
});
