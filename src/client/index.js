import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { injectGlobal, hydrate } from 'emotion'
import createHistory from 'history/createBrowserHistory'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import App from './components/App'
import configureStore from './configureStore'

// rehydrate server rendered dynamic style ids
hydrate(window.__CSS_DYNAMIC_IDS__)

// inject global styles
injectGlobal`
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    background: #eaecef;
    color: #4a4a4a;
    font: 16px/1.2 BlinkMacSystemFont, -apple-system, “Segoe UI”, Roboto, Helvetica, Arial, sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`

const history = createHistory()
const { store } = configureStore(history, window.REDUX_STATE)

const render = (App, method = 'render') =>
  ReactDOM[method](
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App.js', () => {
    const App = require('./components/App').default
    render(App)
  })
}

render(App, 'hydrate')
