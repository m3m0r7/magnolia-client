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
        <form>
          <p><input type="text" className="c-login-input" placeholder="ID" /></p>
          <p><input type="password" className="c-login-input" placeholder="PASSWORD" /></p>
        </form>
      </div>
    </div>
  );
}
