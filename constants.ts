
import { DaySchedule, PackingItem } from './types';

export const TRIP_START_DATE = "2026-01-02T00:00:00+09:00"; // JST

// Reliable Unsplash URLs
const IMAGES = {
  plane: "https://icrvb3jy.xinmedia.com/solomo/article/b/5/1/b5194e1b-c5db-4b5b-964a-83a4d3b0d50e.jpeg",
  airport: "https://www.tabirai.net/tabirai-uploader/img/0005493/s8_0005493.jpg",
  sendaiStation: "https://s-style.machico.mu/wp-content/uploads/2023/10/S__86155302_0.jpg",
  gyutan: "https://i.imgur.com/0RNoOeh.jpg",
  hotel: "https://www.washingtonhotel.co.jp/rb/_data/cache/images/2025/05/28/1300_578_71c971338d420790ace53b39fe7af95bbee2e953.webp",
  driving: "https://image.card.tw.r10s.com/images/corp/campaign/1400/Toyota_04.jpg", // Snowy road
  yamadera: "https://www.visityamagata.jp/wp/wp-content/uploads/2024/07/%E4%BA%94%E5%A4%A7%E5%A0%821.jpg.webp",
  ginzan: "https://icrvb3jy.xinmedia.com/solomo/article/7/5/2/752e384b-d5f4-4d6e-b7ea-717d43c66cf2.jpeg",
  ryokan: "https://a0.muscache.com/im/pictures/hosting/Hosting-1287479416884768737/original/e2416226-99a4-4fd2-8bf8-95efb76d825f.jpeg?im_w=960", // Placeholder for Jihei
  snowMonsters: "https://i0.wp.com/journey.tw/wp-content/uploads/2023-10-17-191105-95.jpg?resize=1100%2C734&quality=99&ssl=1",
  skiing: "https://www.sundaytour.com.tw/upfiles/chinese/attractions/tw_attractions_caty01689064716.jpg",
  jupeer: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv483tj9y0eRsGkbZZHBYGPYzDecgCtxujhQ&s", // Zao Jupeer specific corrected
  onsen: "https://tripeditor.com/wp-content/uploads/2019/06/23230406/YL2H9091_1_1.jpg",
  tadami: "https://cdn.zekkei-japan.jp/images/spots/21abe1bdd12849942c42358e5884125d.jpg",
  castle: "https://static.gltjp.com/glt/data/article/21000/20615/20240205_180824_52942db3_w1920.webp",
  ouchijuku: "https://www.tohokukanko.jp/lsc/upfile/spot/0000/1546/1546_6_l.jpg",
  house: "https://a0.muscache.com/im/pictures/miso/Hosting-638600503361964053/original/c7a41eff-6b71-403f-a081-e19d64e06535.jpeg?im_w=960", // Placeholder for Sukagawa
  shopping: "https://static.gltjp.com/glt/data/directory/14000/13814/20221009_124102_3a40844d_w1920.webp",
  fuku: "https://i0.wp.com/journey.tw/wp-content/uploads/2023-11-29-153522-66.jpg?resize=1100%2C734&quality=99&ssl=1",
  tem: "https://www.ana.co.jp/japan-travel-planner/area/tohoku/miyagi/0000016/main.jpg"
};

/**
 * 導航修正說明：
 * 如果 Google Maps 導航位置不準確，請修改下方各行程的 `query` 欄位。
 */
