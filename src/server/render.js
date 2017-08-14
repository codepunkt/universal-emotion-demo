import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/server'
import flushChunks from 'webpack-flush-chunks'
import { flushChunkNames } from 'react-universal-component/server'
import configureStore from './configureStore'
import App from '../client/components/App'

const createApp = (App, store) =>
  <Provider store={store}>
    <App />
  </Provider>

export default ({ clientStats }) => async (req, res, next) => {
  const store = await configureStore(req, res)

  if (!store) {
    console.log('Redirect already served? <(O.o)>')
    return // no store means redirect was already served
  }

  const app = createApp(App, store)
  const appString = ReactDOM.renderToString(app)
  const stateString = JSON.stringify(store.getState())
  const chunkNames = flushChunkNames()

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets,
  } = flushChunks(clientStats, { chunkNames })

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)
  console.log('STYLESHEETS SERVED', stylesheets)

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>universal boilerplate</title>
          ${styles}
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateString}</script>
          <div id="root">${appString}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
  )
}
