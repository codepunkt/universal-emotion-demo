import { NOT_FOUND } from 'redux-first-router'
import { ROUTE } from '../actions'

const components = {
  [ROUTE.HOME]: 'home',
  [ROUTE.FOO]: 'foo',
  [ROUTE.BAR]: 'bar',
  [ROUTE.BAZ]: 'baz',
  [ROUTE.LOGIN]: 'login',
  [NOT_FOUND]: 'notFound',
}

export default (state = 'Home', action = {}) => {
  return components[action.type] || state
}