export const ITINERARY: DaySchedule[] = [
  {
    date: "2026/01/02",
    dayOfWeek: "週五",
    title: "抵達仙台",
    items: [
      { 
        time: "11:50–16:00", 
        location: "TPE → SDJ (JX862)", 
        activity: "搭乘星宇航空前往仙台", 
        isTransport: true,
        image: IMAGES.plane,
        flight: {
          airline: "STARLUX Airlines",
          flightNo: "JX862",
          departure: { code: "TPE", city: "Taipei", terminal: "T1", time: "11:50" },
          arrival: { code: "SDJ", city: "Sendai", terminal: "I", time: "16:00" },
          duration: "3h 10m"
        }
      },
      { 
        time: "16:00–17:00", 
        location: "仙台機場", 
        activity: "入境、領行李 (1小時)", 
        query: "Sendai Airport 仙台空港",
        image: IMAGES.airport,
        description: "日本東北地區的重要門戶，通關速度通常比東京快。機場內有知名的毛豆奶昔可以嘗試。",
        tips: "出關後請先上廁所，租車櫃台在1樓國內線到達口附近。"
      },
      { 
        time: "17:40–18:10", 
        location: "仙台站", 
        activity: "移動、熟悉環境 (30分鐘)", 
        query: "Sendai Station",
        image: IMAGES.sendaiStation,
        description: "東北最大的交通樞紐，連接新幹線、JR及地鐵。",
        tips: "先回飯店放行李，再去吃晚餐。"
      },
      { 
        time: "18:15–19:15", 
        location: "たんや善治郎 五橋横丁別館", 
        activity: "晚餐：享用仙台牛舌", 
        query: "たんや善治郎 五橋横丁別館",
        image: IMAGES.gyutan,
        description: "仙台最著名的美食「厚切牛舌」。炭火燒烤的牛舌口感Q彈脆口，搭配麥飯與牛尾湯是經典套餐。",
        tips: "這間距離住宿位置走路約7分鐘。"
      },
      { 
        time: "21:00", 
        location: "仙台東口 R&B 飯店", 
        activity: "辦理入住 (Check-in)", 
        query: "R&B Hotel Sendai Higashiguchi R&Bホテル仙台東口",
        image: IMAGES.hotel,
        description: "位於仙台站東口步行可達的商務飯店，交通便利，周邊有超商。",
        tips: "請備妥所有人的護照以供影印。隔天早餐可以先去超商買好。"
      },
    ]
  },
  {
    date: "2026/01/03",
    dayOfWeek: "週六",
    title: "山寺與銀山溫泉",
    items: [
      { time: "08:00–09:00", location: "仙台東口 R&B 飯店", activity: "出發準備", query: "R&B Hotel Sendai Higashiguchi", image: IMAGES.hotel },
      { 
        time: "09:00–09:30", 
        location: "Toyota Rent a Car", 
        activity: "取車手續", 
        query: "Toyota Rent a Car Sendai Station East トヨタレンタカー 仙台駅東口店", 
        image: IMAGES.driving,
        description: "辦理租車手續。請務必攜帶台灣駕照正本與日文譯本。",
        tips: "檢查車況時請錄影存證。確認雪胎是否已安裝（冬季必備）。"
      },
      { 
        time: "10:30–11:30", 
        location: "立石寺（山寺）", 
        activity: "參拜、登山觀景", 
        query: "Yamadera Risshaku-ji Temple 宝珠山 立石寺",
        image: IMAGES.yamadera,
        description: "松尾芭蕉曾造訪的名剎，需攀登1015階石階才能到達奧之院。冬季雪景如水墨畫般絕美，從五大堂眺望山谷是經典視角。",
        openingHours: "08:00 - 17:00",
        tips: "階梯積雪非常滑，鞋子自己要多注意。爬山約需30分鐘。"
      },
      { time: "12:00–14:30", location: "山寺周邊", activity: "午餐、周邊散策", query: "Yamadera Station 山寺駅", image: IMAGES.yamadera },
      { 
        time: "15:20–17:50", 
        location: "銀山溫泉", 
        activity: "溫泉街觀光、拍照", 
        query: "Ginzan Onsen 銀山温泉",
        image: IMAGES.ginzan,
        description: "彷彿《神隱少女》場景的大正浪漫溫泉街。木造建築群在冬夜點燈下極具氛圍，是東北冬季最熱門的景點。",
        tips: "日落後的藍調時間（約16:30-17:00）拍照最美。遊客極多，停車場距離溫泉街有段距離，需搭乘接駁車或步行。"
      },
      { time: "18:00–19:00", location: "銀山溫泉周邊", activity: "晚餐", image: IMAGES.ginzan },
      { 
        time: "20:00", 
        location: "一棟貸旅籠 治兵衛 JIHEI", 
        activity: "辦理入住", 
        query: "一棟貸旅籠 治兵衛 JIHEI", 
        image: IMAGES.ryokan,
        description: "獨棟貸切的日式旅宿，能體驗傳統日本居住氛圍。適合團體入住。",
        tips: "請遵守民宿入住規則，保持安靜並分類垃圾。"
      },
    ]
  },
  {
    date: "2026/01/04",
    dayOfWeek: "週日",
    title: "藏王樹冰與滑雪",
    items: [
      { time: "06:00–07:00", location: "治兵衛 JIHEI", activity: "前往藏王", isTransport: true, image: IMAGES.ryokan },
      { 
        time: "07:30–08:30", 
        location: "藏王 Jupeer", 
        activity: "租借雪裝", 
        query: "Zao Base Center Jupeer 蔵王ベースセンタージュピア", 
        image: IMAGES.jupeer,
        description: "藏王滑雪場的大型基地中心，提供雪具、雪衣租借服務，更衣空間寬敞。",
        tips: "建議事先確認尺寸。租借時需填寫表格，請預留時間。"
      },
      { 
        time: "08:30–12:30", 
        location: "藏王樹冰", 
        activity: "搭纜車、觀賞樹冰", 
        query: "Zao Ropeway Sanroku Line 蔵王ロープウェイ 山麓線",
        image: IMAGES.snowMonsters,
        description: "世界罕見的自然奇觀「Snow Monsters」。需搭乘兩段纜車至山頂，沿途可俯瞰壯觀的樹冰原。",
        openingHours: "08:30 - 17:00",
        tips: "山頂溫度極低（約-10度至-15度），風大，請務必做好最高等級保暖（毛帽、手套、圍巾）。纜車排隊人潮眾多，建議一早就去。"
      },
      { time: "12:30–14:00", location: "藏王纜車山頂站", activity: "午餐、休息", query: "Zao Ropeway Summit Station 地蔵山頂駅", image: IMAGES.snowMonsters },
      { 
        time: "14:00–19:00", 
        location: "蔵王温泉滑雪場", 
        activity: "滑雪、雪上活動", 
        query: "Zao Onsen Ski Resort Uwanodai 蔵王温泉スキー場 上の台ゲレンデ",
        image: IMAGES.skiing,
        description: "東北最大級的滑雪場，擁有豐富的雪道變化。上面的台滑雪場適合初學者練習。",
        tips: "初學者建議請教練或在平緩區域練習。滑雪消耗體力，請適時補充水分與熱量。"
      },
      { time: "19:00–20:00", location: "Jupeer", activity: "歸還雪裝", query: "Zao Base Center Jupeer 蔵王ベースセンタージュピア", image: IMAGES.jupeer },
      { time: "20:30", location: "治兵衛 JIHEI", activity: "返回住宿", query: "一棟貸旅籠 治兵衛 JIHEI", image: IMAGES.ryokan },
    ]
  },
  {
    date: "2026/01/05",
    dayOfWeek: "週一",
    title: "福島泡湯與移動",
    items: [
      { time: "08:00–10:30", location: "移動至福島", activity: "長途移動", isTransport: true, image: IMAGES.fuku },
      { 
        time: "10:30–13:30", 
        location: "福島安達屋", 
        activity: "日歸泡湯", 
        query: "Takayu Onsen Adachiya 高湯温泉 安達屋",
        image: IMAGES.onsen,
        description: "位於標高750公尺的高湯溫泉，以混浴露天溫泉「大氣之湯」聞名。乳白色的硫磺泉質極佳，被譽為「藥湯」。",
        openingHours: "日歸溫泉 10:30 ～ 14:30（13:00最終受付） ",
        tips: "混浴區域可圍浴巾入浴。請勿在溫泉內使用手機拍照。刺青者可能無法進入公共池，請先確認。"
      },
      { time: "13:30–14:30", location: "安達屋周邊", activity: "午餐", query: "Takayu Onsen 高湯温泉", image: IMAGES.onsen },
      { time: "15:30–16:30", location: "須賀川民宿附近超市", activity: "採買晚餐食材", query: "ショッピングパークアスク", image: IMAGES.house },
      { 
        time: "16:30", 
        location: "須賀川包棟民宿", 
        activity: "Check-in、料理晚餐", 
        query: "37.315989794096986, 140.22586626702645", 
        image: IMAGES.house,
        description: "享受包棟民宿的樂趣，大家一起下廚料理晚餐，度過溫馨的夜晚。",
        tips: "使用廚房後請協助清理恢復原狀。注意垃圾分類規定。"
      },
    ]
  },
  {
    date: "2026/01/06",
    dayOfWeek: "週二",
    title: "會津若松與大內宿",
    items: [
      { time: "07:00–08:30", location: "民宿 → 只見川", activity: "移動", isTransport: true, image: IMAGES.tadami },
      { 
        time: "08:30–09:30", 
        location: "第一只見川橋拍攝點", 
        activity: "絕景攝影", 
        query: "No.1 Tadami River Bridge Viewpoint 第一只見川橋梁ビューポイント",
        image: IMAGES.tadami,
        description: "鐵道迷必訪聖地。可拍攝列車行經鐵橋倒映在川面上的夢幻絕景。冬季雪景更是經典。",
        tips: "需攀登步道至展望台。早上列車通過約：09:01 (往會津)、09:20 (往小出)。"
      },
      { 
        time: "10:30–11:30", 
        location: "會津若松城", 
        activity: "登城參觀", 
        query: "Tsuruga Castle 鶴ヶ城",
        image: IMAGES.castle,
        description: "又名「鶴城」，是日本唯一一座紅瓦天守閣。幕末戊辰戰爭的激戰地，充滿歷史故事。",
        openingHours: "08:30 - 17:00",
        tips: "天守閣內展示豐富的歷史文物。登上頂樓可眺望會津若松市區全景。"
      },
      { time: "11:30–13:00", location: "會津若松城周邊", activity: "午餐", image: IMAGES.castle },
      { 
        time: "13:30–16:30", 
        location: "大內宿", 
        activity: "漫遊茅草屋古街", 
        query: "Ouchi-juku 大内宿",
        image: IMAGES.ouchijuku,
        description: "與白川鄉合掌村齊名的茅草屋聚落，保留江戶時代宿場町的風貌。必吃特產是「大蔥蕎麥麵」（用整根大蔥當筷子吃）。",
        tips: "冬季遊客較少，更有古樸氛圍。名物「大蔥蕎麥麵」吃起來有點嗆辣，是獨特體驗。"
      },
      { time: "17:30", location: "須賀川包棟民宿", activity: "返回休息", query: "37.315989794096986, 140.22586626702645", image: IMAGES.house },
    ]
  },
  {
    date: "2026/01/07",
    dayOfWeek: "週三",
    title: "仙台購物與返程",
    items: [
      { time: "08:00–10:00", location: "民宿 → 宮城縣", activity: "移動", isTransport: true, image: IMAGES.sendaiStation },
      { 
        time: "10:00–11:00", 
        location: "金蛇水神社", 
        activity: "參拜財運神社", 
        query: "Kanahebisui Shrine 金蛇水神社", 
        image: IMAGES.tem,
        description: "以提升金運、商賣繁盛聞名的神社。境內有許多蛇紋石，據說用錢包磨擦可以增加財運。紫藤花季也非常有名。",
        openingHours: "08:00 - 16:00",
        tips: "參拜完可以在附設的SandoTerrace休息，品嚐以白蛇為意象的甜點與咖啡。"
      },
      { 
        time: "11:30–14:30", 
        location: "Mitsui Outlet Park", 
        activity: "購物、午餐", 
        query: "Mitsui Outlet Park Sendai Port 三井アウトレットパーク 仙台港",
        image: IMAGES.shopping,
        description: "東北最大的 Outlet Mall，匯集國內外知名品牌。摩天輪是其地標。",
        openingHours: "10:00 - 20:00",
        tips: "把握最後購物機會。服務中心提供退稅服務諮詢。午餐可在美食街解決。"
      },
      { time: "15:00–15:30", location: "豐田租車 仙台機場店", activity: "還車手續", query: "Toyota Rent a Car Sendai Airport トヨタレンタカー 仙台空港店", image: IMAGES.driving },
      { time: "15:30–17:25", location: "仙台機場", activity: "登機手續、免稅店", query: "Sendai Airport 仙台空港", image: IMAGES.airport },
      { 
        time: "17:25–20:35", 
        location: "SDJ → TPE (JX863)", 
        activity: "搭乘飛機返回台北", 
        isTransport: true, 
        image: IMAGES.plane,
        flight: {
          airline: "STARLUX Airlines",
          flightNo: "JX863",
          departure: { code: "SDJ", city: "Sendai", terminal: "I", time: "17:25" },
          arrival: { code: "TPE", city: "Taipei", terminal: "T1", time: "20:35" },
          duration: "4h 10m"
        }
      },
    ]
  },
];

