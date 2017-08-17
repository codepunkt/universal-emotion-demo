import React from 'react'
import { Provider } from 'react-redux'
import flushChunks from 'webpack-flush-chunks'
import { extractCritical } from 'emotion/server'
import { renderToString } from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import App from '../client/components/App'
import configureStore from './configureStore'

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
  const appString = renderToString(app)

  const { ids, css: cssString } = extractCritical(appString)

  const stateString = JSON.stringify(store.getState())
  const chunkNames = flushChunkNames()

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets,
  } = flushChunks(clientStats, {
    chunkNames,
    before: ['manifest', 'vendor'],
    after: ['app'],
  })

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)
  console.log('STYLESHEETS SERVED', stylesheets)

  const html = `
    <html lang="en">
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Universal Demo</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png">
      <link rel="manifest" href="/static/manifest.json">
      <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5d86c2">
      <meta name="theme-color" content="#eaecef">
      ${cssString &&
        `<style type="text/css">
          ${cssString}
        </style>`}
      ${styles}
      <div id="root">${appString}</div>
      <script>window.REDUX_STATE = ${stateString}</script>
      <script type="text/javascript">window.__CSS_DYNAMIC_IDS__=${JSON.stringify(
        ids
      )}</script>
      ${cssHash}
      ${js}
    </html>`

  res.send(html.replace(/\n|\s\s/g, ''))
}
