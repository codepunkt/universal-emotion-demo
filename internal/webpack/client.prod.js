const path = require('path')
const webpack = require('webpack')
const StatsPlugin = require('stats-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, '../../src/client/index.js'),
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
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
        use: 'css-loader',
        // use: ExtractCssChunks.extract({
        //   use: [
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         modules: true,
        //         localIdentName: '[local]',
        //       },
        //     },
        //   ],
        // }),
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // webpack bootstrap/manifest/runtime code
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: '[name].[chunkhash].js',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      async: true,
      children: true,
      minChunks: 2,
    }),
    // new ExtractCssChunks(),
    // new BabiliPlugin({}, { comments: false }),
    // new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
    new StatsPlugin('stats.json'),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'gzip',
      openAnalyzer: true,
      reportFilename: '../../stats.html',
    }),
  ],
}
