import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import creatRoute from 'routes';
import 'antd/dist/antd.css';

function RouterConfig({ history, app }) {
  const goBack = () => {
    history.goBack();
  };
  const creatDynamic = props => dynamic({
    ...props,
    app
  });
  const Layout = creatDynamic({
    component: () => (import('routes/Layout')),
    models: () => [import('models/layout')]
  })

  const Homepage = creatDynamic({
    component: () => (import('routes/Homepage')),
    models: () => [import('models/homepage')]
  })
  const Production = creatDynamic({
    component: () => (import('routes/Production')),
    models: () => [import('models/production')]
  })
  const Service = creatDynamic({
    component: () => (import('routes/Service')),
    models: () => [import('models/service')]
  })
  const About = creatDynamic({
    component: () => (import('routes/About')),
    models: () => [import('models/about')]
  })
  const routeChild = creatRoute(app, goBack);
  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/"
          component={(props) => {
            return (
              <Layout>
                <Route exact path="/" component={Homepage} />
                <Route path="/production" component={Production} />
                <Route path="/service" component={Service} />
                <Route path="/about" component={About} />
              </Layout>
            )
          }}
        />
      </Switch>
    </Router>
  );
}
  
export default RouterConfig;