export const WINTER_PACKING_LIST: PackingItem[] = [
  // 證件與重要物品
  { id: '1', category: '重要物品', text: '護照 (檢查效期)', completed: false },
  { id: '2', category: '重要物品', text: 'Visit Japan Web 截圖', completed: false },
  { id: '3', category: '重要物品', text: '駕照 + 日文譯本 (租車用)', completed: false },
  { id: '4', category: '重要物品', text: '日幣現金 & 信用卡 (海外回饋高)', completed: false },
  { id: '5', category: '重要物品', text: 'SIM 卡 / 漫遊開通', completed: false },
  
  // 衣物 (洋蔥式穿法)
  { id: '6', category: '衣物', text: '發熱衣 (Heattech) x3-4', completed: false },
  { id: '7', category: '衣物', text: '保暖中層 (刷毛/羊毛)', completed: false },
  { id: '8', category: '衣物', text: '防風防水厚外套 (Down Jacket)', completed: false },
  { id: '9', category: '衣物', text: '防水防滑雪靴', completed: false },
  { id: '10', category: '衣物', text: '保暖長褲 (內刷毛)', completed: false },
  { id: '11', category: '衣物', text: '毛帽 (遮耳)', completed: false },
  { id: '12', category: '衣物', text: '圍巾 & 手套 (防水佳)', completed: false },
  { id: '13', category: '衣物', text: '厚襪子 (羊毛襪)', completed: false },
  
  // 日常用品
  { id: '14', category: '生活', text: '牙刷牙膏 (部分飯店不提供)', completed: false },
  { id: '15', category: '生活', text: '高保濕乳液/護唇膏 (日本極乾)', completed: false },
  { id: '16', category: '生活', text: '暖暖包 (貼式/手握)', completed: false },
  { id: '17', category: '生活', text: '折疊傘 (耐風)', completed: false },
  
  // 電子與其他
  { id: '18', category: '電子', text: '行動電源', completed: false },
  { id: '19', category: '電子', text: '充電線 & 插頭 (日本電壓 100V)', completed: false },
  { id: '20', category: '其他', text: '常備藥品 (感冒/腸胃/止痛)', completed: false },
  { id: '21', category: '其他', text: '一顆期待的心', completed: false },
];
