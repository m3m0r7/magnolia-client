import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';

import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// Styles
import 'normalize.css';
import './app/style/common.scss';

// Containers
import { App } from './app/App';
import { NotFound } from "./app/containers/NotFound";

// Stores
import configureStore, { history, store } from './app/stores/configureStore';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ef6c00',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route
              exact
              path="/(histories|favorites|settings|)?"
              render={
                (match: any) => {
                  return (
                    <App
                      match={match.match}
                    />
                  );
                }
              }
            />
            <Route render={() => <NotFound />} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('app')
);
