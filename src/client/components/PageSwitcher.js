import React from 'react'
import { css } from 'emotion'
import { connect } from 'react-redux'
import universal from 'react-universal-component'
import { Transition, TransitionGroup } from 'transition-group'
import NotFound from './NotFound'

class UniversalComponent extends React.Component {
  state = {
    hasError: false,
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info)
  }

  render() {
    return this.state.hasError
      ? <div>an error occurred :(</div>
      : React.createElement(components[this.props.page] || NotFound)
  }
}

const duration = 300

const createUniversal = name =>
  universal(() => import(`./${name}`), {
    minDelay: duration / 2,
    loading: () =>
      <div>
        loading {name}...
      </div>,
  })

const components = {
  home: createUniversal('Home'),
  static: createUniversal('Static'),
  dynamic: createUniversal('Dynamic'),
  both: createUniversal('Both'),
}

const enter = css`
  opacity: 0;
  transform: translateX(10px);
  &-active {
    transform: translateX(0);
    opacity: 1;
    transition: opacity ${duration / 2}ms, transform ${duration /
  2}ms ease-in-out;
  }
`

const leave = css`
  opacity: 1;
  transform: translateX(0);
  &-active {
    opacity: 0;
    transform: translateX(10px);
    transition: opacity ${duration / 2}ms, transform ${duration /
  2}ms ease-in-out;
  }
`

const resting = css`
  > div {
    position: absolute;
    top: 51px;
    left: 0;
    margin: 0 16px 16px 16px;
    max-width: 328px;
  }
`

const Switcher = ({ page }) =>
  <TransitionGroup
    className={resting}
    duration={duration / 2}
    enterDelay={duration / 2}
    enter={enter}
    leave={leave}
  >
    <Transition key={page}>
      <div>
        <h1>Universal Demo</h1>
        <p>
          This app has global styles that are combined into a main.css file with
          all styles that belong to the app's main chunk such as the margin
          around the content.
        </p>
        <UniversalComponent page={page} />
      </div>
    </Transition>
  </TransitionGroup>

const mapState = ({ page }) => ({ page })

export default connect(mapState)(Switcher)
