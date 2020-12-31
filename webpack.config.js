const path = require("path")

module.exports = {
  entry: path.resolve(__dirname, "dist/stacks_prod.js"),
  output: {
    path: path.resolve(__dirname, "publish"),
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  mode: "production",
}