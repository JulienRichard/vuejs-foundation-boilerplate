let path = require('path')
let webpack = require('webpack')
let config = require('./config')

let autoprefixer = require('autoprefixer')
let BrowserSyncPlugin = require('browser-sync-webpack-plugin')
let StyleLintPlugin = require('stylelint-webpack-plugin')
let SimpleProgressPlugin = require('webpack-simple-progress-plugin')
let chalk = require('chalk')

module.exports = {
  entry: config.entry.app,
  output: {
    path: path.resolve(__dirname, '/'),
    publicPath: '/',
    filename: 'bundle.js'
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
        loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      // IMAGES
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: 'img/[name].[ext]?[hash]'
        }
      },
      // WOFF
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          name: 'fonts/[name].[ext]?[hash]',
          mimetype: 'application/font-woff',
          limit: 10000
        }
      },
      // WOFF2
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          name: 'fonts/[name].[ext]?[hash]',
          mimetype: 'application/font-woff',
          limit: 10000
        }
      },
      // TTF
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          name: 'fonts/[name].[ext]?[hash]',
          mimetype: 'application/octet-stream',
          limit: 10000
        }
      },
      // EOT
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          name: 'fonts/[name].[ext]?[hash]'
        }
      },
      // SVG
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          name: 'fonts/[name].[ext]?[hash]',
          mimetype: 'image/svg+xml',
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new SimpleProgressPlugin({
      messageTemplate: chalk.yellow.bold('[Bundle...] ') + chalk.green(':percent') + ' :bar (:elapsed seconds)',
      progressOptions: {
        complete: chalk.bgGreen(' '),
        incomplete: chalk.bgBlack(' '),
        clear: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      options: {
        eslint: {
          configFile: path.resolve(__dirname, '.eslintrc'),
          failOnWarning: false,
          failOnError: false
        },
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
            sass: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
          }
        }
      }
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      files: '**/*.s?(a|c)ss',
      failOnError: false
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

// BrowserSync
// ----------------------------
if (config.browserSync === true) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new BrowserSyncPlugin({
      files: ['**/*.php', '**/*.html'],
      host: 'localhost',
      port: config.browserSyncPort,
      // proxying WebpackDevServer
      proxy: 'http://localhost:8080/'
    }, {
      reload: false
    })
  ])
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
