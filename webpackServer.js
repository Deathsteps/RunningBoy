var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");

new webpackDevServer(webpack(require("./webpack.dev.config")), {
  hot: true,
  noInfo: true
}).listen(9000, 'localhost', function (err, result) {
  err && console.log(err);
  console.log('Webpack-dev-server is listening at localhost:9000');
});