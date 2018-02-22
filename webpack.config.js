/* eslint-disable */
const path = require('path');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isSourceMap = false;
const staticAssetsDir = path.resolve(__dirname, 'static');

module.exports = function(env) {
  return {
    entry: {
      global: './src/js/global.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js', '.css', '.scss', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: isSourceMap
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: isSourceMap,
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  plugins: function () {
                    return [
                      autoprefixer
                    ]
                  }
                }
              }
            ]
          })
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: './images/[name]-[hash:5].[ext]'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 85
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: 85,
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                }
              }
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            'raw-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: './fonts/[name]-[hash:5].[ext]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: './media/[name]-[hash:5].[ext]'
          }
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('style.css'),
      new CleanWebpackPlugin(['dist']),
      new CopyWebpackPlugin([
        {
          from: '*.html',
          to:  path.resolve(__dirname, 'dist')
        },
        {
          from: path.resolve(__dirname, 'static'),
          to:  path.resolve(__dirname, 'dist/static')
        }
      ], {})
    ]
  }
}
