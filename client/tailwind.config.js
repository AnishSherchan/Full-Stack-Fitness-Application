module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgcolor: "#E1E5E8",
        navcolor: "#F3F6F7",
        dark: "#474C52",
        primaryButton: "#607FE8",
        back: "#005599",
        adminDash: "#474C52",
      },
    },
  },
  plugins: [],
};
