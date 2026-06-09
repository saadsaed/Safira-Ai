/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Share Tech Mono", "Consolas", "monospace"],
      },
      colors: {
        "hud-bg": "#020c14",
        "hud-surface": "#030d15",
        "hud-panel": "#040f1a",
        "hud-border": "#0a2035",
        "hud-cyan": "#00c8f0",
        "hud-green": "#00c87a",
        "hud-amber": "#e08a00",
        "hud-red": "#e04040",
        "hud-muted": "#1a4060",
        "hud-text": "#7ab8d3",
      },
      keyframes: {
        pulseRing: {
          "0%, 100%": { opacity: "0.15", transform: "scale(1.0)" },
          "50%": { opacity: "0.80", transform: "scale(1.03)" },
        },
        spinRing: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        listenPulse: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.97)" },
          "40%": { opacity: "0.95", transform: "scale(1.07)" },
        },
        speakBar: {
          "0%, 100%": { transform: "scaleY(0.25)" },
          "50%": { transform: "scaleY(1.0)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1.00)", opacity: "0.95" },
          "50%": { transform: "scale(1.02)", opacity: "1.00" },
        },
        floatDot: {
          "0%, 100%": { transform: "translateY(0px)", opacity: "0.25" },
          "50%": { transform: "translateY(-14px)", opacity: "0.65" },
        },
        fadeSlideUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        thinkDot: {
          "0%, 80%, 100%": { transform: "scale(0)" },
          "40%": { transform: "scale(1)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 10px 2px rgba(0,200,240,0.2)" },
          "50%": { boxShadow: "0 0 28px 6px rgba(0,200,240,0.55)" },
        },
      },
      animation: {
        "pulse-ring": "pulseRing 3s ease-in-out infinite",
        "spin-ring": "spinRing 1.8s linear infinite",
        "listen-pulse": "listenPulse 0.55s ease-in-out infinite",
        "speak-bar": "speakBar 0.5s ease-in-out infinite",
        "breathe": "breathe 4s ease-in-out infinite",
        "float-dot": "floatDot 3s ease-in-out infinite",
        "fade-up": "fadeSlideUp 0.3s ease-out forwards",
        "think-dot": "thinkDot 1.4s ease-in-out infinite both",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
