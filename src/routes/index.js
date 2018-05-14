import React from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import Homepage from 'routes/Homepage'
import Production from 'routes/Production'
import Service from 'routes/Service'
import About from 'routes/About'
import IndexPage from 'pages/index.js'
import _ from 'lodash'

export default function (app, goBack) {
  const creatDynamic = props => dynamic({
    ...props,
    app
  });
  
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={() => {
          return <Redirect to="home" />
        }}
      />
      <Route path="/home" component={Homepage} />
      <Route path="/production" component={Production} />
      <Route path="/service" component={Service} />
      <Route path="/about" component={About} />
    </Switch>
  );
}
  