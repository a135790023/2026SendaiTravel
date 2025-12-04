
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
const publicVapidKey = 'BPhzHj_qD8wT5yXq-qD8wT5yXq-qD8wT5yXq-qD8wT5yXq'; 
// 這是只有伺服器知道的私鑰 (絕對不能外洩)
const privateVapidKey = 'YOUR_PRIVATE_VAPID_KEY_HERE';

// 設定 Web Push
// webpush.setVapidDetails(
//   'mailto:test@test.com',
//   publicVapidKey,
//   privateVapidKey
// );

// 暫存訂閱者 (在真實專案中應存入資料庫)
let subscriptions = [];

// 1. 訂閱端點
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
  
  // 立即發送一個歡迎通知
  const payload = JSON.stringify({ title: 'Sendai Trip', body: '推播訂閱成功！' });
  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

// 2. 廣播端點 (發送給所有人)
app.post('/broadcast', (req, res) => {
  const { title, body } = req.body;
  const payload = JSON.stringify({ title, body });

  Promise.all(subscriptions.map(sub => {
    webpush.sendNotification(sub, payload).catch(err => {
      console.error("Error sending notification, probably expired", err);
      // Remove expired subscription logic here...
    });
  }))
  .then(() => res.json({ success: true }))
  .catch(err => res.status(500).json({ error: err.message }));
});

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
