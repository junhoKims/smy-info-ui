/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { SwcMinifyWebpackPlugin } = require('swc-minify-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/main.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    assetModuleFilename: 'static/js/[name][ext]',
    publicPath: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(tsx|ts|jsx|js)?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'swc-loader',
        },
        include: [path.resolve(__dirname, 'src')],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ inject: true, template: './public/index.html' }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
    }),
    new BundleAnalyzerPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      public: path.resolve(__dirname, './public/'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
  },
  optimization: {
    minimize: true,
    minimizer: [new SwcMinifyWebpackPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](.pnpm)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
  },
};
