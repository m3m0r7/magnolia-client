import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Login } from "@containers/Login";
import { Main } from "@containers/Main";
import { Loading } from "@containers/Loading";
import * as Action from "@actions/Action";
import { LOGIN_FAILED, LOGIN_SUCCESS } from "@actions/Types";
import * as API from "@util/API";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      height: 'calc(100vh - 56px)',
      overflowY: 'scroll',
    },
  }),
);

interface Window {
  Magnolia: any;
}
declare let window: Window;

export const App = (props: any) => {
  const classes = useStyles();
  const context = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(
    () => {
      API.call(`/api/v1/user`)
        .then((response: any) => {
          return response.json()
        })
        .then((json: any) => {
          setIsLoading(false);
          dispatch(
            Action.Login(
              !json.status || json.status != 200
                ? LOGIN_FAILED
                : LOGIN_SUCCESS,
              json
            )
          );
        });
    },
    []
  );

  return (
    <Container maxWidth="sm" className={classes.root}>
      {
        isLoading && <Loading />
      }
      {
        !isLoading && (
          context.login.isLoggedIn
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
