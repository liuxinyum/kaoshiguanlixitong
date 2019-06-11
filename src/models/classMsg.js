import {
  getClassInfo,
  getClassRoom,
  getSubject,
  getDetele,
  getAddClass,
  getChangeClass
} from "../services/classMsg"
import {message} from 'antd'
export default {
  namespace:'classMsg',
  state: {
    classMsgInfo:[],
    flag:false,
    changeData:{},
    classRoomData:[],
    subjectData:[],
    deteleCode:'',
    AddCode:''
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  effects: {
    *getClassInfo({ payload }, { call, put }) {  // 获取班级管理数据
      let data = yield call(getClassInfo)
      yield put({ type: 'save' ,data:data});
    },
    *addClass(payload , { call, put }){//更改遮罩层显示及遮罩层传参
      
      if(payload.data===1){
        yield put({type:'newData',data:''})
        yield put({type:'changeFlag',data:true})
      }else{
        yield put({type:'changeFlag',data:true})
        yield put({type:'newData',data:payload.data})
      }
    },
    *closeMask({payload},{call,put}){//关闭遮罩层
      yield put({type:'changeFlag',data:false})
    },
    *getClassRoom(payload,{call,put}){//获取教室号
      let data = yield call(getClassRoom)
      yield put({ type: 'saveClassRoomData' ,data:data});
    },
    *getSubject(payload,{call,put}){//获取课程名称
      let data = yield call(getSubject)
      yield put({ type: 'saveSubjectData' ,data:data});
    },
    *getDetele(payload,{call,put}){//删除班级
      let resolve = yield call(getDetele,payload.body)
      if(resolve.code===1){
        yield put({type:'saveDeteleCode',data:resolve.code})
        message.success(resolve.msg)
      }else{
        message.success(resolve.msg)
      }
    },
    *getAddClass(payload,{call,put}){//添加班级
      let resolve = yield call(getAddClass,payload.body)
      if(resolve.code===1){
        yield put({type:'saveAddCode',data:resolve.code})
        message.success(resolve.msg)
      }else{
        message.success(resolve.msg)
      }
    },
    *getChangeClass(payload,{call,put}){//修改班级数据
      let resolve = yield call(getChangeClass,payload.body)
      console.log(resolve,'resolve')
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, classMsgInfo:action.data.data };//更新初始页面数据
    },
    changeFlag(state, action) {
      return { ...state, flag:action.data };//更改flag
    },
    newData(state, action) {
      return { ...state, changeData:action.data };//遮罩层传递参数
    },
    saveClassRoomData(state,action){
      return {...state,classRoomData:action.data.data}//保存教室号数据
    },
    saveSubjectData(state,action){
      return {...state,subjectData:action.data.data}//保存课程信息数据
    },
    saveDeteleCode(state,action){
      return {...state,deteleCode:action.data}//保存删除状态
    },
    saveAddCode(state,action){
      return {...state,AddCode:action.data}//保存删除状态
    }
  }
}