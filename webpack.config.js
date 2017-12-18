// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
  PUBLIC: path.resolve(__dirname, 'public')
};

// Webpack configuration:
// the entry point for our app, and
// the output point
module.exports = {
  entry: ['whatwg-fetch', path.join(paths.JS, 'app.js')],
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
        // template: path.join(paths.SRC, 'index.html'),
        template: path.join(paths.PUBLIC, 'index.html'),
    }),
    new ExtractTextPlugin('style.bundle.css'),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
        modules: ['src/js', 'node_modules'],
        extensions: ['.jsx', '.js'],
        alias: {
            // for shorter import references
            actions: path.resolve(__dirname, 'src', 'js', 'actions'),
            constants: path.resolve(__dirname, 'src', 'js', 'constants'),
            reducers: path.resolve(__dirname, 'src', 'js', 'reducers'),

            components: path.resolve(__dirname, 'src', 'js', 'components'),

            panels: path.resolve(__dirname, 'src', 'js', 'components', 'panels'),
            utils: path.resolve(__dirname, 'src', 'js', 'components', 'utils'),

            // remove later?
            containers: path.resolve(__dirname, 'src', 'js', 'containers'),

        }
    }

  // devServer: {
  //   contentBase: paths.SRC,
  // },
};
