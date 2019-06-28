import * as React from 'react';
const { useState } = React;
import { Props, State } from '../ReactInterface';
import '../style/components/login.scss';
import '../style/components/input.scss';
import '../style/containers/container.scss';

export const Login = () => {
  return (
    <div className="container container__login">
      <div>
        <div className="text-center"><div className="c-login-icon"></div></div>
        <p><input className="c-login-input" placeholder="ENTER YOUR ID" /></p>
        <p><input className="c-login-input" placeholder="ENTER YOUR PASSWORD" /></p>
      </div>
    </div>
  );
}
