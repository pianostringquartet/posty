const path = require('path') // https://nodejs.org/api/path.html

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
  PUBLIC: path.resolve(__dirname, 'public')
}

module.exports = {
  entry: ['whatwg-fetch', path.join(paths.JS, 'app.js')],
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.PUBLIC, 'index.html')
    }),
    new ExtractTextPlugin('style.bundle.css')
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    modules: ['src/js', 'node_modules'],
    extensions: ['.jsx', '.js'],
    alias: {
      actions: path.resolve(paths.JS, 'actions'),
      constants: path.resolve(paths.JS, 'constants'),
      reducers: path.resolve(paths.JS, 'reducers'),
      components: path.resolve(paths.JS, 'components'),
      assets: path.resolve(paths.PUBLIC, 'assets')
    }
  }
}
