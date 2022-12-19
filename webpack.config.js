const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    // another: './src/components/account.js',
  },
  output: {
    filename: '[name].bundle.js',
    assetModuleFilename: 'fonts/[hash][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        // type: 'asset/resource',
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        // type: 'asset/resource',
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Coin',
    }),
    new MiniCssExtractPlugin({
      linkType: 'text/css',
    }),
  ],
  devServer: {
    hot: true,
    port: 4000,
    open: true,
  },
};
