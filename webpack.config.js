var path = require("path");

module.exports = {
  context: path.join(__dirname, "public", "src"),
  entry: [
    "app"
  ],
  output: {
    path: path.join(__dirname, "public", "assets"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: "babel",
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015'],
        cacheDirectory: false
      }
    }]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    root: [path.join(__dirname, "public", "src")],
    modulesDirectories: ["node_modules"]
  }
};