/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "tw-",
  important: true,
  theme: {
    extend: {
      screens: {
        xsm: "100px",
        800: "800px",
        950: "950px",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        signInImage: "url('/images/auth_bg.png')",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000000",
        primary: "#26af61",
        textInput: "#F4F4F4",
        footerBackground: "#333333",
        cardBorder: "#E9F7EF",
        britishCollegeTheme: "#2F348F",
        versikTheme: "#5D2F8F",
        leapFrogTheme: "#2DCC70",
        ingTheme: "#75BF45",
        khaltiTheme: "#5D2F8F",
        esewaTheme: "#61BB47",
        aboutGrey: "#EAEAEA",
        buttonHover: "#159149",
        overlayLogin: "rgba(63, 175, 110,0.92)",
        iconAccent: "#32B368",
        chooseBg: "#D3EFDF",
        employerBg: "#EAEAEA",
        progressBg: "#E58C17",
        progressLightBg: "#EAA444",
        monthlyCard: "#F4F7FB",
      },
    },
  },
  plugins: [],
};
