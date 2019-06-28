import * as React from 'react';
const { useState } = React;
import { Props, State } from '../ReactInterface';
import '../style/components/login.scss';
import '../style/containers/container.scss';

export const Login = () => {
  return (
    <div className="container container__login">
      <div>
        <div className="c-login-icon"></div>
      </div>
    </div>
  );
}
