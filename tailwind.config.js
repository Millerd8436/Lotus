/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./legacy-recovered/**/*.{js,ts,jsx,tsx}",
    "./comprehensive_index.html",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Legacy colors preserved
        "predatory-red": "#dc2626",
        "ethical-green": "#16a34a",
        "ghost-yellow": "#fbbf24",
        "warning-orange": "#ea580c",

        // Lotus brand colors
        lotus: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#1e3a8a", // Changed to professional blue
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#500724",
        },
        // Comprehensive system colors
        exploitative: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        ethical: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        coercion: {
          low: "#fef3c7",
          medium: "#fcd34d",
          high: "#f59e0b",
          extreme: "#dc2626",
        },
        // Enhanced UI colors for shadcn/ui
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
        display: ["Cal Sans", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        // Legacy animations preserved
        "urgency-pulse": "urgency-pulse 2s ease-in-out infinite",
        blink: "blink 1s linear infinite",

        // Enhanced animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        urgency: "urgency 1s ease-in-out infinite",
        coercion: "coercion 2s ease-in-out infinite",
        manipulation: "manipulation 1.5s ease-in-out infinite",
      },
      keyframes: {
        // Legacy keyframes preserved
        "urgency-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            backgroundColor: "rgb(239 68 68)",
          },
          "50%": {
            transform: "scale(1.05)",
            backgroundColor: "rgb(220 38 38)",
          },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0.3" },
        },

        // Enhanced keyframes
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        urgency: {
          "0%, 100%": { backgroundColor: "rgb(239 68 68)" },
          "50%": { backgroundColor: "rgb(185 28 28)" },
        },
        coercion: {
          "0%, 100%": {
            borderColor: "rgb(239 68 68)",
            boxShadow: "0 0 0 1px rgb(239 68 68)",
          },
          "50%": {
            borderColor: "rgb(185 28 28)",
            boxShadow: "0 0 0 3px rgb(185 28 28 / 0.3)",
          },
        },
        manipulation: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
        },
      },
      boxShadow: {
        coercion: "0 0 0 1px rgb(239 68 68), 0 0 0 3px rgb(239 68 68 / 0.1)",
        manipulation:
          "0 4px 6px -1px rgb(239 68 68 / 0.1), 0 2px 4px -1px rgb(239 68 68 / 0.06)",
        "autonomy-violation":
          "0 0 0 2px rgb(239 68 68), 0 0 0 4px rgb(239 68 68 / 0.2)",
        ethical: "0 0 0 1px rgb(34 197 94), 0 0 0 3px rgb(34 197 94 / 0.1)",
        glass: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    // Custom plugins for comprehensive Lotus system
    function ({ addUtilities, addComponents, theme }) {
      addUtilities({
        ".phase-exploitative": {
          "--phase-color": theme("colors.exploitative.500"),
          "--phase-bg": theme("colors.exploitative.50"),
          "--phase-border": theme("colors.exploitative.200"),
        },
        ".phase-ethical": {
          "--phase-color": theme("colors.ethical.500"),
          "--phase-bg": theme("colors.ethical.50"),
          "--phase-border": theme("colors.ethical.200"),
        },
        ".phase-reflection": {
          "--phase-color": theme("colors.blue.600"),
          "--phase-bg": theme("colors.blue.50"),
          "--phase-border": theme("colors.blue.200"),
        },
        ".dark-pattern-highlight": {
          "@apply relative border-2 border-red-500 bg-red-50 animate-pulse": {},
        },
        ".autonomy-violation": {
          "@apply border-2 border-red-500 bg-red-50 shadow-autonomy-violation":
            {},
        },
      });

      addComponents({
        ".btn-exploitative": {
          "@apply bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105":
            {},
        },
        ".btn-ethical": {
          "@apply bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200":
            {},
        },
        ".card-exploitative": {
          "@apply bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 shadow-manipulation":
            {},
        },
        ".card-ethical": {
          "@apply bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 shadow-ethical":
            {},
        },
        ".urgency-timer": {
          "@apply bg-red-600 text-white px-4 py-2 rounded-full font-mono text-lg animate-urgency":
            {},
        },
        ".echo-message": {
          "@apply fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-in-from-right":
            {},
        },
        ".analysis-card": {
          "@apply bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700":
            {},
        },
      });
    },
  ],
};
