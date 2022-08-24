module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Alegreya", "serif"],
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin"), require("daisyui")],
};
