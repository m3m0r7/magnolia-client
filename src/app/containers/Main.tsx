import * as React from 'react';
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import Icon from '@material-ui/core/Icon';

// Load screens
import { LiveScreen } from "./screens/LiveScreen";
import { HistoriesScreen } from "./screens/HistoriesScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

// Load styles
import '../style/components/login.scss';
import '../style/components/input.scss';
import '../style/components/footer.scss';
import '../style/containers/container.scss';

const { useState, useRef } = React;

export const Main = (props: any) => {
  const context = useSelector((state: any) => state);
  const [ value, setValue ] = React.useState(0);
  const [ route ] = props.match.params;

  let screen = null;

  switch (route) {
    case 'histories':
      screen = <HistoriesScreen />;
      break;
    case 'settings':
      screen = <SettingsScreen />;
      break;
    case 'favorites':
      screen = <FavoritesScreen />;
      break;
    default:
      screen = <LiveScreen />;
      break;
  }

  return (
    <>
      { screen }
      <footer className="c-footer-navigation">
        <BottomNavigation
          value={value}
          onChange={(event: any, newValue: any) => {
            let path = '/';
            switch (newValue) {
              case 1:
                path = '/histories';
                break;
              case 2:
                path = '/favorites';
                break;
              case 3:
                path = '/settings';
                break;
            }
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
            label="Favorites"
            icon={<Icon>favorite</Icon>}
          />
          <BottomNavigationAction
            label="Settings"
            icon={<Icon>settings</Icon>}
          />
        </BottomNavigation>
      </footer>
    </>
  );
};

