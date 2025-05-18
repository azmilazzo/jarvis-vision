export const config = {
  openRouter: {
    apiKey: "YOUR_OPENROUTER_API_KEY",
    baseURL: "https://openrouter.ai/api/v1",
    model: "google/gemini-flash-1.5",
    headers: {
      referer: "https://yourdomain.com",
      title: "Jarvis Vision AI"
    }
  },
  image: {
    maxRetries: 3,
    timeout: 10000
  }
};