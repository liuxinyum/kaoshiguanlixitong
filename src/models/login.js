import { getLogin, getInfo } from '@/services/login'
import { getViewAuthority } from '@/services/AuthorityManage'

import { message } from 'antd'
export default {
  namespace: 'login',
  state: {
    userInfo: {},
    view_authority:{}
  },
  reducers: {
    changUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.data
      }
    },
    changeViewAuthority(state, action){
      return {
        ...state,
        view_authority: action.data
      }
    }
  },
  effects: {
    * getLogin(action, {
      call,
      put
    }) {
      let result = yield call(getLogin, action.body)
      if (result.code === 1) {
        localStorage.setItem("token", result.token)
        action.push('/main/addquestions')
        message.success(result.msg)
      } else {
        message.success(result.msg)
      }
    },
    * getInfo(action, {
      call,
      put
    }) {
      let infodata = yield call(getInfo)
      let viewAuthority = yield call(getViewAuthority,{user_id:infodata.data.user_id})
      yield put({type:'changeViewAuthority',data:viewAuthority.data})
      yield put({ type: 'changUserInfo', data: infodata.data })
    }
  }
}