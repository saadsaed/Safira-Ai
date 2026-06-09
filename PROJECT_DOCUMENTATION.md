# Jarvis-AI — Project Documentation

## Project Overview

Jarvis-AI is a browser-based conversational assistant built with React and Vite. It combines speech recognition (STT), speech synthesis (TTS), and an LLM backend (via OpenRouter) to provide a voice-enabled assistant UI named “ARIA / Jarvis”. The app is styled with Tailwind CSS and includes a compact HUD-style UI with character panel, chat panel, and controls.

## Tech Stack

- **Framework:** React 19 (functional components + hooks)
- **Bundler / Dev Server:** Vite
- **Styling:** Tailwind CSS + custom CSS files
- **Speech APIs:** Web Speech API (SpeechRecognition + SpeechSynthesis)
- **LLM Backend:** OpenRouter API (configurable model, e.g. `openrouter/free`)
- **Animations:** framer-motion
- **Linting:** ESLint (configs in devDependencies)

See package dependencies in [package.json](package.json#L1-L40).

## Important Files

- **Entry & App**: [src/main.jsx](src/main.jsx#L1-L11), [src/App.jsx](src/App.jsx#L1-L200)
- **App logic / global state**: [src/context/AssistantContext.jsx](src/context/AssistantContext.jsx#L1-L220)
- **Config / defaults**: [src/config/config.js](src/config/config.js#L1-L120)
- **API integration hook**: [src/hooks/useOpenRouter.js](src/hooks/useOpenRouter.js#L1-L160)
- **Speech hooks**: [src/hooks/useSpeechRecognition.js](src/hooks/useSpeechRecognition.js#L1-L200), [src/hooks/useSpeechSynthesis.js](src/hooks/useSpeechSynthesis.js#L1-L240)
- **UI components**: [src/components](src/components)
- **Tailwind config**: [tailwind.config.js](tailwind.config.js#L1-L30)
- **PostCSS**: [postcss.config.js](postcss.config.js#L1-L20)

## Directory Layout (high level)

- `src/` — application source
  - `components/` — modular UI pieces grouped by feature (`character`, `chat`, `controls`, `layout`, `settings`, `ui`)
  - `context/` — `AssistantContext.jsx` provides the central app state and actions
  - `hooks/` — reusable hooks (speech, OpenRouter, keyboard shortcuts, toast manager)
  - `config/` — app constants and defaults (`config.js`)
  - `assets/` — images and static assets used by UI

## Key Functionality & Behavior

- Voice input (STT): `useSpeechRecognition` wraps the browser `SpeechRecognition` API. It reports interim results and final transcripts to the assistant context.
- Voice output (TTS): `useSpeechSynthesis` controls `window.speechSynthesis`, voice selection, rate/pitch/volume, chunked playback, and speaking state.
- LLM requests: `useOpenRouter` posts a minimal chat-style payload to OpenRouter at `CONFIG.API_URL` and returns the assistant reply. `AssistantContext` maintains a short message history limited by `CONFIG.MAX_HISTORY`.
- Local persistence: `localStorage` is used for user preferences like `jarvis_model`, `jarvis_api_key`, auto-speak, hands-free mode, and language.
- UI interactions: keyboard shortcuts (via `useKeyboard`), toasts, chat export, copy last response, and settings modal to set API key and model.

## Configuration & Environment Variables

- `VITE_OPENROUTER_API_KEY` — OpenRouter API key used by the app if present in the environment.
- `VITE_CHARACTER_IMAGE_URL` — optional URL for the avatar image.

Defaults and additional runtime settings live in [src/config/config.js](src/config/config.js#L1-L120).

## Scripts & Local Development

Common npm scripts (see [package.json](package.json#L1-L40)):

```bash
npm install
npm run dev      # start vite dev server (HMR)
npm run build    # build production bundle
npm run preview  # preview production build
npm run lint     # run ESLint
```

Notes:

- The app is a frontend SPA and requires a valid OpenRouter API key to call the LLM backend when sending messages. Without it, attempts to send messages return an in-app toast error.
- Browser must support the Web Speech API to use voice features (Chrome / Edge recommended).

## How Data Flows (high level)

1. User speaks or types a message.
2. STT hook returns final transcript; `AssistantContext.sendToAI` appends the user message and calls `useOpenRouter.sendMessage` with recent history and `CONFIG.SYSTEM_PROMPT`.
3. On successful response, AssistantContext appends the assistant message. If `autoSpeak` is enabled, `useSpeechSynthesis.speak` reads it aloud.
4. UI components render `messages` from the context; controls support replay, copy, export, clear.

## Notable Implementation Details

- `CONFIG.SYSTEM_PROMPT` in `src/config/config.js` sets the assistant persona (ARIA) and moderation of output length.
- The speech synthesis implementation splits large texts into sentence-like chunks to improve responsiveness and avoid long single utterances.
- `useOpenRouter` handles HTTP status errors (401, 429, 500) and surfaces user-friendly error messages.
- Settings and interactive controls are implemented in `src/components/settings/SettingsPanel.jsx` (settings UI) and saved into `localStorage` for persistence.

## Limitations & Security Considerations

- API Key safety: the OpenRouter API key (if provided in the browser) is stored in `localStorage` and sent from the client; this is convenient for demos but not secure for production—prefer a server-side proxy or token exchange.
- Browser compatibility: speech features rely on the Web Speech API and will not work in all browsers (Safari support is limited). The app performs basic checks and shows toasts on missing APIs/permissions.
- Rate limits: public/free models can be rate limited. `useOpenRouter` surfaces 429 errors.

## Suggested Next Steps / Improvements

- Move OpenRouter requests to a small backend proxy to hide API keys and implement rate limiting and caching.
- Add unit / integration tests for core hooks and `AssistantContext` logic.
- Add accessibility improvements for keyboard-only users and screen readers.
- Add persistence export/import for settings (JSON) and a conversation history view.

## Files to Inspect for More Detail

- [src/context/AssistantContext.jsx](src/context/AssistantContext.jsx#L1-L220) — central app logic and actions
- [src/hooks/useOpenRouter.js](src/hooks/useOpenRouter.js#L1-L160) — API integration
- [src/hooks/useSpeechRecognition.js](src/hooks/useSpeechRecognition.js#L1-L200)
- [src/hooks/useSpeechSynthesis.js](src/hooks/useSpeechSynthesis.js#L1-L240)
- [src/components/chat/ChatPanel.jsx](src/components/chat/ChatPanel.jsx)
- [src/config/config.js](src/config/config.js#L1-L120)

---

Generated on: 2026-06-10
