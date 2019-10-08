import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Navbar } from '../components/index';
import { App, ReduxForm, ReactFinalForm } from '../containers/index';

const Routes = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact={true} path="/" component={App} />
      <Route path="/redux-form" component={ReduxForm} />
      <Route path="/react-final-form" component={ReactFinalForm} />
    </Switch>
  </>
);

export default Routes;
