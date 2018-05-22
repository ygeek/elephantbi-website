import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AsyncComponent from './asyncComponent'
import Homepage from 'routes/Homepage'
import Production from 'routes/Production'
import Service from 'routes/Service'
import About from 'routes/About'
import Layout from 'routes/Layout'
import 'antd/dist/antd.css';

// const Layout = AsyncComponent(() => import('routes/Layout'))
// const Homepage = AsyncComponent(() => import('routes/Homepage'))
// const Production = AsyncComponent(() => import('routes/Production'))
// const Service = AsyncComponent(() => import('routes/Service'))
// const About = AsyncComponent(() => import('routes/About'))

function RouterConfig() {
  return (
    <Router>
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