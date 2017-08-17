const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

const dir = rel => path.resolve(__dirname, '../../', rel)

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'eval-source-map',
  entry: {
    app: [
      'babel-polyfill',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
      'react-hot-loader/patch',
      dir('src/client/index.js'),
    ],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: dir('dist/client'),
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractCssChunks.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]',
              },
            },
          ],
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.css', '.js'],
  },
  plugins: [
    new ExtractCssChunks(),
    new WriteFilePlugin(),
    new CopyWebpackPlugin([{ from: dir('public'), to: dir('dist/client') }]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: '[name].js',
      minChunks: Infinity,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
}
