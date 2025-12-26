
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateInventoryDescription = async (productName: string, category: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `為以下產品生成一段吸引人的繁體中文產品描述：
  產品名稱: ${productName}
  分類: ${category}
  請限制在100字以內。`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "無法生成描述";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "生成失敗，請檢查 API Key";
  }
};

export const getBusinessInsights = async (context: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `你是一位資深的 ERP 業務顧問。根據以下系統數據提供深入分析與改進建議（繁體中文）：
  
  ${context}
  
  請提供三點具體的建議。`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    return response.text || "無法生成洞察";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "洞察分析失敗";
  }
};
