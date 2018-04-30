const path = require('path');

module.exports = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-cheers.min.js',
    library: 'ReactCheers',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

  entry: path.join(__dirname, 'src/index.js'),

  resolve: {
    extensions: ['.js'],
    modules: [path.join(__dirname, 'node_modules')]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: 'babel-loader'
      }
    ]
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDom',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  ]
};
