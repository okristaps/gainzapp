module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica Neue", "Arial", "sans-serif"],
      },
      colors: {
        gradient: "linear-gradient(#374151, #111827, #000000)",
        primary: "#007BFF",
        secondary: "#6C757D",
        success: "#28A745",
        warning: "#FFC107",
        danger: "#DC3545",
        info: "#17A2B8",
        gray: {
          100: "#F8F9FA",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#ADB5BD",
          600: "#6C757D",
          700: "#495057",
          800: "#343A40",
          900: "#212529",
        },
      },
      backgroundColor: (theme) => ({
        primary: theme("colors.primary"),
        secondary: theme("colors.secondary"),
        success: theme("colors.success"),
        warning: theme("colors.warning"),
        danger: theme("colors.danger"),
        info: theme("colors.info"),
        gray: theme("colors.gray"),
        white: "#ffffff",
        black: "#000000",
      }),
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
