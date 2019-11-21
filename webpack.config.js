const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const {
  version,
  name,
  license,
  repository,
  author,
} = pkg;

const banner = `
  ${name} v${version}
  ${repository.url}
  Copyright (c) ${author.replace(/ *\<[^)]*\> */g, " ")}
  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
`;

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    // library: 'DBX',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
};
