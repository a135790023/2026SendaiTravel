
import { DaySchedule, PackingItem } from './types';

export const TRIP_START_DATE = "2026-01-02T00:00:00+09:00"; // JST

// Reliable Unsplash URLs
const IMAGES = {
  plane: "https://icrvb3jy.xinmedia.com/solomo/article/b/5/1/b5194e1b-c5db-4b5b-964a-83a4d3b0d50e.jpeg",
  airport: "https://www.tabirai.net/tabirai-uploader/img/0005493/s8_0005493.jpg",
  sendaiStation: "https://s-style.machico.mu/wp-content/uploads/2023/10/S__86155302_0.jpg",
  gyutan: "https://matipura.com/CORE/wp-content/uploads/2017/03/02-5.jpg",
  hotel: "https://www.washingtonhotel.co.jp/rb/_data/cache/images/2025/05/28/1300_578_71c971338d420790ace53b39fe7af95bbee2e953.webp",
  driving: "https://image.card.tw.r10s.com/images/corp/campaign/1400/Toyota_04.jpg", // Snowy road
  yamadera: "https://www.visityamagata.jp/wp/wp-content/uploads/2024/07/%E4%BA%94%E5%A4%A7%E5%A0%821.jpg.webp",
  ginzan: "https://icrvb3jy.xinmedia.com/solomo/article/7/5/2/752e384b-d5f4-4d6e-b7ea-717d43c66cf2.jpeg",
  ryokan: "https://a0.muscache.com/im/pictures/hosting/Hosting-1287479416884768737/original/e2416226-99a4-4fd2-8bf8-95efb76d825f.jpeg?im_w=960", // Placeholder for Jihei
  snowMonsters: "https://i0.wp.com/journey.tw/wp-content/uploads/2023-10-17-191105-95.jpg?resize=1100%2C734&quality=99&ssl=1",
  skiing: "https://www.sundaytour.com.tw/upfiles/chinese/attractions/tw_attractions_caty01689064716.jpg",
  jupeer: "https://instagram.fkhh1-1.fna.fbcdn.net/v/t39.30808-6/470584014_10235656484257152_1544646902909205017_n.jpg?stp=cp6_dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InRocmVhZHMuQ0FST1VTRUxfSVRFTS5pbWFnZV91cmxnZW4uMjA0OHgxNTM2LnNkci5mMzA4MDguZGVmYXVsdF9pbWFnZS5jMiJ9&_nc_ht=instagram.fkhh1-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QEBAUz4cWLus-tLJ-XQPMrRNRmXm2bfuPqL-q0QrLsbhniM5g1eVFZUWt7vAcIuw4Q&_nc_ohc=FN0mTlDewpsQ7kNvwGJFnvu&_nc_gid=LLKbQShaLXOA8BCrM6TuIQ&edm=AKr904kAAAAA&ccb=7-5&ig_cache_key=MzUyNjUxOTc2MTU0NDA3NjMzNQ%3D%3D.3-ccb7-5&oh=00_Afj7jA9pS3Gdp2eQbHZf6kYbVykL8H_TZoIhcnE4W_ySaA&oe=692F2CF5&_nc_sid=23467f$0", // Zao Jupeer specific
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
 * 建議填入：
 * 1. 完整的 Google Maps 地址
 * 2. 該地點的「日文名稱」
 * 3. 經緯度 (例如 "38.2601,140.8824")
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
        image: IMAGES.airport
      },
      { 
        time: "17:40–18:10", 
        location: "仙台站", 
        activity: "移動、熟悉環境 (30分鐘)", 
        query: "Sendai Station 仙台駅",
        image: IMAGES.sendaiStation
      },
      { 
        time: "18:15–19:15", 
        location: "牛タン焼専門店 東口", 
        activity: "晚餐：享用仙台牛舌", 
        // 建議確認訂位的餐廳名稱，這裡預設導航至東口
        query: "Sendai Station East Exit Gyutan 仙台駅東口 牛タン",
        image: IMAGES.gyutan
      },
      { 
        time: "21:00", 
        location: "仙台東口 R&B 飯店", 
        activity: "辦理入住 (Check-in)", 
        query: "R&B Hotel Sendai Higashiguchi R&Bホテル仙台東口",
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
      { time: "09:00–09:30", location: "Toyota Rent a Car", activity: "取車手續", query: "Toyota Rent a Car Sendai Station East トヨタレンタカー 仙台駅東口店", image: IMAGES.driving },
      { 
        time: "10:30–11:30", 
        location: "立石寺（山寺）", 
        activity: "參拜、登山觀景", 
        query: "Yamadera Risshaku-ji Temple 宝珠山 立石寺",
        image: IMAGES.yamadera
      },
      { time: "12:00–14:30", location: "山寺周邊", activity: "午餐、周邊散策", query: "Yamadera Station 山寺駅", image: IMAGES.yamadera },
      { 
        time: "15:20–17:50", 
        location: "銀山溫泉", 
        activity: "溫泉街觀光、拍照", 
        query: "Ginzan Onsen 銀山温泉",
        image: IMAGES.ginzan
      },
      { time: "18:00–19:00", location: "銀山溫泉周邊", activity: "晚餐", query: "Ginzan Onsen 銀山温泉", image: IMAGES.ginzan },
      { 
        time: "20:00", 
        location: "一棟貸旅籠 治兵衛 JIHEI", 
        activity: "辦理入住", 
        // 請填入確切地址，以免導航到同名地點
        query: "Hatago Jihei Obanazawa 一棟貸し旅籠 治兵衛", 
        image: IMAGES.ryokan 
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
        image: IMAGES.jupeer 
      },
      { 
        time: "08:30–12:30", 
        location: "藏王樹冰", 
        activity: "搭纜車、觀賞樹冰", 
        query: "Zao Ropeway Sanroku Line 蔵王ロープウェイ 山麓線",
        image: IMAGES.snowMonsters
      },
      { time: "12:30–14:00", location: "藏王纜車山頂站", activity: "午餐、休息", query: "Zao Ropeway Summit Station 地蔵山頂駅", image: IMAGES.snowMonsters },
      { 
        time: "14:00–19:00", 
        location: "蔵王温泉滑雪場", 
        activity: "滑雪、雪上活動", 
        query: "Zao Onsen Ski Resort Uwanodai 蔵王温泉スキー場 上の台ゲレンデ",
        image: IMAGES.skiing
      },
      { time: "19:00–20:00", location: "Jupeer", activity: "歸還雪裝", query: "Zao Base Center Jupeer 蔵王ベースセンタージュピア", image: IMAGES.jupeer },
      { time: "20:30", location: "治兵衛 JIHEI", activity: "返回住宿", query: "Hatago Jihei Obanazawa 一棟貸し旅籠 治兵衛", image: IMAGES.ryokan },
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
        image: IMAGES.onsen
      },
      { time: "13:30–14:30", location: "安達屋周邊", activity: "午餐", query: "Takayu Onsen 高湯温泉", image: IMAGES.onsen },
      { time: "15:30–16:30", location: "須賀川民宿附近超市", activity: "採買晚餐食材", query: "York Benimaru Sukagawa ヨークベニマル 須賀川", image: IMAGES.house },
      { 
        time: "16:30", 
        location: "須賀川包棟民宿", 
        activity: "Check-in、料理晚餐", 
        // ⚠️ 重要：私人地址請手動修正，例如："Sukagawa City Hall" 或填入確切地址
        query: "Sukagawa City 須賀川市", 
        image: IMAGES.house 
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
        image: IMAGES.tadami
      },
      { 
        time: "10:30–11:30", 
        location: "會津若松城", 
        activity: "登城參觀", 
        query: "Tsuruga Castle 鶴ヶ城",
        image: IMAGES.castle
      },
      { time: "11:30–13:00", location: "會津若松城周邊", activity: "午餐", query: "Tsuruga Castle 鶴ヶ城", image: IMAGES.castle },
      { 
        time: "13:30–16:30", 
        location: "大內宿", 
        activity: "漫遊茅草屋古街", 
        query: "Ouchi-juku 大内宿",
        image: IMAGES.ouchijuku
      },
      { time: "17:30", location: "須賀川包棟民宿", activity: "返回休息", query: "Sukagawa City 須賀川市", image: IMAGES.house },
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
        image: IMAGES.tem 
      },
      { 
        time: "11:30–14:30", 
        location: "Mitsui Outlet Park", 
        activity: "購物、午餐", 
        query: "Mitsui Outlet Park Sendai Port 三井アウトレットパーク 仙台港",
        image: IMAGES.shopping
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
  { id: '21', category: '其他', text: '鞋用止滑墊 (簡易冰爪)', completed: false },
];
