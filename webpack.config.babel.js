/* eslint-disable */
const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const DEV_MODE = process.env.NODE_ENV === 'dev';
const DOCS_PATH = 'docs/assets';

const webpackConfig = {
  devtool: DEV_MODE ? 'source-map' : false,
  target: 'web',
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: chunkData => {
      return chunkData.chunk.name === 'docs' ? `${DOCS_PATH}/[name].js` : 'scripts/[name].js';
    },
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|vendor)/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: DEV_MODE,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: DEV_MODE,
              postcssOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: DEV_MODE,
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules')],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new StyleLintPlugin(),
    new ESLintPlugin(),
    new MiniCssExtractPlugin({
      filename: chunk => {
        return chunk.name === 'docs' ? `${DOCS_PATH}/[name].css` : 'styles/[name].css';
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '*.html',
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'static'),
          to: path.resolve(__dirname, 'dist/static'),
        },
      ],
    }),
  ],
};

module.exports = webpackConfig;
