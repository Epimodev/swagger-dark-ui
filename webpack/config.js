module.exports = {
  entryHTML: 'index.html',
  entryFile: 'src/index.tsx',
  assetsDir: 'assets',
  outputDir: 'dist',
  outputHTML: 'index.html',
  outputJS: 'app_[hash:5].js',
  outputCSS: 'style_[md5:contenthash:hex:5].css',
  sassOptions: {
    includePaths: ['src/styleUtils'],
  },
  cssOptions: {
    modules: true,
    importLoaders: 1,
    localIdentName: '[hash:5]-[local]',
    url: false,
    minimize: true,
  },
};
