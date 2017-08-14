import { compose, map, merge, reduce, toUpper } from 'ramda'

const toActionTypeMap = compose(
  reduce((acc, str) => merge(acc, { [str]: `ROUTE/${str}` }), {}),
  map(toUpper)
)

// export ROUTE action type object
export const ROUTE = toActionTypeMap(['home', 'foo', 'bar', 'baz', 'login'])
