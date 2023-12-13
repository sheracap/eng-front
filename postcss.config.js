module.exports = {
  plugins: [
    require("postcss-preset-env"),
    require("autoprefixer"),
    require("css-mqpacker"),
    require("cssnano")({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    }),
  ]
};