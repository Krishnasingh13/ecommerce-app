import axios from 'axios';
import {LOGIN_USER, LOGOUT_USER} from '../actions/types';

export const loginUser = data => {
  return function (dispatch) {
    try {
      axios
        .post('https://reqres.in/api/login', data)
        .then(res => {
          dispatch({
            type: LOGIN_USER,
            payload: {login: true, token: res.data.token},
          });
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutUser = () => {
  return function (dispatch) {
    try {
      dispatch({
        type: LOGOUT_USER,
        payload: {login: false, token: ''},
      });
    } catch (error) {
      console.log(error);
    }
  };
};
