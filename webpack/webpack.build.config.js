const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const config = require('./config');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: config.cssOptions },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader', options: config.sassOptions },
          ],
        }),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('production'),
        },
      },
    }),
    new ExtractTextPlugin(config.outputCSS),
  ],
});
