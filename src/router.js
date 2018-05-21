import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
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
    component: () => (import('routes/Layout'))
  })

  const Homepage = creatDynamic({
    component: () => (import('routes/Homepage'))
  })
  const Production = creatDynamic({
    component: () => (import('routes/Production'))
  })
  const Service = creatDynamic({
    component: () => (import('routes/Service'))
  })
  const About = creatDynamic({
    component: () => (import('routes/About'))
  })
  return (
    <Router history={history}>
      <Switch>
        <Layout>
          <Route exact path="/" component={Homepage} />
          <Route path="/production" component={Production} />
          <Route path="/service" component={Service} />
          <Route path="/about" component={About} />
        </Layout>
      </Switch>
    </Router>
  );
}
  
export default RouterConfig;