const path = require("path")

module.exports = {
  entry: path.resolve(__dirname, "dist/stacks.js"),
  output: {
    path: path.resolve(__dirname, "out"),
    filename: "stacks.min.js",
    library: "Stacks",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  mode: "production",
}