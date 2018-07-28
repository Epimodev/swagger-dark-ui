const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.config.js');

const options = {
  contentBase: './',
  historyApiFallback: true,
  hot: true,
  host: 'localhost',
  stats: {
    colors: true,
    assets: true,
    chunks: false,
    children: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
    version: false,
    hash: false,
    timings: false,
  },
};

WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);
const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, options);

server.listen(5000, () => {
  console.log('dev server listening on port 5000');
});
