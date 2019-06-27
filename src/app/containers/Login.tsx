import * as React from 'react';
const { useState } = React;
import { Props, State } from '../ReactInterface';
import '../style/components/login.scss';

export const Login = () => {
  return (
    <div>
      <img src="/img/hamster.png" className="c-login-icon" />
    </div>
  );
}
