
import { DaySchedule, PackingItem } from './types';

export const TRIP_START_DATE = "2026-01-02T00:00:00+09:00"; // JST

// Reliable Unsplash URLs
const IMAGES = {
  plane: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
  airport: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80",
  sendaiStation: "https://images.unsplash.com/photo-1554797589-72447550e562?auto=format&fit=crop&w=800&q=80",
  gyutan: "https://images.unsplash.com/photo-1544025162-d76690b67f11?auto=format&fit=crop&w=800&q=80",
  hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  driving: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?auto=format&fit=crop&w=800&q=80", // Snowy road
  yamadera: "https://images.unsplash.com/photo-1528360983277-13d9b670953d?auto=format&fit=crop&w=800&q=80",
  ginzan: "https://images.unsplash.com/photo-1546816040-6927e16d0046?auto=format&fit=crop&w=800&q=80",
  ryokan: "https://images.unsplash.com/photo-1498503182478-8b517d3017f1?auto=format&fit=crop&w=800&q=80", // Placeholder for Jihei
  snowMonsters: "https://images.unsplash.com/photo-1548777123-10d294833216?auto=format&fit=crop&w=800&q=80",
  skiing: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80",
  onsen: "https://images.unsplash.com/photo-1565427271421-4d05cb93361e?auto=format&fit=crop&w=800&q=80",
  tadami: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  castle: "https://images.unsplash.com/photo-1596423067809-5a8286df9359?auto=format&fit=crop&w=800&q=80",
  ouchijuku: "https://images.unsplash.com/photo-1565551381387-a2e6cb130090?auto=format&fit=crop&w=800&q=80",
  house: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", // Placeholder for Sukagawa
  shopping: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
};

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
        image: IMAGES.plane
      },
      { 
        time: "16:00–17:00", 
        location: "仙台機場", 
        activity: "入境、領行李 (1小時)", 
        query: "Sendai Airport",
        image: IMAGES.airport
      },
      { 
        time: "17:40–18:10", 
        location: "仙台站", 
        activity: "移動、熟悉環境 (30分鐘)", 
        query: "Sendai Station",
        image: IMAGES.sendaiStation
      },
      { 
        time: "18:15–19:15", 
        location: "牛タン焼専門店 東口", 
        activity: "晚餐：享用仙台牛舌", 
        query: "Sendai Station East Exit Gyutan",
        image: IMAGES.gyutan
      },
      { 
        time: "21:00", 
        location: "仙台東口 R&B 飯店", 
        activity: "辦理入住 (Check-in)", 
        query: "R&B Hotel Sendai Higashiguchi",
        image: IMAGES.hotel
      },
    ]
  },
  {
    date: "2026/01/03",
    dayOfWeek: "週六",
    title: "山寺與銀山溫泉",
    items: [
      { time: "08:00–09:00", location: "仙台東口 R&B 飯店", activity: "出發準備", query: "R&B Hotel Sendai Higashiguchi", image: IMAGES.hotel },
      { time: "09:00–09:30", location: "Toyota Rent a Car", activity: "取車手續", query: "Toyota Rent a Car Sendai Station East", image: IMAGES.driving },
      { 
        time: "10:30–11:30", 
        location: "立石寺（山寺）", 
        activity: "參拜、登山觀景", 
        query: "Yamadera Risshaku-ji Temple",
        image: IMAGES.yamadera
      },
      { time: "12:00–14:30", location: "山寺周邊", activity: "午餐、周邊散策", query: "Yamadera Station", image: IMAGES.yamadera },
      { 
        time: "15:20–17:50", 
        location: "銀山溫泉", 
        activity: "溫泉街觀光、拍照", 
        query: "Ginzan Onsen",
        image: IMAGES.ginzan
      },
      { time: "18:00–19:00", location: "銀山溫泉周邊", activity: "晚餐", query: "Ginzan Onsen Restaurant", image: IMAGES.ginzan },
      { time: "20:00", location: "一棟貸旅籠 治兵衛 JIHEI", activity: "辦理入住", query: "Hatago Jihei", image: IMAGES.ryokan },
    ]
  },
  {
    date: "2026/01/04",
    dayOfWeek: "週日",
    title: "藏王樹冰與滑雪",
    items: [
      { time: "06:00–07:00", location: "治兵衛 JIHEI", activity: "前往藏王", isTransport: true, image: IMAGES.driving },
      { time: "07:30–08:30", location: "藏王 Jupeer", activity: "租借雪裝", query: "Zao Base Center Jupeer", image: IMAGES.skiing },
      { 
        time: "08:30–12:30", 
        location: "藏王樹冰", 
        activity: "搭纜車、觀賞樹冰", 
        query: "Zao Ropeway Sanroku Line",
        image: IMAGES.snowMonsters
      },
      { time: "12:30–14:00", location: "藏王纜車山頂站", activity: "午餐、休息", query: "Zao Ropeway Summit Station", image: IMAGES.snowMonsters },
      { 
        time: "14:00–19:00", 
        location: "蔵王温泉滑雪場", 
        activity: "滑雪、雪上活動", 
        query: "Zao Onsen Ski Resort Uwanodai",
        image: IMAGES.skiing
      },
      { time: "19:00–20:00", location: "Jupeer", activity: "歸還雪裝", query: "Zao Base Center Jupeer", image: IMAGES.skiing },
      { time: "20:30", location: "治兵衛 JIHEI", activity: "返回住宿", query: "Hatago Jihei", image: IMAGES.ryokan },
    ]
  },
  {
    date: "2026/01/05",
    dayOfWeek: "週一",
    title: "福島泡湯與移動",
    items: [
      { time: "08:00–10:30", location: "移動至福島", activity: "長途移動", isTransport: true, image: IMAGES.driving },
      { 
        time: "10:30–13:30", 
        location: "福島安達屋", 
        activity: "日歸泡湯", 
        query: "Takayu Onsen Adachiya",
        image: IMAGES.onsen
      },
      { time: "13:30–14:30", location: "安達屋周邊", activity: "午餐", query: "Takayu Onsen", image: IMAGES.onsen },
      { time: "15:30–16:30", location: "須賀川民宿附近超市", activity: "採買晚餐食材", query: "Sukagawa Supermarket", image: IMAGES.driving },
      { time: "16:30", location: "須賀川包棟民宿", activity: "Check-in、料理晚餐", query: "Sukagawa City Hall", image: IMAGES.house },
    ]
  },
  {
    date: "2026/01/06",
    dayOfWeek: "週二",
    title: "會津若松與大內宿",
    items: [
      { time: "07:00–08:30", location: "民宿 → 只見川", activity: "移動", isTransport: true, image: IMAGES.driving },
      { 
        time: "08:30–09:30", 
        location: "第一只見川橋拍攝點", 
        activity: "絕景攝影", 
        query: "No.1 Tadami River Bridge Viewpoint",
        image: IMAGES.tadami
      },
      { 
        time: "10:30–11:30", 
        location: "會津若松城", 
        activity: "登城參觀", 
        query: "Tsuruga Castle",
        image: IMAGES.castle
      },
      { time: "11:30–13:00", location: "會津若松城周邊", activity: "午餐", query: "Aizuwakamatsu Castle", image: IMAGES.castle },
      { 
        time: "13:30–16:30", 
        location: "大內宿", 
        activity: "漫遊茅草屋古街", 
        query: "Ouchi-juku",
        image: IMAGES.ouchijuku
      },
      { time: "17:30", location: "須賀川包棟民宿", activity: "返回休息", query: "Sukagawa City", image: IMAGES.house },
    ]
  },
  {
    date: "2026/01/07",
    dayOfWeek: "週三",
    title: "仙台購物與返程",
    items: [
      { time: "08:00–10:00", location: "民宿 → 宮城縣", activity: "移動", isTransport: true, image: IMAGES.driving },
      { time: "10:00–11:00", location: "金蛇水神社", activity: "參拜財運神社", query: "Kanahebisui Shrine", image: IMAGES.yamadera }, // Similar vibe
      { 
        time: "11:30–14:30", 
        location: "Mitsui Outlet Park", 
        activity: "購物、午餐", 
        query: "Mitsui Outlet Park Sendai Port",
        image: IMAGES.shopping
      },
      { time: "15:00–15:30", location: "豐田租車 仙台機場店", activity: "還車手續", query: "Toyota Rent a Car Sendai Airport", image: IMAGES.driving },
      { time: "15:30–17:25", location: "仙台機場", activity: "登機手續、免稅店", query: "Sendai Airport", image: IMAGES.airport },
      { time: "17:25–20:35", location: "SDJ → TPE (JX863)", activity: "搭乘飛機返回台北", isTransport: true, image: IMAGES.plane },
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
  { id: '21', category: '其他', text: '鞋用止滑墊 (簡易冰爪)', completed: false },
];
