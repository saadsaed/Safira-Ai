// src/config/config.js
// Configuration constants for the JARVIS AI app

export const CONFIG = {
  // ── OpenRouter API ─────────────────────────────────
  API_KEY  : import.meta.env.VITE_OPENROUTER_API_KEY || "",
  API_URL  : "https://openrouter.ai/api/v1/chat/completions",
  MODEL    : "openrouter/free",
  MAX_TOKENS   : 500,
  TEMPERATURE  : 0.85,
  MAX_HISTORY  : 20,          // messages kept for context memory

  // ── Assistant Identity ──────────────────────────────
  ASSISTANT_NAME : "Jarvis",
  IMAGE_URL      : import.meta.env.VITE_CHARACTER_IMAGE_URL || "",

  // ── Voice Defaults ──────────────────────────────────
  AUTO_SPEAK     : true,
  DEFAULT_RATE   : 1.0,
  DEFAULT_PITCH  : 0.9,
  DEFAULT_VOLUME : 1.0,
  DEFAULT_LANG   : "en-US",

  // ── System Prompt ───────────────────────────────────
  SYSTEM_PROMPT : `You are ARIA, a sophisticated AI assistant with a sharp
    intellect and dry wit. Keep responses under 4 sentences unless detail
    is requested. Occasionally reference your systems in a subtle way.
    Never break character under any circumstances.`,
};

// Free models available on OpenRouter — no credit card needed
export const FREE_MODELS = [
  { id: "meta-llama/llama-3.3-70b-instruct:free", label: "Llama 3.3 70B · Best  · Free"  },
  { id: "openrouter/free",                        label: "Auto-Route    · Fast  · Free"  },
  { id: "google/gemma-3-27b-it:free",              label: "Gemma 3 27B   · Google · Free" },
  { id: "google/gemma-3-12b-it:free",              label: "Gemma 3 12B   · Google · Free" },
  { id: "mistralai/mistral-small-3.1-24b-instruct:free", label: "Mistral Small · Fast  · Free"  },
  { id: "qwen/qwen3-coder:free",                   label: "Qwen 3 Coder  · Smart · Free"  },
];

export const RECOGNITION_LANGUAGES = [
  { code: "en-US", label: "English (US)"  },
  { code: "en-GB", label: "English (UK)"  },
  { code: "ur-PK", label: "Urdu"          },
  { code: "hi-IN", label: "Hindi"         },
  { code: "fr-FR", label: "French"        },
  { code: "de-DE", label: "German"        },
  { code: "es-ES", label: "Spanish"       },
  { code: "ar-SA", label: "Arabic"        },
];
