const path = require('path')
const webpack = require('webpack')
const AutoDllPlugin = require('autodll-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../../src/client/index.js'),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../../dist/client'),
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
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
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
    new AutoDllPlugin({
      context: path.join(__dirname, '..', '..'),
      filename: '[name].js',
      entry: {
        vendor: [
          'babel-polyfill',
          'emotion',
          'history/createBrowserHistory',
          'ramda',
          'react',
          'react-dom',
          'react-redux',
          'recompose',
          'redux',
          'redux-first-router',
          'redux-first-router-link',
          'reselect',
          'transition-group',
        ],
      },
    }),
  ],
}
