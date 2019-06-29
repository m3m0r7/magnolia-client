import React, { useState, useEffect } from 'react';
import { Props, State } from './ReactInterface';
import { connect } from 'react-redux'

import Login from "./containers/Login";
import Main from "./containers/Main";

const App = () => {
  useEffect(() => {
    fetch('/api/v1/user')
      .then((response) => {
        return response.json()
      })
      .then((json) => {

      });
  });

  const container = true
    ? <Login />
    : <Login />;

  return (
    <>
      <div className="wallpaper"></div>
      <div className="wallpaper-mask"></div>
      <div className="front">
        { container }
      </div>
    </>
  );
};

export default connect(
  (state: any) => state,
  (dispatch: any) => {
    return {}
  }
)(App);
