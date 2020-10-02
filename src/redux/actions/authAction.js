import { STORE_USER_DATA, CLEAR_USER_DATA } from './_type';

export const fetchUserData = (data) => async (dispatch) => {
  return dispatch({
    type: STORE_USER_DATA,
    payload: data,
  });
};

export const clearUserData = () => async (dispatch) => {
  return dispatch({
    type: CLEAR_USER_DATA,
    payload: {},
  });
};
