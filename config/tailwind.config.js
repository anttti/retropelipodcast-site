module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{njk,md,html}"],
  theme: {},
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
