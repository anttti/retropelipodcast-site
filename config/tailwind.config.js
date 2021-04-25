module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{njk,md,html}"],
  theme: {
    colors: {
      black: "black",
      sky: "var(--sky-bg)",
      text: "var(--text)",
      "light-bg": "var(--episode-bg)",
      "dark-bg": "var(--episodes-bg)",
    },
    fontFamily: {
      sans: ["VT323", "monospace"],
      mono: ["VT323", "monospace"],
    },
    screens: {
      xs: "500px",
      // => @media (min-width: 500px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0px",
      2: "2px",
      4: "4px",
      8: "8px",
      32: "32px",
      64: "64px",
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
