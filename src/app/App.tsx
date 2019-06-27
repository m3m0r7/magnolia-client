import * as React from 'react';
import { Props, State } from './ReactInterface';

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}
