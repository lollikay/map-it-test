const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const fs = require("fs");

const pages =
  fs
    .readdirSync(path.resolve(__dirname, 'src/pages/'))
    .filter(fileName => fileName.endsWith('.html'));

module.exports = (env, options) => ({
  entry: path.join(__dirname, "src/js", "index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(pcss|css)$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              }
            },
          },
        ]
      },
      {
        test: /\.(png|jpg|jpeg)/,
        type: 'asset/resource',
        generator: {
          // output filename for images
          filename: '/images/[name][ext]',
        },
      },
      {
        test: /\.ico/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
    ],
  },
  plugins: [
    options.mode === "development"
      ? false
      : new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/pages", "index.html"),
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "src/json",
    //       to: "public/json"
    //     },
    //     {
    //       from: "src/icons",
    //       to: "public/icons"
    //     }
    //   ]
    // }),
  ].filter(n => n),
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
    filename: '[name].js',
  },
  devServer: {
    watchFiles: ['src/**'],
  },
});