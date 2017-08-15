import express from 'express'
import webpack from 'webpack'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import noFavicon from 'express-no-favicons'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import clientConfig from '../../internal/webpack/client.dev'
import serverConfig from '../../internal/webpack/server.dev'

const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path

const app = express()

app.disable('x-powered-by')
app.use(noFavicon())
app.use(compression())
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
