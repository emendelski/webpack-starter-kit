/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const DEV_MODE = process.env.NODE_ENV === 'dev'

module.exports = {
  devtool: DEV_MODE ? 'eval' : 'source-map',
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      DEV_MODE
        ? {
            test: /\.scss/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins() {
                    return [
                      autoprefixer,
                    ];
                  },
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              },
            ]
          }
        : {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins() {
                    return [
                      autoprefixer,
                    ];
                  },
                },
              },
              'sass-loader'
            ]
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
    ]
  },
  plugins: [
    new StyleLintPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
      chunkFilename: "styles/[id].css"
    }),
    new CopyWebpackPlugin([
      {
        from: './*.php',
        to:  path.resolve(__dirname, 'dist')
      },
      {
        from: 'previews/*.html',
        to:  path.resolve(__dirname, 'dist')
      },
      {
        from: path.resolve(__dirname, 'static'),
        to:  path.resolve(__dirname, 'dist/static'),
        cache: DEV_MODE
      },
      // wordpress related
      {
        context: path.resolve(__dirname, './style.css', './screenshot.png'),
        from: "**/*",
        to: path.resolve(__dirname, 'dist')
      },
      {
        context: path.resolve(__dirname, 'core'),
        from: "**/*",
        to:  path.resolve(__dirname, 'dist/core')
      },
      {
        context: path.resolve(__dirname, 'template-parts'),
        from: "**/*",
        to:  path.resolve(__dirname, 'dist/template-parts')
      },
    ]),
    // compress images
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
  ]
}
