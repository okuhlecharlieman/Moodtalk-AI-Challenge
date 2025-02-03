const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    purgecss({
      content: [
        "themes/planner/login/**/*.ftl",
        "themes/planner/login/theme.properties",
      ],
    }),
    require("cssnano")({
      preset: "default",
    }),
  ],
};
