import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import creatRoute from 'routes';
import Layout from 'routes/Layout'
import 'antd/dist/antd.css';

function RouterConfig({ history, app }) {
  const goBack = () => {
    history.goBack();
  };
  const creatDynamic = props => dynamic({
    ...props,
    app
  });
  const routeChild = creatRoute(app, goBack);
  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/"
          component={(props) => {
            return <Layout>{routeChild}</Layout>
          }}
        />
      </Switch>
    </Router>
  );
}
  
export default RouterConfig;