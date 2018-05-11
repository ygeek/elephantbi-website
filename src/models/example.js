import { query } from 'services/example.js'
export default {

  namespace: 'example',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield call(query)
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }

};
