import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Navbar } from '../components/index';
import { Home, ReduxForm, ReactFinalForm } from '../containers/index';

const Routes = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/redux-form" component={ReduxForm} />
      <Route path="/react-final-form" component={ReactFinalForm} />
    </Switch>
  </>
);

export default Routes;
