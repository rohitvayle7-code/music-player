
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const generateSmartPlaylist = async (prompt: string) => {
  if (!API_KEY) throw new Error("API Key not found");
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on this mood or request: "${prompt}", generate a creative playlist name and a short descriptive tagline. Return as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING }
        },
        required: ["title", "description"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const searchMusicInsights = async (query: string) => {
  if (!API_KEY) throw new Error("API Key not found");

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `The user is searching for "${query}" in their music library. Give a quick, witty AI response (max 20 words) about why they might like this artist or genre, or a fun fact about it.`,
  });

  return response.text;
};
