module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{njk,md,html}"],
  theme: {
    colors: {
      black: "black",
      sky: "var(--sky-bg)",
      text: "var(--text)",
      "light-bg": "var(--episode-bg)",
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
