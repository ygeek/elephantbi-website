import pathToRegexp from 'path-to-regexp'

export default {

  namespace: 'homepage',
  
  state: {
    freeTrialVisible: false
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location
        const match = pathToRegexp('/').exec(pathname);
        if (match) {
  
        }
      })
    }
  },
  
  effects: {

  },
  
  reducers: {
    showFreeTrailModal(state) {
      return { ...state, freeTrialVisible: true }
    },
    hideFreeTrailModal(state) {
      return { ...state, freeTrialVisible: false }
    }
  }
}
  