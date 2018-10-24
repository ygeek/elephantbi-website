const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const postcssImport = require("postcss-import");
const autoprefixer = require('autoprefixer');

const CompressionPlugin = require('compression-webpack-plugin');

const postcssOpts = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: (webpack) => [
    postcssImport({
      addDependencyTo: webpack
    }),
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
    })
  ]
};

module.exports = [
  {
    entry: {
      index: './src/css/index.less',
      product: './src/css/product.less',
      service: './src/css/service.less',
      about: './src/css/about.less',
      price: './src/css/price.less',
      register: './src/css/register.less',
      register_info: './src/css/register-info.less',
      demo: './src/css/demo.less',
      main: ['babel-polyfill', './src/js/main.js']
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
            presets: ['es2015', 'es2017']
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
    devServer: {
      port: 8687,
      contentBase: './dist'
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
        chunks: ['main', 'service'],
        filename: 'service.html',
        template: './src/service.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['main', 'about'],
        filename: 'about.html',
        template: './src/about.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['main', 'price'],
        filename: 'price.html',
        template: './src/price.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['main', 'demo'],
        filename: 'demo.html',
        template: './src/demo.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['main', 'register'],
        filename: 'register.html',
        template: './src/register.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['main', 'register_info'],
        filename: 'register-info.html',
        template: './src/register-info.html'
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