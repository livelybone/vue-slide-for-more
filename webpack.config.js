const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const fs = require('fs');

function getEntries() {
  const reg = /\.vue$/;
  return fs.readdirSync(path.resolve(__dirname, './src/component'))
    .filter(filename => reg.test(filename) && !fs.statSync(path.resolve(__dirname, './src/component', filename)).isDirectory())
    .map(filename => ({ [filename.replace(reg, '')]: path.resolve(__dirname, './src/component', filename) }));
}

const entries = getEntries();

const config = {
  mode: 'production',
  entry: Object.assign({ index: './src/index.js' }, ...entries),
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: './[name].js',
    library: 'VueSlideForMore',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      { test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['env', {}]],
          env: {
            test: {
              plugins: ['istanbul'],
            },
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};

module.exports = config;
