export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const newState = { ...state }
      return newState
    }

    default:
      return state
  }
}
