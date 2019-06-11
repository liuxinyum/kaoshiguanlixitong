import {getRoom,addRoom,removeRoom} from "../services/roomMsg"
import {message} from 'antd'
export default {
    namespace: 'roomMsg',
    state: {
      roomData:[],
      mask:false,
      deteleMask:false
    },
    reducers: {
      saveRoomData(state,action){
        return {...state,...action}//保存教室号数据
      },
      maskCtrol(state,action){
        return {...state,...action}
      }
    },
    effects: {
        * getRoom(action, {//获取教室号
            call,
            put
        }) {
            let infodata = yield call(getRoom)
            yield put({ type: 'saveRoomData' ,roomData:infodata.data});
        },
        *addRoom(actions,{call,put}){
          let data = yield call(addRoom,actions.body)
          yield put({type:'maskCtrol',mask:false})
          if(data.code===1){
            yield put({ type: 'saveRoomData'})
            message.success(data.msg)
          }else{
            message.error(data.msg)
          }
        },
        *changeMask(actions,{call,put}){
          if(actions.data === 'add'){
            
            yield put({type:'maskCtrol',mask:true})
          }else{
            yield put({type:'maskCtrol',mask:false})
          }
        },
        *removeRoom(actions,{call,put}){
          let data = yield call(removeRoom,actions.body)
          if(data.code===1){
            message.success(data.msg)
          }else{
            message.error(data.msg)
          }
        }
    }
}