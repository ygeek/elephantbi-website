import pathToRegexp from 'path-to-regexp'
import { _reserveExperience, _submitFeedbacks } from 'services/layout'
import globalMessage from 'helpers/messages'

export default {

  namespace: 'layout',
  
  state: {
    freeTrailModalVisible: false
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location
        const match = pathToRegexp('/(.*)').exec(pathname);
        if (match) {
  
        }
      })
    }
  },
  
  effects: {
    * reserveExperience({ payload }, { select, call, put }) {
      const { data, err } = yield call(_reserveExperience, payload)
      if (err) {

      }
      if (data) {
        yield put({ type: 'hideFreeTrailModal' })
        if (data.beary_status === 200 || data.ding_status === 200) {
          globalMessage('success', '提交成功，我们将尽快与您取得联系')
        } else {
          globalMessage('error', '提交失败，请重试')
        }
      }
    },

    * submitFeedbacks({ payload }, { select, call, put }) {
      const { type } = payload
      const { data, err } = yield call(_submitFeedbacks, payload)
      if (err) {

      }
      if (data) {
        if (data.beary_status === 200 || data.ding_status === 200) {
          if (type === '0') {
            globalMessage('success', '提交成功，您的问题非常重要，我们将会尽快以邮件回复您')
          }
          if (type === '1') {
            globalMessage('success', '反馈成功，感谢您为我们提供的宝贵意见')
          }
        } else {
          globalMessage('error', '提交失败，请重试')
        }
      }
    }
  },
  
  reducers: {
    showFreeTrailModal(state) {
      return { ...state, freeTrailModalVisible: true }
    },
    hideFreeTrailModal(state) {
      return { ...state, freeTrailModalVisible: false }
    }
  }
}