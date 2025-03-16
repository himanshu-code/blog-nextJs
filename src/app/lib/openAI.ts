import OpenAI from "openai";

export const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GIT_GPT_KEY,
  dangerouslyAllowBrowser: true,
});
