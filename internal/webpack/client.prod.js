const path = require('path')
const webpack = require('webpack')
const BabiliPlugin = require('babili-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const dir = rel => path.resolve(__dirname, '../../', rel)

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  entry: {
    app: ['babel-polyfill', dir('src/client/index.js')],
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: dir('dist/client'),
    publicPath: '/',
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
                localIdentName: '[local]',
              },
            },
          ],
        }),
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
    // build webpack bootstrap file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'bootstrap',
      filename: '[name].[chunkhash].js',
      minChunks: Infinity,
    }),
    // https://github.com/faceyspacey/react-universal-component/issues/26
    // new webpack.optimize.CommonsChunkPlugin({
    //   children: true,
    //   async: 'usedTwice',
    //   minChunks: 2,
    // }),
    new ExtractCssChunks(),
    // copy public files
    new CopyWebpackPlugin([{ from: dir('public'), to: dir('dist/client') }]),
    // minify resulting sources
    new BabiliPlugin({}, { comments: false }),
    new webpack.HashedModuleIdsPlugin(),
    // analyze bundle statistics
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'gzip',
      openAnalyzer: true,
      generateStatsFile: true,
      reportFilename: '../../stats.html',
    }),
    new WorkboxPlugin({
      globDirectory: dir('dist/client'),
      globPatterns: ['**/*.{html,js,css}'],
      swSrc: dir('src/client/serviceWorker.js'),
      swDest: dir('dist/client/serviceWorker.js'),
    }),
  ],
}
