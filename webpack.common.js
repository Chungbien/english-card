const path = require('path');
const sass = require('sass');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: [/node_modules/]
    }]
  },
}