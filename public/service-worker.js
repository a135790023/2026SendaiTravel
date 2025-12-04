// public/service-worker.js

console.log('Service Worker Loaded...');

// 1. 監聽推播事件 (當伺服器發送訊息時觸發)
self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push Recieved...');

  // 設定通知的外觀
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon || '/icon.png', // 你可以換成你的 logo 路徑
    data: data.data // 這裡包含點擊後要跳轉的網址
  });
});

// 2. 監聽點擊事件 (當使用者點擊通知時觸發)
self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // 關閉通知

  // 取得後端傳來的網址，如果沒有就回到首頁
  const targetUrl = event.notification.data.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // 如果已經有開著的視窗，就切換過去
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // 如果沒有，就開新視窗
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});