import { add, identity, update, apt, view, permissions, setup, exhibition, user, authority, apiauthority } from '../services/add.js'
import { message } from 'antd'
export default {

  namespace: 'add',

  state: {
    exhibitions: [],
    users: [],
    thority: [],
    auth: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *addUser(action, { call, put }) {  // eslint-disable-line
      const t = yield call(add, action.payload);
      yield put({ type: 'save', action });
      console.log(t)
      if (t.code === 0) {
        message.error(t.msg);
      } else {
        message.error(t.msg);
      }
    },
    *updates(action, { call, put }) {
      yield call(update, action.payload)
    },
    *identity(action, { call, put }) {
     yield call(identity, action.payload)
    },
    *api(action, { call, put }) {
      yield call(apt, action.payload)
    },
    *views(action, { call, put }) {
      yield call(view, action.payload)
    },
    *permissions(action, { call, put }) {
      yield call(permissions, action.payload)
    },
    *setup(action, { call, put }) {
      yield call(setup, action.payload)
    },
    *exhibition(action, { call, put }) {
      const exhibitions = yield call(exhibition)
      yield put({ type: 'save', exhibitions: exhibitions.data })
    },
    *user(action, { call, put }) {
      const use = yield call(user)
      yield put({ type: 'users', users: use.data })
    },
    *authoritys(action, { call, put }) {
      const anto = yield call(authority)
      yield put({ type: 'thout', thority: anto.data })
    },
    *apiauthoritys(action, { call, put }) {
      const apis = yield call(apiauthority)
      yield put({ type: 'ap', auth: apis.data })
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action };
    },
    users(state, action) {
      return { ...state, ...action };
    },
    thout(state, action) {
      return { ...state, ...action };
    },
    ap(state, action) {
      return { ...state, ...action };
    },
    users(state, action) {
      return { ...state, ...action };
    }
  },

};
