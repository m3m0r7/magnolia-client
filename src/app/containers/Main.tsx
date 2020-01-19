import * as React from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';

// Load components
import { history } from '@stores/configureStore';

// Load screens
import { LiveScreen } from "./screens/LiveScreen";
import { HistoriesScreen } from "./screens/HistoriesScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

// Load styles
import '@style/components/login.scss';
import '@style/components/input.scss';
import '@style/components/footer.scss';
import '@style/containers/container.scss';

const { useState, useRef } = React;

export const Main = (props: any) => {
  const context = useSelector((state: any) => state);
  const [ value, setValue ] = React.useState(0);
  const [ route ] = props.match.params;

  let screen = null;

  let initialValue = 0;
  switch (route) {
    case 'histories':
      initialValue = 1;
      screen = <HistoriesScreen />;
      break;
    case 'favorites':
      initialValue = 2;
      screen = <FavoritesScreen />;
      break;
    case 'settings':
      initialValue = 3;
      screen = <SettingsScreen />;
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
          value={initialValue}
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
            history.push(path);
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
            icon={
              context.info.favorite_count > 0
                ? <Badge badgeContent={context.info.favorite_count} color="primary">
                    <Icon>favorite</Icon>
                  </Badge>
                : <Icon>favorite</Icon>
            }
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

