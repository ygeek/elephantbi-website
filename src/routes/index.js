import React from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import IndexPage from 'pages/index.js'
import _ from 'lodash'

export default function (app, goBack) {
  const creatDynamic = props => dynamic({
    ...props,
    app
  });
  
  return (
    <Switch>
      <Route exact path="/" component={IndexPage} />
    </Switch>
  );
}
  