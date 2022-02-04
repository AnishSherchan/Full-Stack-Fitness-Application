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
        primaryButton: "#607FE8",
      },
    },
  },
  plugins: [],
};
