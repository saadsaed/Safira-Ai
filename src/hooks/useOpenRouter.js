import { useState, useCallback } from "react";
import { CONFIG } from "../config/config";

export function useOpenRouter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (messages, model = CONFIG.MODEL, apiKey = CONFIG.API_KEY) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(CONFIG.API_URL, {
        method : "POST",
        headers: {
          "Authorization" : `Bearer ${apiKey}`,
          "Content-Type"  : "application/json"
        },
        body: JSON.stringify({
          model,
          max_tokens  : CONFIG.MAX_TOKENS,
          temperature : CONFIG.TEMPERATURE,
          messages    : [
            { role: "system", content: CONFIG.SYSTEM_PROMPT },
            ...messages,
          ],
        }),
      });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Invalid API key. Please check your OpenRouter key.");
        if (res.status === 429) throw new Error("Rate limit reached. Please wait a moment.");
        if (res.status === 500) throw new Error("OpenRouter server error. Please retry.");
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `HTTP ${res.status}`);
      }
      const data  = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (!reply) throw new Error("ARIA did not respond. Please try again.");
      return { reply };
    } catch (e) {
      const errorMessage = !navigator.onLine ? "No internet connection. Check your network." : e.message;
      setError(errorMessage);
      return { reply: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendMessage, loading, error };
}
