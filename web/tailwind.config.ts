import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // GROOMOSPHERE Brand Colors
        primary: {
          DEFAULT: "#003366", // Deep Blue
          50: "#e6f1ff",
          100: "#cce3ff",
          200: "#99c7ff",
          300: "#66abff",
          400: "#338fff",
          500: "#0073ff",
          600: "#005ce6",
          700: "#0044b3",
          800: "#003366", // Primary
          900: "#002244",
        },
        secondary: {
          DEFAULT: "#FFD700", // Bright Yellow
          50: "#fffef0",
          100: "#fffde0",
          200: "#fffcc2",
          300: "#fffa85",
          400: "#fff547",
          500: "#FFD700", // Secondary
          600: "#e6c200",
          700: "#b39600",
          800: "#806d00",
          900: "#4d4100",
        },
        accent: {
          DEFAULT: "#F2F2F2", // Light Gray
          50: "#ffffff",
          100: "#fafafa",
          200: "#f5f5f5",
          300: "#F2F2F2", // Accent
          400: "#e0e0e0",
          500: "#cccccc",
          600: "#999999",
          700: "#666666",
          800: "#333333",
          900: "#000000",
        },
        // Text Colors
        text: {
          primary: "#333333", // Dark Gray
          secondary: "#666666", // Medium Gray
          light: "#999999",
          inverse: "#FFFFFF",
        },
      },
      fontFamily: {
        // Primary Font: Poppins
        sans: ["Poppins", "system-ui", "sans-serif"],
        // Secondary Font: Roboto
        body: ["Roboto", "system-ui", "sans-serif"],
      },
      borderRadius: {
        // Rounded UI Elements
        'DEFAULT': '8px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'modal': '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;