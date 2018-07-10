const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = [
  {
    entry: {
      index: './src/css/index.less',
      product: './src/css/product.less',
      server: './src/css/server.less',
      about: './src/css/about.less',
      main: './src/js/main.js'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: '[name].[chunkhash].js'
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract(
            {
              fallback: "style-loader",
              use: [
                "css-loader",
                "less-loader"
              ]
          })
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: '[name][hash].[ext]',
                publicPath: '/assets',
                outputPath: './assets'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new webpack.HashedModuleIdsPlugin(),
      new ExtractTextPlugin("css/[name].[contenthash].css"),
      new HtmlWebpackPlugin({
        chunks: ['main', 'index'],
        filename: 'index.html',
        template: './src/index.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['main', 'product'],
        filename: 'product.html',
        template: './src/product.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['main', 'server'],
        filename: 'server.html',
        template: './src/server.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['main', 'about'],
        filename: 'about.html',
        template: './src/about.html'
      }),
      new UglifyJsPlugin()
    ]
  }
];