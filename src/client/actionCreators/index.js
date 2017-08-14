import { NOT_FOUND } from 'redux-first-router'
import { ROUTE } from '../actions'
// try dispatching these from the redux devTools

export const goToPage = (type, category) => ({
  type,
  payload: category && { category },
})

export const goHome = () => ({
  type: ROUTE.HOME,
})

export const notFound = () => ({
  type: NOT_FOUND,
})
