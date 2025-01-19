/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/@shadcn/ui/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          poppins: ['"Poppins"', "sans-serif"],
          montserrat: ['"Montserrat"', "sans-serif"],
          rubik: ['"Rubik"', "sans-serif"],
          grotesk: ['"Host Grotesk"', "sans-serif"],
        },
        colors: {
          primary: {
            DEFAULT: "#2563EB",
            light: "#3B82F6",
            dark: "#1E40AF",
          },
          secondary: {
            DEFAULT: "#1E40AF",
            light: "#2563EB",
            dark: "#1B3A76",
          },
          neutral: {
            DEFAULT: "#6B7280",
            light: "#D1D5DB",
            dark: "#374151",
          },
          background: {
            DEFAULT: "#F9FAFB",
            dark: "#1F2937",
          },
          danger: {
            DEFAULT: "#EF4444",
            dark: "#B91C1C",
          },
          warning: {
            DEFAULT: "#F59E0B",
          },
          success: {
            DEFAULT: "#10B981",
          },
        },
        boxShadow: {
          top: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)", // Ombre en haut
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    plugins: [require("@tailwindcss/typography")],
  };
