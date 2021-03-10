const path = require('path')

const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin('./dist/sail.css')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'sail.js',
    library: 'Sail',
    libraryTarget: 'window',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['Sail']
      }
    }),
    new ExtractTextPlugin('sail.css')
  ]
}
