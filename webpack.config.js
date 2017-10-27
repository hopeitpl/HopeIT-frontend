var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var SRC_DIR = path.resolve(__dirname, 'src');
var DIST_DIR = path.resolve(__dirname, 'dist');

var config = {
  entry: {
    app: [
      './src/main.js'
    ]
  },
  output: {
    path: DIST_DIR,
    filename: 'static/[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: SRC_DIR,
        loader: 'babel-loader'
      },

      // File loaders
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name].[ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: 'static/images/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/images/[name].[ext]'
        }
      }
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      SRC_DIR
    ],
    extensions: ['.js', '.json', '.jsx', '.scss']
  },
  target: 'web',
  stats: 'minimal',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      },
      '__PRODUCTION__': JSON.stringify(process.env.NODE_ENV === 'production'),
      '__API_URL__': JSON.stringify(process.env.API_URL || 'http://hopeit.karkut.info:8000')
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      hash: false,
      favicon: 'src/base/assets/favicon.ico',
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
};

// Environment specific config

switch (process.env.NODE_ENV) {
  case 'development':
    const HOST = '0.0.0.0';
    const PORT = 3333;

    config.entry.app.unshift(
      'babel-polyfill',
      'react-hot-loader/patch'
    );

    config.module.rules.unshift(
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        include: SRC_DIR,
        loader: 'eslint-loader'
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    );

    config.devtool = 'eval';

    config.devServer = {
      host: HOST,
      port: PORT,
      contentBase: config.output.path,
      public: process.env.PUBLIC,
      publicPath: `http://${HOST}:${PORT}${config.output.publicPath}`,
      compress: true,
      historyApiFallback: true,
      hot: true,
      overlay: {
        errors: true
      },
      stats: 'minimal',
    };

    config.plugins.unshift(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    );
    break;
  case 'production':
    config.entry.app.unshift(
      'babel-polyfill'
    );

    config.module.rules.unshift(
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        include: SRC_DIR,
        loader: 'eslint-loader',
        options: {
          failOnWarning: true
        }
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    );

    config.devtool = 'source-map';

    config.plugins.unshift(
      new ExtractTextPlugin({
        filename: 'static/[name].[contenthash].css',
      }),
      new UglifyJSPlugin({
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: false
          }
        }
      })
    );
    break;
}

module.exports = config;
