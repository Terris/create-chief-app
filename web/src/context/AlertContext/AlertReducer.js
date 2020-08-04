export const AlertReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_ERROR': {
      const newState = { ...state }
      return newState
    }

    default:
      return state
  }
}
