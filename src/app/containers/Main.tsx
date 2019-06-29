import * as React from 'react';
import { connect } from 'react-redux'
const { useState, useRef } = React;
import { Props, State } from '../ReactInterface';
import '../style/components/login.scss';
import '../style/components/input.scss';
import '../style/containers/container.scss';

const Main = (props: any) => {
  return (
    <div>
      I'm logged in.
    </div>
  );
};


export default connect(
  (state: any) => state,
  (dispatch: any) => {
    return {}
  }
)(Main);
