import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { injectGlobal } from 'emotion'
import createHistory from 'history/createBrowserHistory'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import App from './components/App'
import configureStore from './configureStore'

injectGlobal`
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
`

const history = createHistory()
const { store } = configureStore(history, window.REDUX_STATE)

const render = App =>
  ReactDOM.render(
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

render(App)
