import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const mode = {
  dev: 'development',
  prod: 'production',
};

const isDev = process.env.NODE_ENV === mode.dev;

const config = {
  entry: path.resolve(dirname, 'src', 'index.tsx'),
  output: {
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(dirname, 'build'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    // alias: {'@components': path.resolve(dirname, 'src', 'components')}
  },
  mode: isDev ? mode.dev : mode.prod,
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf|svg)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(dirname, 'src', 'favicon'),
          to: path.resolve(dirname, 'build', 'favicon'),
        },
        {
          from: path.resolve(dirname, 'src', 'assets'),
          to: path.resolve(dirname, 'build', 'assets'),
        },
      ],
    }),
  ],

  devServer: {
    static: path.resolve(dirname, 'build'),
    open: true,
    compress: true,
    historyApiFallback: true,
    hot: true,
  },
  devtool: isDev ? 'source-map' : false,
};

export default config;
