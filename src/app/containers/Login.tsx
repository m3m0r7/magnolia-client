import * as React from 'react';
import { Props, State } from '../ReactInterface';
import '../style/components/login.scss';

export default class Login extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <img src="/img/hamster.png" className="c-login-icon" />
      </div>
    );
  }
}
