var path = require('path')
var webpack = require('webpack')
var config = require('./config')

var autoprefixer = require('autoprefixer')
var StyleLintPlugin = require('stylelint-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var SimpleProgressPlugin = require('webpack-simple-progress-plugin')
var chalk = require('chalk')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var extractSCSS = new ExtractTextPlugin('css/app.css')

module.exports = {
  entry: config.entry.app,
  output: {
    path: path.resolve(__dirname, '../' + config.output_path),
    publicPath: './',
    filename: 'js/app.js'
  },
  externals: {
    foundation: 'Foundation'
  },
  module: {
    loaders: [
      // ESLINT
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/],
        enforce: 'pre'
      },
      // VUEJS
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // JS
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // STYLES
      {
        test: /\.(css|scss)$/,
        loader: extractSCSS.extract(['css-loader?minimize', 'postcss-loader', 'sass-loader']),
        exclude: /node_modules/
      },
      // IMAGES
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: 'img/[name].[ext]'
        }
      },
      // WOFF
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          name: 'fonts/[name].[ext]',
          mimetype: 'application/font-woff'
        }
      },
      // WOFF2
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          name: 'fonts/[name].[ext]',
          mimetype: 'application/font-woff'
        }
      },
      // TTF
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          name: 'fonts/[name].[ext]',
          mimetype: 'application/octet-stream'
        }
      },
      // EOT
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          name: 'fonts/[name].[ext]'
        }
      },
      // SVG
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          name: 'fonts/[name].[ext]',
          mimetype: 'image/svg+xml',
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new SimpleProgressPlugin({
      messageTemplate: chalk.yellow.bold('[Build...] ') + chalk.green(':percent') + ' :bar (:elapsed seconds)',
      progressOptions: {
        complete: chalk.bgGreen(' '),
        incomplete: chalk.bgBlack(' '),
        clear: false
      }
    }),
    new CleanWebpackPlugin(['www'], {
      root: process.cwd(),
      verbose: true
    }),
    extractSCSS,
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'node_modules')]
        },
        postcss: [
          autoprefixer({
            browsers: config.browsers
          })
        ],
        vue: {
          loaders: {
            sass: extractSCSS.extract(['css-loader?minimize', 'postcss-loader', 'sass-loader'])
          }
        }
      }
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      files: '**/*.s?(a|c)ss',
      failOnError: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}

// HTML Inject
// ----------------------------
if (config.html === true) {
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlWebpackPlugin({
      title: config.siteName,
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ])
}
