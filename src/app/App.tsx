import * as React from 'react';
import { Props, State } from './ReactInterface';

import { Login } from "./containers/Login";

export const App = () => {
  return (
    <>
      <div className="wallpaper-mask"></div>
      <div className="front">
        <Login />
      </div>
    </>
  );
}
