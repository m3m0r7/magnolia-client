import * as React from 'react';
import { connect } from 'react-redux'
import { Props, State } from '../ReactInterface';
import * as Action from '../Actions/Action';

import '../style/components/login.scss';
import '../style/components/input.scss';
import '../style/containers/container.scss';

const { useState, useRef } = React;

const Login = (props: any) => {
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const loginAction = () => {
    const id = (idRef.current as any).value;
    const password = (passwordRef.current as any).value;
    fetch('/api/v1/login', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({id, password})
    } as any)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        props.
        console.log(json);
      });
    return false;
  };
  return (
    <div className="container container__login">
      <div>
        <div className="text-center">
          <div className="c-login-icon"></div>
        </div>
        <form action="javascript:void(0)" onSubmit={loginAction}>
          <p><input ref={idRef} type="text" className="input c-login-input" placeholder="ID" /></p>
          <p><input ref={passwordRef} type="password" className="input c-login-input" placeholder="PASSWORD" /></p>
          <input type="submit" value="" className="input input__hidden" />
        </form>
      </div>
    </div>
  );
};

export default connect(
  (state: any) => state,
  (dispatch: any) => {
    return {}
  }
)(Login);
