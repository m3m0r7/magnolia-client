import React, { useState, useEffect } from 'react';
import { Props, State } from './ReactInterface';
import { useDispatch, useSelector } from 'react-redux'

import { Login } from "./containers/Login";
import Main from "./containers/Main";
import * as Action from "./Actions/Action";
import { LOGIN_FAILED, LOGIN_SUCCESS } from "./Actions/Types";

export const App = (props: any) => {
  const context = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (context.login.isLoggedIn) {
      return;
    }
    fetch('/api/v1/user')
      .then((response) => {
        return response.json()
      })
      .then((json) => {\
        dispatch(
          Action.Login(
            LOGIN_SUCCESS,
            json
          )
        );
      });
  });

  return (
    <>
      {
        context.login.isLoggedIn
          ? <Main />
          : <>
              <div className="wallpaper"></div>
              <div className="wallpaper-mask"></div>
              <div className="front">
                <Login />
              </div>
            </>
      }
    </>
  );
};
