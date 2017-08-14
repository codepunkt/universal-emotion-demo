export default (state = 'initToken', action = {}) =>
  (action.type === 'TOKEN' && action.payload) || state
