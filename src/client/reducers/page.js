import { NOT_FOUND } from 'redux-first-router'
import { ROUTE } from '../actions'

const components = {
  [ROUTE.HOME]: 'home',
  [ROUTE.STATIC]: 'static',
  [ROUTE.DYNAMIC]: 'dynamic',
  [ROUTE.BOTH]: 'both',
  [ROUTE.LOGIN]: 'login',
  [NOT_FOUND]: 'notFound',
}

const initialState = 'Home'

export default (state = initialState, action = {}) => {
  return components[action.type] || state
}
