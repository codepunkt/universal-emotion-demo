const express = require('express')
const webpack = require('webpack')
import cookieParser from 'cookie-parser'
const noFavicon = require('express-no-favicons')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const clientConfig = require('../../internal/webpack/client.dev')
const serverConfig = require('../../internal/webpack/server.dev')

const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path

const app = express()

app.disable('x-powered-by')
app.use(noFavicon())
app.use(cookieParser())

let initialBuildFinished = false

const done = () => {
  if (!initialBuildFinished) {
    app.listen(3000, () => {
      initialBuildFinished = true
      console.log('Listening @ http://localhost:3000')
    })
  }
}

if (process.env.NODE_ENV === 'development') {
  const multiCompiler = webpack([clientConfig, serverConfig])
  const clientCompiler = multiCompiler.compilers[0]
  const options = { publicPath, stats: { colors: true } }

  app.use(webpackDevMiddleware(multiCompiler, options))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(multiCompiler))

  clientCompiler.plugin('done', done)
} else {
  const clientStats = require('../../dist/client/stats.json')
  const serverRender = require('../../dist/server/main.js').default

  app.use(publicPath, express.static(outputPath))
  app.use(serverRender({ clientStats }))

  done()
}
