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
        450: "500px",
        800: "800px",
        950: "950px",
        1200: "1200px",
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
        secondary: "#0069d3",
        secondaryH: "#266baf",
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
        overlayLogin: "rgba(39, 174, 97,0.72)",
        iconAccent: "#32B368",
        chooseBg: "#D3EFDF",
        employerBg: "#EAEAEA",
        progressBg: "#E58C17",
        progressLightBg: "#EAA444",
        monthlyCard: "#F4F7FB",
        dndBtn: "#266BAF",

        dndBtnH: "#13538e",
        prevBtn: "#4096ff",
        red: "red",
        searchGrey: "#F4F4F4",
        lightRed: "#ffe4e4",
      },
    },
  },
  plugins: [],
};
