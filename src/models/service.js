import pathToRegexp from 'path-to-regexp'

export default {

  namespace: 'service',
  
  state: {
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location
        const match = pathToRegexp('/service').exec(pathname);
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