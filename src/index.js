import dva from 'dva';
import Layout from 'antd';
const app = dva({});

// 4. Router
app.router(require('./router').default);
  
// 5. Start
app.start('#root');

