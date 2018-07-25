const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const postcssImport = require("postcss-import");
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

const CompressionPlugin = require('compression-webpack-plugin');

const postcssOpts = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: (webpack) => [
    postcssImport({
      addDependencyTo: webpack
    }),
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    pxtorem({ rootValue: 200, propWhiteList: [] })
  ],
};

module.exports = [
  {
    entry: {
      index: './src/mobile/css/index.less',
      product: './src/mobile/css/product.less',
      server: './src/mobile/css/server.less',
      about: './src/mobile/css/about.less',
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
          test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        },
        {
          test: /\.less$/i, use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader', { loader: 'postcss-loader', options: postcssOpts }, 'less-loader'
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
        template: './src/mobile/index.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['main', 'product'],
        filename: 'product.html',
        template: './src/mobile/product.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['main', 'server'],
        filename: 'server.html',
        template: './src/mobile/server.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['main', 'about'],
        filename: 'about.html',
        template: './src/mobile/about.html'
      }),
      new UglifyJsPlugin(),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
];
