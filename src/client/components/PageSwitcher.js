import React from 'react'
import { css } from 'emotion'
import { connect } from 'react-redux'
import universal from 'react-universal-component'
import { Transition, TransitionGroup } from 'transition-group'
import NotFound from './NotFound'
import isLoading from '../selectors/isLoading'

const loading = () => <div>loading chunk...</div>

const UniversalComponent = ({ page, isLoading }) => {
  const Component = components[page] || NotFound
  return <Component isLoading={isLoading} />
}

const duration = 5000

const components = {
  home: universal(() => import('./Home'), {
    minDelay: 0, // match sliding animation duration
    loading,
  }),
  static: universal(() => import('./Static'), {
    minDelay: 0, // i.e. no re-renders during animation
    loading,
  }),
  dynamic: universal(() => import('./Dynamic'), {
    minDelay: 0, // i.e. no re-renders during animation
    loading,
  }),
  both: universal(() => import('./Both'), {
    minDelay: 0, // i.e. no re-renders during animation
    loading,
  }),
}

const enter = css`
  opacity: 0;
  &-active {
    opacity: 1;
    transition: all ${duration / 2}ms;
  }
`

const leave = css`
  opacity: 1;
  &-active {
    opacity: 0;
    transition: all ${duration / 2}ms;
  }
`

const Switcher = ({ page, direction, isLoading }) =>
  // <TransitionGroup className={`${direction}`} duration={500} prefix="fade">
  <TransitionGroup
    className={direction}
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
