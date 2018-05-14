import pathToRegexp from 'path-to-regexp'

export default {

  namespace: 'about',
  
  state: {
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location
        const match = pathToRegexp('/about').exec(pathname);
        if (match) {
  
        }
      })
    }
  },
  
  effects: {
  },
  
  reducers: {
  }
}