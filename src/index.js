import dva from 'dva';
import Layout from 'antd';

const getInitialState = () => {

}

const app = dva({
  initialState: getInitialState()
});

app.use({});

[
].forEach((fileName) => {
  app.model(require(`./models/${fileName}.js`).default);
});
  
// 4. Router
app.router(require('./router').default);
  
// 5. Start
app.start('#root');

