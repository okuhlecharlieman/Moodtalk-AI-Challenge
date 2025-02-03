const purgecss = require("@fullhuman/postcss-purgecss")

module.exports = {
  plugins: [
    purgecss({
      content: ["dist/de/*.html", "dist/de/*.js"],
    }),
    require("cssnano")({
      preset: "default",
    }),
  ],
}
