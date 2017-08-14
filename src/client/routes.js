import { redirect } from 'redux-first-router'
import { ROUTE } from './actions'

// if part of the payload (e.g. id) was not found, redirect to not found:
// import { NOT_FOUND } from 'redux-first-router'
// dispatch({ type: NOT_FOUND })

export default {
  [ROUTE.HOME]: {
    path: '/',
    thunk: async (dispatch, getState) => {
      const { jwToken } = getState()

      if (!jwToken) {
        dispatch(redirect({ type: ROUTE.LOGIN }))
      }
    },
  },
  [ROUTE.FOO]: {
    path: '/foo/:id',
  },
  [ROUTE.BAR]: {
    path: '/bar',
  },
  [ROUTE.BAZ]: {
    path: '/baz',
  },
  [ROUTE.LOGIN]: {
    path: '/login',
  },
  ADMIN: {
    path: '/admin', // TRY: visit this path or dispatch ADMIN
    role: 'admin', // + change jwToken to 'real' in server/index.js
  },
}
