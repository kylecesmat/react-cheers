const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: ['./demo/app.js'],

  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [path.join(__dirname, 'node_modules')]
  },

  output: {
    path: path.join(__dirname, 'docs')
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './demo/index.html',
      title: 'React Cheers - A lightweight toast manager'
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: ['demo']
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg)$/,
        use: 'url-loader?limit=8192'
      }
    ]
  }
};
