import dva from 'dva';
import createLoading from 'dva-loading';

const getInitialState = () => {

}

const app = dva({
  initialState: getInitialState()
});

app.use(createLoading());

[
  'example',
  'homepage',
  'production',
  'service'
].forEach((fileName) => {
  app.model(require(`./models/${fileName}.js`).default);
});
  
// 4. Router
app.router(require('./router').default);
  
// 5. Start
app.start('#root');

