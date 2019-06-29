import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { compose, createStore } from 'redux'

import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

// Styles
import 'normalize.css';
import './app/style/common.scss';

// Containers
import App from './app/App';
import { NotFound } from "./app/containers/NotFound";

// Stores
import configureStore, { history } from './app/stores/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path="/" render={() => <App />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
