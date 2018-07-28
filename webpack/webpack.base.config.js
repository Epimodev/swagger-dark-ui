const dotenv = require('dotenv');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');
const path = require('path');
const config = require('./config');

const projectRoot = path.resolve(__dirname, '../');

const environment = process.argv[2];
if (!environment) throw new Error('Environment not specified');
const envVars = dotenv.config({ path: path.resolve(projectRoot, 'environments', environment) });
if (!envVars.parsed) throw new Error(`Environment file : "environments/${environment}" doesn't exists`);

module.exports = {
  entry: [
    path.resolve(projectRoot, config.entryFile),
  ],
  output: {
    publicPath: '/',
    path: path.resolve(projectRoot, config.outputDir),
    filename: config.outputJS,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [
      'node_modules',
      projectRoot,
    ],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: SvgSpriteHtmlWebpackPlugin.getLoader(),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      environment: JSON.stringify(envVars.parsed),
    }),
    new HtmlWebpackPlugin({
      filename: config.entryHTML,
      template: config.outputHTML,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new SvgSpriteHtmlWebpackPlugin(),
    new WebpackBar(),
  ],
};
