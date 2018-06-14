const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const fs = require('fs');

function getEntries() {
  const reg = /\.vue$/;
  return fs.readdirSync(path.resolve(__dirname, './src')).filter(filename => {
    return reg.test(filename) && !fs.statSync(path.resolve(__dirname, './src', filename)).isDirectory()
  }).map(filename => ({[filename.replace(reg, '')]: path.resolve(__dirname, './src', filename)}))
}

const entries = getEntries();

const config = {
  entry: Object.assign({'index': './index.js'}, ...entries),
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: './[name].js',
    library: 'VueSlideForMore',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader'},
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};

module.exports = config;