var path = require("path");
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, "public", "src"),
  entry: [
    "webpack-dev-server/client?http://localhost:9000/", 
    "webpack/hot/dev-server",
    "app"
  ],
  output: {
    publicPath: "http://localhost:9000/",
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
    // loaders: [{
    //   test: /\.jsx?$/,
    //   loader: "react-hot!jsx?harmony",
    //   exclude: /node_modules/
    // }]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    root: [path.join(__dirname, "public", "src")],
    modulesDirectories: ["node_modules"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};