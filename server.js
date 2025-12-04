
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// VAPID Keys - 您可以在終端機執行 `npx web-push generate-vapid-keys` 產生新的金鑰並替換這裡
// 這是與前端溝通的公鑰 (需填入 constants.ts)
const publicVapidKey = 'BA9EFqigQF0HLsJisQtvcbWrjAvtz14BT9DKwaygnNJR51kPnY-TwH9Ui94sLEzZOS4FdOiXI-OKAUl1A2Mh-Fc'; 
// 這是只有伺服器知道的私鑰 (絕對不能外洩)
const privateVapidKey = 'wpUqQhxKlvFrlNZ_2ILgVlk2NuD2Tjf7vdWGZAKN1w8';

// 設定 Web Push
webpush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey
);

// 暫存訂閱者 (在真實專案中應存入資料庫)
let subscriptions = [];

// 暫存歷史訊息 (只留最近 3 則)
let messageHistory = [
  { title: '系統公告', message: '歡迎來到仙台之旅留言板！', time: '00:00' }
];

// 輔助函式：取得台灣時間字串 (HH:mm)
function getTaiwanTime() {
  const now = new Date();
  // 取得 UTC 時間 (毫秒)
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  // 加 8 小時 (台灣是 UTC+8)
  const taiwanTime = new Date(utc + (3600000 * 8));
  // 格式化為 HH:mm (使用 getHours/getMinutes 避免再次被時區轉換)
  const hours = taiwanTime.getHours().toString().padStart(2, '0');
  const minutes = taiwanTime.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// 1. 訂閱端點
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  // 避免重複訂閱
  const exists = subscriptions.find(sub => sub.endpoint === subscription.endpoint);
  if (!exists) {
    subscriptions.push(subscription);
  }
  res.status(201).json({});
  
  // 立即發送一個歡迎通知
  const payload = JSON.stringify({ title: 'Sendai Trip', body: '推播訂閱成功！歡迎使用推播服務。' });
  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

// 2. 取消訂閱端點
app.post('/unsubscribe', (req, res) => {
  const { endpoint } = req.body;
  // 移除該訂閱
  subscriptions = subscriptions.filter(sub => sub.endpoint !== endpoint);
  console.log(`Unsubscribed: ${endpoint}`);
  res.json({ success: true });
});

// 3. 取得歷史訊息端點 (新功能)
app.get('/messages', (req, res) => {
  res.json(messageHistory);
});

// 4. 廣播端點 (發送給所有人並存入歷史)
app.post('/broadcast', (req, res) => {
  const { title, message, url } = req.body;
  
  // 1. 存入歷史紀錄
  const timeString = getTaiwanTime();
  
  const newMessage = {
    title: title || '新通知',
    message: message || '無內容',
    time: timeString
  };
  
  // 加入開頭
  messageHistory.unshift(newMessage);
  // 只保留最近 3 則
  if (messageHistory.length > 3) {
    messageHistory.pop();
  }

  // 2. 發送推播
  const payload = JSON.stringify({ 
    title: title || '新通知', 
    body: message || '無內容', // Map 'message' from request to 'body' for push
    url: url, 
    icon: 'https://i.meee.com.tw/cYiweuS.jpg'
  });

  console.log("Broadcasting:", payload);

  Promise.all(subscriptions.map(sub => {
    webpush.sendNotification(sub, payload).catch(err => {
      if (err.statusCode === 410 || err.statusCode === 404) {
        // 訂閱已過期，從列表中移除
        console.log('Subscription expired, removing:', sub.endpoint);
        subscriptions = subscriptions.filter(s => s.endpoint !== sub.endpoint);
      } else {
        console.error("Error sending notification", err);
      }
    });
  }))
  .then(() => res.json({ success: true }))
  .catch(err => res.status(500).json({ error: err.message }));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
