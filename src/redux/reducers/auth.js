import {LOGIN_USER, LOGOUT_USER} from '../actions/types';

const initState = {
  loggedIn: false,
  token: null,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loggedIn: action.payload.login, 
        token: action.payload.token,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loggedIn: action.payload.login,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
