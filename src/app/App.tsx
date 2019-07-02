import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';

import { Login } from "./containers/Login";
import { Main } from "./containers/Main";
import { Loading } from "./containers/Loading";
import * as Action from "./actions/Action";
import { LOGIN_FAILED, LOGIN_SUCCESS } from "./actions/Types";

export const App = (props: any) => {
  const context = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (context.login.isLoggedIn !== null && !context.login.force) {
      return;
    }
    fetch('/api/v1/user')
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        setIsLoading(false);
        dispatch(
          Action.Login(
            json.status == 400
              ? LOGIN_FAILED
              : LOGIN_SUCCESS,
            json
          )
        );
      });
  });

  return (
    <Container
      maxWidth="sm"
      style={
        {
          padding: 0,
          height: 'calc(100vh - 56px)',
          overflowY: 'scroll',
        }
      }
    >
      {
        isLoading && <Loading />
      }
      {
        !isLoading && (context.login.isLoggedIn
          ? <Main match={props.match} />
          : <>
              <div className="wallpaper"></div>
              <div className="wallpaper-mask"></div>
              <div className="front">
                <Login match={props.match} />
              </div>
            </>
          )
      }
    </Container>
  );
};
