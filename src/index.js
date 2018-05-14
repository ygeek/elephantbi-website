import dva from 'dva';
import createLoading from 'dva-loading';
import Layout from 'antd';

const getInitialState = () => {

}

const app = dva({
  initialState: getInitialState()
});

app.use(createLoading());

[
].forEach((fileName) => {
  app.model(require(`./models/${fileName}.js`).default);
});
  
// 4. Router
app.router(require('./router').default);
  
// 5. Start
app.start('#root');

