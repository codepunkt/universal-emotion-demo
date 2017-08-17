const initialState = 'initToken'

export default (state = initialState, action = {}) =>
  (action.type === 'TOKEN' && action.payload) || state
