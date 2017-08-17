import React from 'react'
import { css } from 'emotion'
import { connect } from 'react-redux'
import universal from 'react-universal-component'
import { Transition, TransitionGroup } from 'transition-group'
import NotFound from './NotFound'
import isLoading from '../selectors/isLoading'

const UniversalComponent = ({ page, isLoading }) => {
  const Component = components[page] || NotFound
  return <Component isLoading={isLoading} />
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

const Switcher = ({ page, direction, isLoading }) =>
  // <TransitionGroup className={`${direction}`} duration={500} prefix="fade">
  <TransitionGroup
    className={resting}
    duration={duration / 2}
    enterDelay={duration / 2}
    //appear
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
        <UniversalComponent page={page} isLoading={isLoading} />
      </div>
    </Transition>
  </TransitionGroup>

const mapState = ({ page, direction, ...state }) => ({
  page,
  direction,
  isLoading: isLoading(state),
})

export default connect(mapState)(Switcher)
