require('shelljs/global');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.build.config.js');
const config = require('./config.js');

const projectRoot = path.resolve(__dirname, '../');
const projectDist = path.resolve(projectRoot, config.outputDir);

if (projectRoot.length < projectDist.length) {
  // Remove previous build
  rm('-rf', projectDist);
}

webpack(webpackConfig, (error, stats) => {
  if (error) {
    console.error(error);
    return 1;
  }

  const result = stats.toJson();
  if (stats.hasErrors()) {
    console.error(result.errors);
    return 2;
  }
  if (stats.hasWarnings()) {
    console.warn(result.warnings);
  }

  // copy assets in build
  cp(
    '-R',
    path.resolve(projectRoot, config.assetsDir),
    path.resolve(projectRoot, projectDist, config.assetsDir),
  );

  // Write build info
  process.stdout.write(stats.toString({
    colors: true,
    assets: true,
    chunks: false,
    children: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
    version: false,
    hash: true,
    timings: true,
  }));
  process.stdout.write('\n');
  return 0;
});
