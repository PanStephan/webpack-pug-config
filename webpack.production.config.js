/* eslint-disable */
const path = require('path');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: {
    '/' : './src/js/main.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: ''
  },
  watchOptions: {
    ignored: /node_modules/
  },
  mode: 'production',
  node: { 
    fs: 'empty',
    net: 'empty'
  },
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '_'
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/i,
        use: {
          loader: "pug-loader",
          query: {}, 
        }
      },
      {
        test: /\.(sa|sc|c)ss$/, 
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            }
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new MinifyPlugin(),
    new HtmlWebpackPlugin({ filename: `index.html`, template: 'src/views/index.pug'}),
  ]
}