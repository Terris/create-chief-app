export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN': {
      const newState = {
        ...state,
        currentUser: action.payload.user,
        isAuthenticated: action.payload.user ? true : false,
      }
      return newState
    }

    case 'SIGN_OUT': {
      const newState = {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      }
      return newState
    }

    default:
      return state
  }
}
