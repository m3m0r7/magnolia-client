import * as React from 'react';
import { connect } from 'react-redux'
const { useState, useRef } = React;
import { Props, State } from '../ReactInterface';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import Icon from '@material-ui/core/Icon';

import '../style/components/login.scss';
import '../style/components/input.scss';
import '../style/containers/container.scss';

export const Main = (props: any) => {
  const [ value, setValue ] = React.useState(0);

  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event: any, newValue: any) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Live"
          icon={<Icon>data_usage</Icon>}
        />
        <BottomNavigationAction
          label="Histories"
          icon={<Icon>watch_later</Icon>}
        />
        <BottomNavigationAction
          label="Favs"
          icon={<Icon>favorite</Icon>}
        />
        <BottomNavigationAction
          label="Settings"
          icon={<Icon>settings</Icon>}
        />
      </BottomNavigation>
    </div>
  );
};

