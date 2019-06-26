import * as React from 'react';
interface Props {}
interface State {
  count: number;
}

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}
