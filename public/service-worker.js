
// public/service-worker.js

console.log('Service Worker Loaded...');

// 1. Install Event - Skip waiting to activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 2. Activate Event - Claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// 3. Push Event
self.addEventListener('push', e => {
  console.log('Push Recieved...', e);
  
  let data = { title: 'New Notification', body: 'No content', icon: null, url: '/' };
  
  if (e.data) {
    try {
      data = e.data.json();
    } catch (err) {
      data.body = e.data.text();
    }
  }

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || 'https://cdn-icons-png.flaticon.com/512/2530/2530495.png', // Fallback icon
      data: { url: data.url || '/' }, // Encapsulate URL in data object
      vibrate: [200, 100, 200]
    })
  );
});

// 4. Notification Click Event
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  // Handle URL navigation
  const targetUrl = (event.notification.data && event.notification.data.url) ? event.notification.data.url : '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // Check if window is already open
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
