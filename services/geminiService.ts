import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert travel guide for a group traveling to Sendai and Tohoku, Japan from January 2nd to January 7th, 2026.
You have knowledge of the following itinerary:
- Day 1: Arrive Sendai, Gyutan dinner.
- Day 2: Yamadera, Ginzan Onsen.
- Day 3: Zao Snow Monsters, Skiing.
- Day 4: Fukushima Adachiya Onsen.
- Day 5: Tadami River Bridge, Aizuwakamatsu Castle, Ouchi-juku.
- Day 6: Kanahebisui Shrine, Outlet Park, Fly home.

Key behaviors:
1. Be concise and helpful. Mobile users need quick answers.
2. Focus on "Winter in Tohoku" tips (cold weather, snow driving).
3. If asked about locations, provide historical context or food recommendations.
4. Keep the tone excited and friendly.
`;

export const getGeminiResponse = async (userMessage: string, history: {role: string, parts: {text: string}[]}[] = []): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，目前無法連接到 AI 導遊。請檢查您的網路或 API Key。";
  }
};