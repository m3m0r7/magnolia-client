import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from "@actions/Types";

const initialState = {
  isLoggedIn: null,
  force: false,
};

export const LoginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
  }
  return state;
};
