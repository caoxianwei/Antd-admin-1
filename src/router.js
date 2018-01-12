import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import HomePage from './routes/Counter';
import User from './routes/User';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/user"  component={User} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
