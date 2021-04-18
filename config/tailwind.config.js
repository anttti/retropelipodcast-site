module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{njk,md,html}"],
  theme: {
    colors: {
      black: "black",
      sky: "var(--sky-bg)",
      text: "var(--text)",
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
