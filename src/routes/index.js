import React from 'react';
import { Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';

export default function (app, goBack) {
  const creatDynamic = props => dynamic({
    ...props,
    app
  });
  
  return (
    <Switch>
    </Switch>
  );
}
  