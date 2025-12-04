
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
  
  // Default values
  let data = { title: 'New Notification', body: '無內容', icon: null, url: '/' };
  
  if (e.data) {
    try {
      // Robust Parsing
      const json = e.data.json();
      data = {
        title: json.title || data.title,
        body: json.body || data.body,
        icon: json.icon || data.icon,
        url: json.url || data.url
      };
    } catch (err) {
      console.log('Push data is not JSON, using text.');
      // Fallback: use raw text if JSON fails
      const text = e.data.text();
      if(text) data.body = text;
    }
  }

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || 'https://i.meee.com.tw/cYiweuS.jpg', // Updated Icon
      badge: 'https://i.meee.com.tw/cYiweuS.jpg', // Updated Badge
      data: { url: data.url },
      vibrate: [200, 100, 200],
      tag: 'sendai-notification', // Groups notifications
      renotify: true
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