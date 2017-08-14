import React from 'react'
import { connect } from 'react-redux'
import universal from 'react-universal-component'
// import { TransitionGroup, Transition } from 'transition-group'

import NotFound from './NotFound'
import isLoading from '../selectors/isLoading'

const loading = () => <div>loading chunk</div>

const UniversalComponent = ({ page, isLoading }) => {
  console.log(page)
  const Component = components[page] || NotFound
  return <Component isLoading={isLoading} />
}

const components = {
  home: universal(() => import('./Home'), {
    minDelay: 1200, // match sliding animation duration
    loading,
  }),
  login: universal(() => import('./Login'), {
    minDelay: 1200, // for silky smooth animations
    loading,
  }),
  foo: universal(() => import('./Foo'), {
    minDelay: 1200, // i.e. no re-renders during animation
    loading,
  }),
  bar: universal(() => import('./Bar'), {
    minDelay: 1200, // i.e. no re-renders during animation
    loading,
  }),
  baz: universal(() => import('./Baz'), {
    minDelay: 1200, // i.e. no re-renders during animation
    loading,
  }),
  //   Admin,
  //   Login,
}

// NOTE: `require.resolveWeak` is Webpack method to require a module without
// creating a dependency, which powers synchronous rendering when available.
// The `resolve` option soon wont be needed thanks to an upcoming babel-plugin.
// Don't stress it.

// THE FUTURE:
// https://github.com/webpack/webpack/issues/4993
// when Webpack fixes the above issue with `resolveWeak` dynamic requires,
// we can also skip the wrapping component and just export this:
//
// UPDATE: I made a PR that addresses this (vote it up)
//
// export default universal(({ page }) => import(`../components/${page}`), {
//   minDelay: 500,
//   loading,
//   error: NotFound
// })
//
// you can see how this looks in a client-only SPA in the codesandbox:
// https://codesandbox.io/s/github/faceyspacey/redux-first-router-codesandbox
// :)

const Switcher = ({ page, direction, isLoading }) =>
  //   <TransitionGroup
  //     className={`${styles.switcher} ${direction}`}
  //     duration={500}
  //     prefix="fade"
  //   >
  //     <Transition key={page}>
  <UniversalComponent page={page} isLoading={isLoading} />
//     </Transition>
//   </TransitionGroup>

const mapState = ({ page, direction, ...state }) => ({
  page,
  direction,
  isLoading: isLoading(state),
})

export default connect(mapState)(Switcher)
