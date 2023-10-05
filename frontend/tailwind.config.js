module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: true,
  theme: {
    extend: {
      fontFamily: {
        isotok: ["Isotok", "sans"],
      },
      backgroundColor: {
        input: "#282C30",
        default: "#1E1E1E",
        success: "#88BB46",
      },
      colors: {
        primary: "#FFFFFF",
        secondary: "#7F8489",
        success: "#88BB46",
        warning: "#FFC107",
        danger: "#DC3545",
        info: "#17A2B8",
        input: "#A4A4A4",
      },
      fontSize: {
        xs: "5px",
        10: "10px",
        12: "12px",
        base: "14px",
        15: "15px",
        18: "18px",
        20: "20px",
        25: "25px",
        27: "27px",
        28: "28px",
        title: "29px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
