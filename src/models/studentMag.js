import {getStudent,getClassRoom,getClassInfo,deteleStudent} from "../services/studentMag"
import {message} from 'antd'
export default {
    namespace: 'studentMag',
    state: {
      studentInfo:[],
      classRoomData:[],
      classMsgInfo:[]
    },
    reducers: {
      saveStudentInfo(state,action){
        return {...state,...action}
      }
    },
    effects: {
        * getStudent(payload, {//所有学生信息
            call,
            put
        }) {
            let result = yield call(getStudent, payload.body)
            yield put({type:'saveStudentInfo',studentInfo:result.data})
        },
        *getClassRoom(payload,{call,put}){//获取教室号
          let data = yield call(getClassRoom)
          yield put({ type: 'saveStudentInfo' ,classRoomData:data.data});
        },
        *getClassInfo({ payload }, { call, put }) {  // 获取班级管理数据
          let data = yield call(getClassInfo)
          yield put({ type: 'saveStudentInfo' ,classMsgInfo:data.data});
        },
        *deteleStudent(payload,{call,put}){//删除学生
          let data = yield call(deteleStudent,payload.body)
          console.log(data,'data')
          if(data.code===1){
            message.success(data.msg)
          }
        },
        *searchStudent(payload,{call,put}){
          let {studentName,classId,roomId} = payload.body
          console.log(studentName,classId,roomId)
          yield
        }
    }
}