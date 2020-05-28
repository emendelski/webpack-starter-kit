/* eslint-disable */
const path = require('path');

const Autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const StyleLintPlugin = require('stylelint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const DEV_MODE = process.env.NODE_ENV === 'dev';
const DOCS_PATH = 'docs/assets';

const webpackConfig = {
  devtool: DEV_MODE ? 'source-map' : false,
  entry: {
    main: './src/main.js',
    docs: './docs/src/docs.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (chunkData) => {
      return chunkData.chunk.name === 'docs' ? `${DOCS_PATH}/[name].js`: 'scripts/[name].js';
    },
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: DEV_MODE,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: DEV_MODE,
              includePaths: [
                path.resolve(__dirname, 'node_modules')
              ],
              plugins() {
                return [
                  Autoprefixer,
                ];
              },
            },
          },
          {
            loader: "group-css-media-queries-loader",
            options: {
              sourceMap: DEV_MODE
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: DEV_MODE,
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, 'node_modules')
                ],
              },
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              outputPath: (url, resourcePath, context) => {
                const relativePath = path.relative(context, resourcePath);
                const srcDocs = relativePath.indexOf('docs');
                const filename = path.basename(relativePath);

                return srcDocs === 0 ? `docs/assets/${filename}` : `images/${filename}`;
              },
              publicPath: (url, resourcePath, context) => {
                const relativePath = path.relative(context, resourcePath);
                const srcDocs = relativePath.indexOf('docs');
                const filename = path.basename(relativePath);

                return srcDocs === 0 ? filename : `../images/${filename}`;
              },
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
              mozjpeg: {
                progressive: true,
                quality: 85
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.75, 0.85],
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
        test: /\.(eot|ttf|woff|woff2)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 8 * 1024,
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: '../fonts',
          }
        }
      },
    ]
  },
  plugins: [
    new StyleLintPlugin(),
    new MiniCssExtractPlugin({
      moduleFilename: (chunk) => {
        return chunk.name === 'docs' ? `${DOCS_PATH}/[name].css`: 'styles/[name].css';
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '*.html',
          to:  path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'static'),
          to:  path.resolve(__dirname, 'dist/static'),
        },
      ],
    }),
    // compress images
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      cacheFolder: path.resolve('cache'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: DEV_MODE ? 'server' : 'static',
      openAnalyzer: false,
      analyzerPort: 0,
    })
  ]
};

module.exports = webpackConfig;
